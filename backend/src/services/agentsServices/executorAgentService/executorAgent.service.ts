// ================================================================
// executor agent SERVICE
// ================================================================
//
// Purpose:
// Ye service executor Agent ko call karti hai.
//
// Flow:
// 1. Validate required workflow data
// 2. Build agent input
// 3. Call executor Agent
// 4. Save execution log
// 5. Return analysis
// ================================================================

import {
  ExecutorInput,
  ExecutorExecutionResult,
  WorkflowState,
} from '../../../types/index.js';

import { executorAgent } from '../../../agents/executorAgent/executorAgent.agent.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

import { IncidentModel } from '../../../models/incident.model.js';

// ================================================================
// ROOT CAUSE SERVICE
// ================================================================

export const exectorAgentService = async (
  state: WorkflowState,
): Promise<ExecutorExecutionResult> => {
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
    !state.riskValidatorResult ||
    !state.riskValidatorArtifacts ||
    !state.fixAgentArtifacts ||
    !state.fixAgentResult
  ) {
    throw new Error(
      'executor Service requires incident, riskvalidator result and riskvalidatorArtifacts, fix agent result and artifacts.',
    );
  }

  // ------------------------------------------------
  // STEP 3
  // Build Agent Input
  // ------------------------------------------------

  const agentInput: ExecutorInput = {
    incident: state.incident,

    riskValidation: state.riskValidatorResult,

    riskArtifacts: state.riskValidatorArtifacts,

    fixRecommendation: state.fixAgentResult,

    fixArtifacts: state.fixAgentArtifacts,

    currentStep: state.currentStep,
  };

  // ------------------------------------------------
  // STEP 4
  // Call Executor Agent
  // ------------------------------------------------

  const aiResponse = await executorAgent(agentInput);

  // ------------------------------------------------
  // Determine Incident Status
  // ------------------------------------------------

  let incidentStatus: 'open' | 'in_progress' | 'resolved';

  if (aiResponse.execution.executionStatus === 'SUCCESS') {
    incidentStatus = 'resolved';
  } else if (aiResponse.execution.executionStatus === 'ROLLED_BACK') {
    incidentStatus = 'open';
  } else {
    incidentStatus = 'in_progress';
  }

  // ------------------------------------------------
  // Update Incident
  // ------------------------------------------------

  await IncidentModel.findByIdAndUpdate(
    state.incident._id,

    {
      fixSummary: aiResponse.execution.summary,

      executionStatus: aiResponse.execution.executionStatus,

      status: incidentStatus,

      resolvedAt: incidentStatus === 'resolved' ? new Date() : undefined,

      updatedAt: new Date(),
    },
  );

  // ------------------------------------------------
  // STEP 5
  // Save execution log
  // ------------------------------------------------

  await AgentExecutionModel.create({
    incidentId: state.incident._id?.toString(),

    agentName: 'executor',

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
