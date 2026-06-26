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
  LogAnalyzerAgentOutput,
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
// Store LogAnalysisResult
// ================================================================
export const setLogAnalysisResult = (
  state: GraphState,

  result: LogAnalyzerAgentOutput,
): GraphState => {
  return {
    ...state,

    logAnalysisResult: result,
  };
};
