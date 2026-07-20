// ================================================================
// WORKFLOW UTILITY FUNCTIONS
// ================================================================
// Purpose:
// Ye helpers LangGraph nodes ke andar state update karne ke liye use hote hain.
// Pure immutable updates follow kiye gaye hain (production standard).
// ================================================================

import {
  OrchestratorAgentOutput,
  WorkflowStep,
  RootCauseExecutionResult,
  LogAnalyzerExecutionResult,
  FixAgentExecutionResult,
  RiskValidatorExecutionResult,
  ExecutorExecutionResult,
  ReporterExecutionResult,
} from '../types/index.js';
import { WorkflowGraphState } from '../langGraph/state/workflow.state.js';

// LangGraph inferred state type (IMPORTANT)
type GraphState = typeof WorkflowGraphState.State;
// ================================================================
// Update current workflow step
// ================================================================
export const updateWorkflowStep = (
  state: GraphState,
  step: WorkflowStep,
): GraphState => {
  return {
    ...state,

    currentStep: step,
  };
};

// ================================================================
// Store workflow error
// ================================================================
export const setWorkflowError = (
  state: GraphState,
  error: string,
): GraphState => {
  return {
    ...state,

    error,
  };
};

// ================================================================
// Store Orchestrator Decision
// ================================================================
export const setOrchestratorDecision = (
  state: GraphState,

  decision: OrchestratorAgentOutput,
): GraphState => {
  return {
    ...state,

    orchestratorDecision: decision,
  };
};

// ================================================================
// Store complete Log Analysis execution
// ================================================================
export const setLogAnalysisExecution = (
  state: GraphState,
  result: LogAnalyzerExecutionResult,
): GraphState => {
  return {
    ...state,

    // Save AI analysis
    logAnalysisResult: result.analysis,

    // Save tool outputs
    logAnalysisArtifacts: result.artifacts,
  };
};

// ================================================================
// Store complete rootCause execution
// ================================================================
export const setRootCauseExecution = (
  state: GraphState,
  result: RootCauseExecutionResult,
): GraphState => {
  return {
    ...state,

    // Save AI analysis
    rootCauseResult: result.analysis,

    incident: {
      ...state.incident!,

      rootCause: result.analysis.rootCause,
    },
  };
};

// ================================================================
// Store complete fix agent execution
// ================================================================
export const setFixExecution = (
  state: GraphState,
  result: FixAgentExecutionResult,
): GraphState => {
  return {
    ...state,

    // Save AI analysis
    fixAgentResult: result.analysis,

    // Save tool outputs
    fixAgentArtifacts: result.artifacts,
  };
};

// ================================================================
// Store complete risk validator execution
// ================================================================
export const setRiskValidatorExecution = (
  state: GraphState,
  result: RiskValidatorExecutionResult,
): GraphState => {
  return {
    ...state,

    // Save AI analysis
    riskValidatorResult: result.analysis,

    // Save tool outputs
    riskValidatorArtifacts: result.artifacts,
  };
};

// ================================================================
// Store complete executor execution
// ================================================================

export const setexecutorAgentExecution = (
  state: GraphState,

  result: ExecutorExecutionResult,
): GraphState => {
  // Filhal jo incident status state me hai, usi ko default maan lo
  // let incidentStatus = state.incident!.status; // defult status

  // if (result.execution.executionStatus === 'SUCCESS') {
  //   incidentStatus = 'resolved';
  // } else if (result.execution.executionStatus === 'ROLLED_BACK') {
  //   incidentStatus = 'open';
  // } else {
  //   incidentStatus = 'in_progress';
  // }

  return {
    ...state,

    executorAgentResult: result.execution,

    executorAgentArtifacts: result.artifacts,

    incident: {
      ...state.incident!,

      fixSummary: result.execution.summary,

      executionStatus: result.execution.executionStatus,
    },
  };
};

// ================================================================
// Store complete reporter execution
// ================================================================
export const setReporterExecution = (
  state: GraphState,
  result: ReporterExecutionResult,
): GraphState => {
  let incidentStatus = state.incident!.status;

  const executionStatus = state.executorAgentResult!.executionStatus;

  if (executionStatus === 'SUCCESS') {
    incidentStatus = 'resolved';
  } else if (executionStatus === 'ROLLED_BACK') {
    incidentStatus = 'open';
  } else {
    incidentStatus = 'in_progress';
  }

  return {
    ...state,

    reporterAgentResult: result.report,

    reporterAgentArtifacts: result.artifacts,

    incident: {
      ...state.incident!,

      status: incidentStatus,

      resolvedAt:
        incidentStatus === 'resolved' ? new Date() : state.incident!.resolvedAt,

      mttr: result.report.metrics.mttr,
    },
  };
};
