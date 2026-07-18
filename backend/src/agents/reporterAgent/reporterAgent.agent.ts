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

import { REPORTER_SYSTEM_PROMPT } from './reporterAgent.prompt.js';
import { loadSkill } from '../../utils/loadSkill.util.js';

import { timelineTool } from '../../tools/reportAgennt/toolWrappers/timelineToolWrapper.js';

import { metricsTool } from '../../tools/reportAgennt/toolWrappers/metricsToolWrapper.js';

import { reportFormatterTool } from '../../tools/reportAgennt/toolWrappers/reportFormatterToolWrapper.js';

import {
  ReporterInput,
  ReporterArtifacts,
  ReporterExecutionResult,
} from '../../types/index.js';

// parser
import { parseReporterResponse } from './reporterAgent.parser.js';

// validator
import { validateReporterOutput } from './reporterAgent.validator.js';

import { StructuredTool } from '@langchain/core/tools';

const qwenModel = createQwenLangChainModel();

// ================================================================
// Bind Agent Tools
// ================================================================

const model = qwenModel.bindTools([
  timelineTool,

  metricsTool,

  reportFormatterTool,
]);

// ================================================================
// Tool Registry
// ================================================================

const toolRegistry: Record<string, StructuredTool> = {
  timeline_tool: timelineTool,

  metrics_tool: metricsTool,

  report_formatter_tool: reportFormatterTool,
};

// ================================================================
// Agent
// ================================================================

export const reporterAgent = async (
  agentInput: ReporterInput,
): Promise<ReporterExecutionResult> => {
  // Load Skill
  const skill = await loadSkill(
    'reportAgentSkills',

    'reporterAgentSkill.md',
  );

  // ================================================================
  // buildind prompt with system prompt + skill.md
  // ================================================================

  const systemPrompt = `

     ${REPORTER_SYSTEM_PROMPT}

     ${skill}

  `;

  // ================================================================
  // userPrompt
  // ================================================================
  const userPrompt = `

Recommend the best remediation for the following incident.

Incident:
${JSON.stringify(agentInput.incident, null, 2)}

detection:
${JSON.stringify(agentInput.detection, null, 2)}

orchestrator:
${JSON.stringify(agentInput.orchestrator, null, 2)}

Log Analysis:
${JSON.stringify(agentInput.logAnalysis, null, 2)}

Log Analysis Artifacts:
${JSON.stringify(agentInput.logAnalysisArtifacts, null, 2)}

Root Cause Analysis:
${JSON.stringify(agentInput.rootCause, null, 2)}

Fix Recommendation:
${JSON.stringify(agentInput.fixRecommendation, null, 2)}

Fix Recommendation Artifacts:
${JSON.stringify(agentInput.fixAgentArtifacts, null, 2)}

Risk Validator:
${JSON.stringify(agentInput.riskValidation, null, 2)}

Risk Validator Artifacts:
${JSON.stringify(agentInput.riskValidatorArtifacts, null, 2)}

Executor:
${JSON.stringify(agentInput.execution, null, 2)}

Executor Artifacts:
${JSON.stringify(agentInput.executionAgentArtifacts, null, 2)}

Current Workflow Step:
${agentInput.currentStep}

Follow your assigned skill and use available tools whenever required.

`;

  // ================================================================
  // Tool Artifacts
  // Stores outputs produced by Fix Agent tools.
  // ================================================================

  const artifacts: ReporterArtifacts = {
    timeline: [],

    metrics: {
      detectionTime: 0,
      diagnosisTime: 0,
      executionTime: 0,
      totalTime: 0,
      mttr: null,
    },

    reportFormatter: {
      markdown: '',
      html: '',
      json: {},
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

      const parsedOutput = parseReporterResponse(response.content as string);

      const validatedOutput = validateReporterOutput(parsedOutput);

      return {
        report: validatedOutput,

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
      // Save timeline.
      // ---------------------------------------------------------
      if (toolCall.name === 'timeline_tool') {
        artifacts.timeline = toolResult as ReporterArtifacts['timeline'];
      }

      // ---------------------------------------------------------
      // Save metrics
      // ---------------------------------------------------------
      if (toolCall.name === 'metrics_tool') {
        artifacts.metrics = toolResult as ReporterArtifacts['metrics'];
      }

      // ---------------------------------------------------------
      // Save reprt formattes.
      // ---------------------------------------------------------
      if (toolCall.name === 'report_formatter_tool') {
        artifacts.reportFormatter =
          toolResult as ReporterArtifacts['reportFormatter'];
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
    'reporter Agent terminated without producing a final response.',
  );
};

// High Level Archtecture

//                    reporterAgent()

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
