// ================================================================
// fix AGENT
// ================================================================
//
// Purpose:
// Production AI Agent for Fix.
//
// Responsibilities:
// 1. Load System Prompt
// 2. Load Skill
// 3. Bind Tools
// 4. Invoke Qwen
// 5. Execute Tool Calls
// 6. Generate Final Structured Output
// ================================================================

import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
  BaseMessage,
} from '@langchain/core/messages';

import { createQwenLangChainModel } from '../../ai/qwen/qwen.langchain.js';

import { FIX_RECOMMENDATION_SYSTEM_PROMPT } from '../fixAgent/fixAgent.prompt.js';
import { loadSkill } from '../../utils/loadSkill.util.js';

import { searchFixPlaybookTool } from '../../tools/fixAgentTools/toolWrappers/searchFixPlaybookToolWrapper.js';
import { searchRunbookTool } from '../../tools/fixAgentTools/toolWrappers/searchRunbookToolWrapper.js';
import { configurationReaderTool } from '../../tools/fixAgentTools/toolWrappers/configurationReaderToolWrapper.js';
import { configurationDiffTool } from '../../tools/fixAgentTools/toolWrappers/configDiffToolWrapper.js';
import { serviceInventoryTool } from '../../tools/fixAgentTools/toolWrappers/serviceInventoryToolWrapper.js';

import {
  FixAgentInput,
  FixAgentArtifacts,
  FixAgentExecutionResult,
} from '../../types/index.js';

// parser
import { parseFixResponse } from './fixAgent.perser.js';

// validator
import { validateFixAgentOutput } from './fixAgent.validator.js';

import { StructuredTool } from '@langchain/core/tools';

import logger from '../../lib/logger.js';

const qwenModel = createQwenLangChainModel();

// ================================================================
// Bind Agent Tools
// ================================================================

const model = qwenModel.bindTools([
  searchFixPlaybookTool,

  searchRunbookTool,

  configurationReaderTool,

  configurationDiffTool,

  serviceInventoryTool,
]);

// ================================================================
// Tool Registry
// ================================================================

const toolRegistry: Record<string, StructuredTool> = {
  search_fix_playbook: searchFixPlaybookTool,

  search_runbook: searchRunbookTool,

  configuration_reader: configurationReaderTool,

  configuration_diff: configurationDiffTool,

  service_inventory: serviceInventoryTool,
};

// ================================================================
// Agent
// ================================================================

