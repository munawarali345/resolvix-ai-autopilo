// ================================================================
// risk validator AGENT
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
  BaseMessage,
} from '@langchain/core/messages';

import { createQwenLangChainModel } from '../../ai/qwen/qwen.langchain.js';

import { RISK_VALIDATOR_SYSTEM_PROMPT } from './riskValidator.prompt.js';
import { loadSkill } from '../../utils/loadSkill.util.js';

import { approvalPolicyTool } from '../../tools/riskValidatorTools/toolWrappers/approvalPolicyToolWrapper.js';
import { maintenanceWindowTool } from '../../tools/riskValidatorTools/toolWrappers/maintenanceWindowToolWrapper.js';
import { impactAssessmentTool } from '../../tools/riskValidatorTools/toolWrappers/impactAssessmentToolWrapper.js';
import { missingValidationTool } from '../../tools/riskValidatorTools/toolWrappers/missingValidationToolWrapper.js';

import {
  RiskValidatorInput,
  RiskValidatorArtifacts,
  RiskValidatorExecutionResult,
} from '../../types/index.js';

// parser
import { parseRiskValidatorResponse } from './riskValidator.parser.js';

// validator
import { validateRiskValidatorOutput } from './riskValidator.validation.js';

import { StructuredTool } from '@langchain/core/tools';

const qwenModel = createQwenLangChainModel();

// ================================================================
// Bind Agent Tools
// ================================================================

const model = qwenModel.bindTools([
  approvalPolicyTool,
  maintenanceWindowTool,
  impactAssessmentTool,
  missingValidationTool,
]);

// ================================================================
// Tool Registry
// ================================================================

const toolRegistry: Record<string, StructuredTool> = {
  approval_policy: approvalPolicyTool,

  maintenance_window: maintenanceWindowTool,

  impact_assessment: impactAssessmentTool,

  missing_validation: missingValidationTool,
};

// ================================================================
// Agent
// ================================================================

export const riskValidatorAgent = async (
  agentInput: RiskValidatorInput,
): Promise<RiskValidatorExecutionResult> => {
  // Load Skill
  const skill = await loadSkill(
    'riskValidationSkill',

    'validateRiskSkill.md',
  );

  // ================================================================
  // buildind prompt with system prompt + skill.md
  // ================================================================

  const systemPrompt = `

     ${RISK_VALIDATOR_SYSTEM_PROMPT}

     ${skill}

  `;

  // ================================================================
  // userPrompt
  // ================================================================
  const userPrompt = `

Recommend the best remediation for the following incident.

Incident:
${JSON.stringify(agentInput.incident, null, 2)}

fixRecommendeation:
${JSON.stringify(agentInput.fixRecommendation, null, 2)}

Root Cause Analysis:
${JSON.stringify(agentInput.fixArtifacts, null, 2)}

Current Workflow Step:
${agentInput.currentStep}

Follow your assigned skill and use available tools whenever required.

`;

  // ================================================================
  // Tool Artifacts
  // Stores outputs produced by Fix Agent tools.
  // ================================================================

  const artifacts: RiskValidatorArtifacts = {
    approvalPolicy: {
      approvalRequired: false,
      approvalReason: '',
    },

    maintenanceWindow: {
      maintenanceAllowed: false,
      windowReason: '',
    },

    impactAssessment: {
      safeToExecute: false,
      potentialImpacts: [],
      affectedServices: [],
    },

    missingValidation: {
      missingChecks: [],
      validationPassed: false,
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

      const parsedOutput = parseRiskValidatorResponse(
        response.content as string,
      );

      console.log("========== PARSED RISK OUTPUT ==========");
console.dir(parsedOutput, { depth: null });

      const validatedOutput = validateRiskValidatorOutput(parsedOutput);

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
      // Save approval policy result
      // ---------------------------------------------------------
      if (toolCall.name === 'approval_policy') {
        artifacts.approvalPolicy =
          toolResult as RiskValidatorArtifacts['approvalPolicy'];
      }

      // ---------------------------------------------------------
      // Save maintenance window result
      // ---------------------------------------------------------
      if (toolCall.name === 'maintenance_window') {
        artifacts.maintenanceWindow =
          toolResult as RiskValidatorArtifacts['maintenanceWindow'];
      }

      // ---------------------------------------------------------
      // Save impact assessment result
      // ---------------------------------------------------------
      if (toolCall.name === 'impact_assessment') {
        artifacts.impactAssessment =
          toolResult as RiskValidatorArtifacts['impactAssessment'];
      }

      // ---------------------------------------------------------
      // Save missing validation result
      // ---------------------------------------------------------
      if (toolCall.name === 'missing_validation') {
        artifacts.missingValidation =
          toolResult as RiskValidatorArtifacts['missingValidation'];
      }

      if (!toolCall.id) {
        throw new Error('Tool call id is missing.');
      }

      messages.push(result);

    }
  }

  throw new Error(
    'Risk Validator Agent terminated without producing a final response.',
  );
};

// High Level Archtecture

//                    riskValidatorAgent()

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
