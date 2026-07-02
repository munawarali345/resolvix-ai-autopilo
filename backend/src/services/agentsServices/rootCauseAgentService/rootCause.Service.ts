// ================================================================
// ROOT CAUSE SERVICE
// ================================================================
//
// Purpose:
// Ye service Root Cause Agent ko call karti hai.
//
// Flow:
// 1. Validate required workflow data
// 2. Build agent input
// 3. Call Root Cause Agent
// 4. Save execution log
// 5. Return analysis
// ================================================================

import {
  RootCauseAgentInput,
  RootCauseExecutionResult,
  WorkflowState,
} from '../../../types/index.js';

import { rootCauseAgent } from '../../../agents/root-causeAgent/rootCouse.agnte.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

import { IncidentModel } from '../../../models/incident.model.js';

// ================================================================
// ROOT CAUSE SERVICE
// ================================================================

export const rootCauseService = async (
  state: WorkflowState,
): Promise<RootCauseExecutionResult> => {
  // ------------------------------------------------
  // STEP 1
  // Start execution timer
  // ------------------------------------------------

  const startTime = Date.now();

  // ------------------------------------------------
  // STEP 2
  // Validate required workflow data
  // ------------------------------------------------

  if (
    !state.incident ||
    !state.detectionResult ||
    !state.logAnalysisResult ||
    !state.logAnalysisArtifacts
  ) {
    throw new Error(
      'Root Cause Service requires incident, detection result, log analysis result, and log analysis artifacts.',
    );
  }

  // ------------------------------------------------
  // STEP 3
  // Build Agent Input
  // ------------------------------------------------

  const agentInput: RootCauseAgentInput = {
    incident: state.incident,

    logs: state.logs,

    detectionResult: state.detectionResult,

    logAnalysisResult: state.logAnalysisResult,

    logAnalysisArtifacts: state.logAnalysisArtifacts,

    currentStep: state.currentStep,
  };

  // ------------------------------------------------
  // STEP 4
  // Call Root Cause Agent
  // ------------------------------------------------

  const aiResponse = await rootCauseAgent(agentInput);

  await IncidentModel.findByIdAndUpdate(
    state.incident._id,

    {
      rootCause: aiResponse.analysis.rootCause,

      updatedAt: new Date(),
    },
  );

  // ------------------------------------------------
  // STEP 5
  // Save execution log
  // ------------------------------------------------

  await AgentExecutionModel.create({
    incidentId: state.incident._id?.toString(),

    agentName: 'root-cause',

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