export const fixAgent = async (
  agentInput: FixAgentInput,
): Promise<FixAgentExecutionResult> => {
  // Load Skill
  const skill = await loadSkill(
    'fixAgentSkills',

    'fixRecommendationSkill.md',
  );

  // ================================================================
  // buildind prompt with system prompt + skill.md
  // ================================================================

  const systemPrompt = `

     ${FIX_RECOMMENDATION_SYSTEM_PROMPT}

     ${skill}

  `;

  // ================================================================
  // userPrompt
  // ================================================================
  const userPrompt = `

Recommend the best remediation for the following incident.

Incident:
${JSON.stringify(agentInput.incident, null, 2)}

Log Analysis:
${JSON.stringify(agentInput.logAnalysisResult, null, 2)}

Root Cause Analysis:
${JSON.stringify(agentInput.rootCauseResult, null, 2)}

Current Workflow Step:
${agentInput.currentStep}

Follow your assigned skill and use available tools whenever required.

`;

  // ================================================================
  // Tool Artifacts
  // Stores outputs produced by Fix Agent tools.
  // ================================================================

  const artifacts: FixAgentArtifacts = {
    playbooks: [],

    runbooks: [],

    configurations: [],

    configurationChanges: [],

    serviceInventory: [],
  };

  const messages: BaseMessage[] = [
    new SystemMessage(systemPrompt),
    new HumanMessage(userPrompt),
  ];

  let continueExecution = true;

  while (continueExecution) {
    const response = await model.invoke(messages);

    messages.push(response);

    // --------------------------------------------------------
    // No Tool Call → Final AI Response
    // --------------------------------------------------------

    if (!response.tool_calls?.length) {
      continueExecution = false;

      logger.info('Fix Agent Raw Response', { response: response.content });

      const parsedOutput = parseFixResponse(response.content as string);

      logger.debug('Parsed Fix Response', { data: parsedOutput });

      const validatedOutput = validateFixAgentOutput(parsedOutput);

      return {
        analysis: validatedOutput,

        artifacts,
      };
    }

    // --------------------------------------------------------
    // Execute Tool Calls (Parallel Execution)
    // --------------------------------------------------------
    //
    // Every tool requested by the LLM is independent.
    //
    // Instead of:
    //
    // Tool1 -> wait
    // Tool2 -> wait
    // Tool3 -> wait
    //
    // We execute all tools simultaneously.
    //
    // Promise.all waits until ALL tools complete,
    // then returns every tool result together.
    //
    // This reduces overall agent latency while keeping
    // the final behaviour exactly the same.
    //

    const toolResults = await Promise.all(
      response.tool_calls.map(async (toolCall) => {
        // --------------------------------------------------
        // Get matching tool from registry.
        // --------------------------------------------------

        const tool = toolRegistry[toolCall.name as keyof typeof toolRegistry];

        if (!tool) {
          throw new Error(`Unknown Tool: ${toolCall.name}`);
        }

        // --------------------------------------------------
        // Execute tool.
        //
        // Every mapped callback runs immediately.
        // Promise.all waits until every execution finishes.
        // --------------------------------------------------

        const result = await tool.invoke(toolCall);

        let toolResult: unknown;

        if (typeof result.content === 'string') {
          toolResult = JSON.parse(result.content);
        } else {
          toolResult = result.content;
        }

        // --------------------------------------------------
        // Return both:
        //
        // 1. original toolCall
        // 2. parsed tool result
        //
        // Artifact saving happens AFTER all tools finish.
        // --------------------------------------------------

        return {
          toolCall,

          toolResult,
        };
      }),
    );

    // =========================================================
    // Save the executed tool output into artifacts.
    //
    // Every tool produces a different type of output.
    // We save that output so future agents can reuse it
    // without executing the same tool again.
    // =========================================================

    for (const { toolCall, toolResult } of toolResults) {
      // ---------------------------------------------------------
      // Save extracted ERROR logs.
      // ---------------------------------------------------------
      if (toolCall.name === 'search_fix_playbook') {
        const playbookResult = toolResult as {
          playbooks: FixAgentArtifacts['playbooks'];
        };

        artifacts.playbooks = playbookResult.playbooks;
      }

      // ---------------------------------------------------------
      // Save affected services discovered from logs.
      // ---------------------------------------------------------
      if (toolCall.name === 'search_runbook') {
        const runbookResult = toolResult as {
          runbooks: FixAgentArtifacts['runbooks'];
        };

        artifacts.runbooks = runbookResult.runbooks;
      }

      // ---------------------------------------------------------
      // Save grouped repeated log messages.
      // ---------------------------------------------------------
      if (toolCall.name === 'configuration_reader') {
        const configResult = toolResult as {
          configurations: FixAgentArtifacts['configurations'];
        };

        artifacts.configurations = configResult.configurations;
      }

      // ---------------------------------------------------------
      // Save generated incident timeline.
      // ---------------------------------------------------------
      if (toolCall.name === 'configuration_diff') {
        const diffResult = toolResult as {
          changes: FixAgentArtifacts['configurationChanges'];
        };

        artifacts.configurationChanges = diffResult.changes;
      }

      // ---------------------------------------------------------
      // Save inferred service dependency graph.
      // ---------------------------------------------------------
      if (toolCall.name === 'service_inventory') {
        const inventoryResult = toolResult as {
          services: FixAgentArtifacts['serviceInventory'];
        };

        artifacts.serviceInventory = inventoryResult.services;
      }

      if (!toolCall.id) {
        throw new Error('Tool call id is missing.');
      }

      messages.push(
        new ToolMessage({
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        }),
      );
    }
  }

  throw new Error('Fix Agent terminated without producing a final response.');
};

// High Level Archtecture

//                    FixAgent()

//                          │
//                          ▼

//                Load System Prompt
//                          │
//                          ▼

//                  Load Skill.md
//                          │
//                          ▼

//                Bind Available Tools
//                            │
//                            ▼

//            Create Initial Messages Array

//       [SystemMessage, HumanMessage]
//                            │
//                            ▼

//           model.invoke(messages)

//                            │

//           ┌────────────────┴───────────────┐
//           │                                │
//           ▼                                ▼

//     Tool Call Requested             Final Response

//           │                                │
//           ▼                                ▼

//  Execute JS Tool                  Parse Output

//           │                                │
//           ▼                                ▼

//  Add ToolMessage                Validate Output

//           │                                │
//           ▼                                ▼

//  model.invoke(messages)                  Return
