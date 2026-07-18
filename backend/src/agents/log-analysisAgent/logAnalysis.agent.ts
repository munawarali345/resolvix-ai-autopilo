// ================================================================
// LOG ANALYZER AGENT
// ================================================================
//
// Purpose:
// Production AI Agent for Log Analysis.
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

import { LOG_ANALYZER_SYSTEM_PROMPT } from '../log-analysisAgent/logAnalysis.prompt.js';
import { loadSkill } from '../../utils/loadSkill.util.js';

import { extractErrorsTool } from '../../tools/logAnalyzerAgentTools/extratErrorToolWraper.js';
import { buildTimelineTool } from '../../tools/logAnalyzerAgentTools/buildTimelinetoolwrapper.js';
import { groupLogsTool } from '../../tools/logAnalyzerAgentTools/groupedLogToolWrapper.js';
import { extractAffectedServicesTool } from '../../tools/logAnalyzerAgentTools/extractAffectedServiceToolWrapper.js';
import { dependencyMapperTool } from '../../tools/logAnalyzerAgentTools/dependencyMapperToolWrapper.js';

import {
  LogAnalyzerAgentInput,
  LogAnalysisArtifacts,
  LogAnalyzerExecutionResult,
} from '../../types/index.js';

// parser
import { parseLogAnalyzerResponse } from './logAnalysis.parser.js';

// validator
import { validateLogAnalyzerOutput } from './logAnalysis.validator.js';

const qwenModel = createQwenLangChainModel();

// ================================================================
// Bind Agent Tools
// ================================================================

const model = qwenModel.bindTools([
  extractErrorsTool,

  buildTimelineTool,

  groupLogsTool,

  extractAffectedServicesTool,

  dependencyMapperTool,
]);

// ================================================================
// Tool Registry
// ================================================================

const toolRegistry = {
  extract_errors: extractErrorsTool,

  build_timeline: buildTimelineTool,

  group_logs: groupLogsTool,

  extract_affected_services: extractAffectedServicesTool,

  dependency_mapper: dependencyMapperTool,
};

// ================================================================
// Agent
// ================================================================

export const logAnalyzerAgent = async (
  agentInput: LogAnalyzerAgentInput,
): Promise<LogAnalyzerExecutionResult> => {

  // Load Skill
  const skill = await loadSkill(
    'logAnalysisSkills',

    'logAnalysisSkill.md',
  );

  // ================================================================
  // buildind prompt with system prompt + skill.md
  // ================================================================

  const systemPrompt = `

   ${LOG_ANALYZER_SYSTEM_PROMPT}

   ${skill}

`;

  // ================================================================
  // userPrompt
  // ================================================================
  const userPrompt = `

Analyze the following incident.

Incident:
${JSON.stringify(agentInput.incident, null, 2)}

Detection Result:
${JSON.stringify(agentInput.detectionResult, null, 2)}

Current Workflow Step:
${agentInput.currentStep}

Logs:
${JSON.stringify(agentInput.logs, null, 2)}

Analyze the incident by following your assigned skill and use tools whenever required.

`;

  // ================================================================
  // Tool Artifacts
  // Stores outputs produced by Log Analysis tools.
  // ================================================================
  const artifacts: LogAnalysisArtifacts = {
    errors: [],

    affectedServices: [],

    groupedLogs: [],

    timeline: [],

    dependencyMap: [],
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

      const parsedOutput = parseLogAnalyzerResponse(response.content as string);

      const validatedOutput = validateLogAnalyzerOutput(parsedOutput);

      return {
        analysis: validatedOutput,

        artifacts,
      };
    }

    // --------------------------------------------------------
    // Execute Tool Calls
    // --------------------------------------------------------

    for (const toolCall of response.tool_calls) {
      const tool = toolRegistry[toolCall.name as keyof typeof toolRegistry];

      if (!tool) {
        throw new Error(`Unknown Tool: ${toolCall.name}`);
      }

      const result = await tool.invoke(toolCall);

      let toolResult: unknown;

       if (typeof result.content === "string") {

                toolResult = JSON.parse(result.content);

          } else {

                toolResult = result.content;
          }
    

      // =========================================================
      // Save the executed tool output into artifacts.
      //
      // Every tool produces a different type of output.
      // We save that output so future agents can reuse it
      // without executing the same tool again.
      // =========================================================

      // ---------------------------------------------------------
      // Save extracted ERROR logs.
      // ---------------------------------------------------------
      if (toolCall.name === 'extract_errors') {
        artifacts.errors = toolResult as LogAnalysisArtifacts['errors'];
      }

      // ---------------------------------------------------------
      // Save affected services discovered from logs.
      // ---------------------------------------------------------
      if (toolCall.name === 'extract_affected_services') {
        artifacts.affectedServices = toolResult as LogAnalysisArtifacts['affectedServices'];
      }

      // ---------------------------------------------------------
      // Save grouped repeated log messages.
      // ---------------------------------------------------------
      if (toolCall.name === 'group_logs') {
        artifacts.groupedLogs = toolResult as LogAnalysisArtifacts['groupedLogs'];
      }

      // ---------------------------------------------------------
      // Save generated incident timeline.
      // ---------------------------------------------------------
      if (toolCall.name === 'build_timeline') {
        artifacts.timeline = toolResult as LogAnalysisArtifacts['timeline'];
      }

      // ---------------------------------------------------------
      // Save inferred service dependency graph.
      // ---------------------------------------------------------
      if (toolCall.name === 'dependency_mapper') {
        artifacts.dependencyMap = toolResult as LogAnalysisArtifacts['dependencyMap'];
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

  throw new Error(
    'Log Analyzer Agent terminated without producing a final response.',
  );
};

// High Level Archtecture

//                    logAnalyzerAgent()

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

//  model.invoke(messages)          Return
