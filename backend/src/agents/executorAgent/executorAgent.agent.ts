// ================================================================
// executor AGENT
// ================================================================
//
// Purpose:
// Production AI Agent for executions.
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

import { EXECUTOR_SYSTEM_PROMPT } from './executorAgent.prompt.js';
import { loadSkill } from '../../utils/loadSkill.util.js';

import { executeCommandTool } from '../../tools/executorAgent/toolWrappers/executeCommandToolWrapper.js';

import { verificationTool } from '../../tools/executorAgent/toolWrappers/verifyExecutionToolWrapper.js';

import { rollbackTool } from '../../tools/executorAgent/toolWrappers/rollbackToolWrapper.js';

import { executionStatusTool } from '../../tools/executorAgent/toolWrappers/executeStatusToolWrapper.js';
import { notificationTool } from '../../tools/executorAgent/toolWrappers/notificationToolWrapper.js';

import {
  ExecutorInput,
  ExecutorArtifacts,
  ExecutorExecutionResult,
} from '../../types/index.js';

// parser
import { parseExecutorResponse } from './executorAgent.parser.js';

// validator
import { validateExecutorOutput } from './executorAgent.validator.js';

import { StructuredTool } from '@langchain/core/tools';

const qwenModel = createQwenLangChainModel();

// ================================================================
// Bind Agent Tools
// ================================================================

const model = qwenModel.bindTools([
  executeCommandTool,

  verificationTool,

  rollbackTool,

  executionStatusTool,

  notificationTool,
]);

// ================================================================
// Tool Registry
// ================================================================

const toolRegistry: Record<string, StructuredTool> = {
  execute_Command: executeCommandTool,

  verification_Tool: verificationTool,

  rollback_Tool: rollbackTool,

  execution_Status: executionStatusTool,

  notification_Tool: notificationTool,
};

// ================================================================
// Agent
// ================================================================

export const executorAgent = async (
  agentInput: ExecutorInput,
): Promise<ExecutorExecutionResult> => {
  // Load Skill
  const skill = await loadSkill(
    'exectutorAgentSkills',

    'executorAgentSkill.md',
  );

  // ================================================================
  // buildind prompt with system prompt + skill.md
  // ================================================================

  const systemPrompt = `

     ${EXECUTOR_SYSTEM_PROMPT}

     ${skill}

  `;

  // ================================================================
  // userPrompt
  // ================================================================

  const userPrompt = `

Execute the approved remediation for the following incident.

Incident:
${JSON.stringify(agentInput.incident, null, 2)}

Risk Validation Result:
${JSON.stringify(agentInput.riskValidation, null, 2)}

Risk Validation Artifacts:
${JSON.stringify(agentInput.riskArtifacts, null, 2)}

Approved Fix Recommendation:
${JSON.stringify(agentInput.fixRecommendation, null, 2)}

Fix Recommendation Artifacts:
${JSON.stringify(agentInput.fixArtifacts, null, 2)}

Current Workflow Step:
${agentInput.currentStep}

Execute the approved remediation by following your assigned skill.

`;

  // ================================================================
  // Tool Artifacts
  // Stores outputs produced by Fix Agent tools.
  // ================================================================

  const artifacts: ExecutorArtifacts = {
    executeCommand: {
      success: false,
      results: [],
      duration: 0,
    },

    verification: {
      verified: false,
      passedChecks: [],
      failedChecks: [],
      verificationEvidence: [],
    },

    rollback: {
      rollbackPerformed: false,
      rollbackSuccessful: false,
      rollbackSteps: [],
    },

    executionStatus: {
      status: 'running',
    },

    notification: {
      notificationSent: false,
      notificationChannel: 'none',
      recipients: [],
      failureReason: null,
    },
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

      const parsedOutput = parseExecutorResponse(response.content as string);

      const validatedOutput = validateExecutorOutput(parsedOutput);

      return {
        execution: validatedOutput,

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

      // --------------------------------------------------------
      // Skip ToolMessage and only store actual tool output.
      // --------------------------------------------------------
      if (result instanceof ToolMessage) {
        throw new Error('Tool returned ToolMessage instead of actual output.');
      }

      // =========================================================
      // Save the executed tool output into artifacts.
      //
      // Every tool produces a different type of output.
      // We save that output so future agents can reuse it
      // without executing the same tool again.
      // =========================================================

      // ---------------------------------------------------------
      // Save executed commands.
      // ---------------------------------------------------------
      if (toolCall.name === 'execute_Command') {
        artifacts.executeCommand =
          result as ExecutorArtifacts['executeCommand'];
      }

      // ---------------------------------------------------------
      // Save execution status.
      // ---------------------------------------------------------
      if (toolCall.name === 'verification_Tool') {
        artifacts.verification = result as ExecutorArtifacts['verification'];
      }

      // ---------------------------------------------------------
      // Save roolbak.
      // ---------------------------------------------------------
      if (toolCall.name === 'rollback_Tool') {
        artifacts.rollback = result as ExecutorArtifacts['rollback'];
      }

      // ---------------------------------------------------------
      // Save varification.
      // ---------------------------------------------------------
      if (toolCall.name === 'execution_Status') {
        artifacts.executionStatus =
          result as ExecutorArtifacts['executionStatus'];
      }

      // ---------------------------------------------------------
      // Save notification.
      // ---------------------------------------------------------
      if (toolCall.name === 'notification_Tool') {
        artifacts.notification = result as ExecutorArtifacts['notification'];
      }

      if (!toolCall.id) {
        throw new Error('Tool call id is missing.');
      }

      messages.push(
        new ToolMessage({
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        }),
      );
    }
  }

  throw new Error(
    'executor agent terminated without producing a final response.',
  );
};

// High Level Archtecture

//                    executorAgent()

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
