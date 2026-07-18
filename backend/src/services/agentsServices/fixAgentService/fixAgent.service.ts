// ================================================================
// fix Agent SERVICE
// ================================================================
//
// Purpose:
// Ye service fix Agent ko call karti hai.
//
// Flow:
// 1. Validate required workflow data
// 2. Build agent input
// 3. Call Root Cause Agent
// 4. Save execution log
// 5. Return analysis
// ================================================================

import {
  FixAgentInput,
  FixAgentExecutionResult,
  WorkflowState,
} from '../../../types/index.js';

import { fixAgent } from '../../../agents/fixAgent/fixAgent.agent.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

// ================================================================
// fix Agent SERVICE
// ================================================================

export const fixAgentService = async (
  state: WorkflowState,
): Promise<FixAgentExecutionResult> => {
  // ------------------------------------------------
  // STEP 1
  // Start execution timer
  // ------------------------------------------------

  const startTime = Date.now();

  // ------------------------------------------------
  // STEP 2
  // Validate required workflow data
  // ------------------------------------------------

  if (!state.incident || !state.rootCauseResult || !state.logAnalysisResult) {
    throw new Error(
      'Fix Agent Service requires incident, log analysis result and root cause result',
    );
  }

  // ------------------------------------------------
  // STEP 3
  // Build Agent Input
  // ------------------------------------------------

  const agentInput: FixAgentInput = {
    incident: state.incident,

    logAnalysisResult: state.logAnalysisResult,

    rootCauseResult: state.rootCauseResult,

    currentStep: state.currentStep,
  };

  // ------------------------------------------------
  // STEP 4
  // Call Root Cause Agent
  // ------------------------------------------------

  const aiResponse = await fixAgent(agentInput);

  // ------------------------------------------------
  // STEP 5
  // Save execution log
  // ------------------------------------------------

  console.log("===== FIX INCIDENT =====");
console.log(state.incident);
console.log("Incident _id:", state.incident._id);
  await AgentExecutionModel.create({

    incidentId: state.incident._id?.toString() || 'no-incident',

    agentName: 'fix',

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
