// ================================================================
// risk validator SERVICE
// ================================================================
//
// Purpose:
// Ye service risk validator ko call karti hai.
//
// Flow:
// 1. Validate required workflow data
// 2. Build agent input
// 3. Call risk validator Agent
// 4. Save execution log
// 5. Return analysis
// ================================================================

import {
  RiskValidatorInput,
  RiskValidatorExecutionResult,
  WorkflowState,
} from '../../../types/index.js';

import { riskValidatorAgent } from '../../../agents/risk-validatorAgent/riskValidator.agent.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

// ================================================================
// fix Agent SERVICE
// ================================================================

export const riskValidatorAgentService = async (
  state: WorkflowState,
): Promise<RiskValidatorExecutionResult> => {
  // ------------------------------------------------
  // STEP 1
  // Start execution timer
  // ------------------------------------------------

  const startTime = Date.now();

  // ------------------------------------------------
  // STEP 2
  // Validate required workflow data
  // ------------------------------------------------

  if (!state.incident || !state.fixAgentResult || !state.fixAgentArtifacts) {
    throw new Error(
      'risk validator Service requires incident, fix Agent Result, fix agent artifacts',
    );
  }

  // ------------------------------------------------
  // STEP 3
  // Build Agent Input
  // ------------------------------------------------

  const agentInput: RiskValidatorInput = {
    incident: state.incident,

    fixRecommendation: state.fixAgentResult,

    fixArtifacts: state.fixAgentArtifacts!, // ! lagya he measn ye null ni huga

    currentStep: state.currentStep,
  };


  // ------------------------------------------------
  // STEP 4
  // Call Root Cause Agent
  // ------------------------------------------------

  const aiResponse = await riskValidatorAgent(agentInput);

  // ------------------------------------------------
  // STEP 5
  // Save execution log
  // ------------------------------------------------

  await AgentExecutionModel.create({
    incidentId: state.incident._id?.toString(),

    agentName: 'risk-validator',

    status: 'success',

    input: agentInput,

    output: aiResponse,

    executionTime: Date.now() - startTime,

    startedAt: new Date(startTime),

    completedAt: new Date(),
  });

  // ------------------------------------------------
  // STEP 6
  // Return result
  // ------------------------------------------------

  return aiResponse;
};
