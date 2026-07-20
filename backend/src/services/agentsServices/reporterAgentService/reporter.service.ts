// ================================================================
// REPORTER SERVICE
// ================================================================
//
// Purpose:
// Ye service Reporter Agent ko call karti hai.
//
// Flow:
// 1. Validate required workflow data
// 2. Build agent input
// 3. Call Reporter Agent
// 4. Save execution log
// 5. Return analysis
// ================================================================

import {
  ReporterInput,
  ReporterExecutionResult,
  WorkflowState,
} from '../../../types/index.js';

import { reporterAgent } from '../../../agents/reporterAgent/reporterAgent.agent.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

import { IncidentModel } from '../../../models/incident.model.js';

import { ReportModel } from '../../../models/report.model.js';

import { emitDashboardUpdate } from '../../../socket/dashboardEvents.socket.js';

import { emitAgentStatusUpdate } from '../../../socket/agentStatus.events.socket.js';

// ================================================================
// Reporter agent SERVICE
// ================================================================

export const reporterService = async (
  state: WorkflowState,
): Promise<ReporterExecutionResult> => {
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
    !state.orchestratorDecision ||
    !state.logAnalysisResult ||
    !state.logAnalysisArtifacts ||
    !state.rootCauseResult ||
    !state.fixAgentResult ||
    !state.fixAgentArtifacts ||
    !state.riskValidatorResult ||
    !state.riskValidatorArtifacts ||
    !state.executorAgentResult ||
    !state.executorAgentArtifacts
  ) {
    throw new Error(
      'Reporter Service requires incident, detection result, log analysis result, and log analysis artifacts.',
    );
  }

  // ------------------------------------------------
  // STEP 3
  // Build Agent Input
  // ------------------------------------------------

  const agentInput: ReporterInput = {
    incident: state.incident,

    detection: state.detectionResult,

    orchestrator: state.orchestratorDecision,

    logAnalysis: state.logAnalysisResult,

    logAnalysisArtifacts: state.logAnalysisArtifacts,

    rootCause: state.rootCauseResult,

    fixRecommendation: state.fixAgentResult,

    fixAgentArtifacts: state.fixAgentArtifacts,

    riskValidation: state.riskValidatorResult,

    riskValidatorArtifacts: state.riskValidatorArtifacts,

    execution: state.executorAgentResult,

    executionAgentArtifacts: state.executorAgentArtifacts,

    currentStep: state.currentStep,
  };

  // ------------------------------------------------
  // STEP 4
  // Call Reporter Agent
  // ------------------------------------------------

  const aiResponse = await reporterAgent(agentInput);

  const executionStatus = state.executorAgentResult.executionStatus;

  let incidentStatus: 'open' | 'in_progress' | 'resolved';

  if (executionStatus === 'SUCCESS') {
    incidentStatus = 'resolved';
  } else if (executionStatus === 'ROLLED_BACK') {
    incidentStatus = 'open';
  } else {
    incidentStatus = 'in_progress';
  }

  await IncidentModel.findByIdAndUpdate(
    state.incident._id,

    {
      status: incidentStatus,

      resolvedAt: incidentStatus === 'resolved' ? new Date() : null,

      mttr: aiResponse.report.metrics.mttr,

      updatedAt: new Date(),
    },
  );

  // ------------------------------------------------
  // STEP 5
  // create report
  // -------------------------------------------------
  await ReportModel.create({
    incidentId: state.incident._id?.toString(),
    title: aiResponse.report.title,
    summary: aiResponse.report.summary,
    executiveSummary: aiResponse.report.executiveSummary,
    technicalSummary: aiResponse.report.technicalSummary,
    incidentStatus: aiResponse.report.incidentStatus,
    confidence: aiResponse.report.confidence,
    timeline: aiResponse.report.timeline,
    metrics: aiResponse.report.metrics,
  });

  // Dashboard refresh
  emitDashboardUpdate();

  // ------------------------------------------------
  // STEP 6
  // Save execution log
  // ------------------------------------------------

  const execution = await AgentExecutionModel.create({
    incidentId: state.incident._id?.toString(),

    agentName: 'reporter',

    status: 'success',

    input: agentInput,

    output: aiResponse,

    executionTime: Date.now() - startTime,

    startedAt: new Date(startTime),

    completedAt: new Date(),
  });

  // agentExecution update on frontend
  emitAgentStatusUpdate({
    incidentId: execution.incidentId,

    agentName: execution.agentName,

    status: execution.status,

    executionTime: execution.executionTime,

    startedAt: execution.startedAt,

    completedAt: execution.completedAt,

    error: execution.error,
  });

  // ------------------------------------------------
  // STEP 7
  // Return result
  // ------------------------------------------------

  return aiResponse;
};
