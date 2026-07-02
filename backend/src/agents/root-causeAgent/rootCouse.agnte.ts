// ================================================================
// ROOT CAUSE AGENT
// ================================================================
//
// Purpose:
// Production AI Agent for Root Cause Analysis.
//
// Responsibilities:
// 1. Load System Prompt
// 2. Load Skill
// 3. Invoke Qwen
// 4. Parse AI Response
// 5. Validate Output
// 6. Return Structured Analysis
// ================================================================

import { HumanMessage, SystemMessage } from '@langchain/core/messages';

import { createQwenLangChainModel } from '../../ai/qwen/qwen.langchain.js';

import { ROOT_CAUSE_SYSTEM_PROMPT } from './rootCouse.prompt.js';

import { loadSkill } from '../../utils/loadSkill.util.js';

import {
  RootCauseAgentInput,
  RootCauseExecutionResult,
} from '../../types/index.js';

// Parser
import { parseRootCauseResponse } from './rootCouse.parser.js';

// Validator
import { validateRootCauseOutput } from './rootCouse.validator.js';

// ================================================================
// Create Qwen Model
// ================================================================
//
// Currently no runtime tools are used.
//
// We intentionally keep the model without bindTools().
//
// When dependency tracing tools are introduced later,
// bindTools() can be added without changing the overall
// architecture.
// ================================================================

const model = createQwenLangChainModel();

// ================================================================
// ROOT CAUSE AGENT
// ================================================================

export const rootCauseAgent = async (
  agentInput: RootCauseAgentInput,
): Promise<RootCauseExecutionResult> => {
  // ==============================================================
  // STEP 1
  // Load Skill
  // ==============================================================
  //
  // The skill defines the investigation workflow.
  //
  // The System Prompt defines the role and boundaries.
  // ==============================================================

  const skill = await loadSkill(
    'rootCauseSkills',

    'traceDepandencySkill.md',
  );

  // ==============================================================
  // STEP 2
  // Combine System Prompt + Skill
  // ==============================================================
  //
  // Both are merged into one system instruction.
  // ==============================================================

  const systemPrompt = `

    ${ROOT_CAUSE_SYSTEM_PROMPT}

     ${skill}

 `;

  // ==============================================================
  // STEP 3
  // Build User Prompt
  // ==============================================================
  //
  // Supply all available investigation evidence.
  //
  // The agent reasons only from this information.
  // ==============================================================

  const userPrompt = `

     Analyze the following incident.

     Incident:
      ${JSON.stringify(agentInput.incident, null, 2)}

     Detection Result:
      ${JSON.stringify(agentInput.detectionResult, null, 2)}

     Current Workflow Step:
      ${agentInput.currentStep}

     Log Analysis Result:
      ${JSON.stringify(agentInput.logAnalysisResult, null, 2)}

     Log Analysis Artifacts:
      ${JSON.stringify(agentInput.logAnalysisArtifacts, null, 2)}

     Raw Logs (Reference Only):
      ${JSON.stringify(agentInput.logs, null, 2)}

     Identify the most probable root cause by following your assigned skill.

 `;

  // ==============================================================
  // STEP 4
  // Invoke AI Model
  // ==============================================================
  //
  // No runtime tools exist yet.
  //
  // Therefore a single invoke() call is sufficient.
  // ==============================================================

  const response = await model.invoke([
    new SystemMessage(systemPrompt),

    new HumanMessage(userPrompt),
  ]);

  // ==============================================================
  // STEP 5
  // Parse AI Response
  // ==============================================================
  //
  // Convert raw model output into JSON.
  // ==============================================================

  const parsedOutput = parseRootCauseResponse(response.content as string);

  // ==============================================================
  // STEP 6
  // Validate Parsed Output
  // ==============================================================
  //
  // Ensure every required field exists and has
  // the correct structure.
  // ==============================================================

  const validatedOutput = validateRootCauseOutput(parsedOutput);

  // ==============================================================
  // STEP 7
  // Return Structured Result
  // ==============================================================
  //
  // Returning an execution wrapper keeps the
  // architecture consistent with other agents.
  //
  // Later, runtime artifacts can be added here
  // without changing services or workflow nodes.
  // ==============================================================

  return {
    analysis: validatedOutput,
  };
};
