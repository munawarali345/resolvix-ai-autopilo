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
