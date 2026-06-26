// ================================================================
// LOG ANALYSIS NODE
// ================================================================

import { updateWorkflowStep } from '../../utils/workflowState.util.js';

import { WorkflowGraphState } from '../state/workflow.state.js';

import { logAnalysisService } from '../../services/agentsServices/logAnalyzerService/logAnalyzer.service.js';

type GraphState = typeof WorkflowGraphState.State;

// ================================================================
// LOG ANALYSIS NODE
// ================================================================
export const logAnalysisNode = async (
  state: GraphState,
): Promise<GraphState> => {
  // ================================================================
  // STEP 1: Update workflow step
  // ================================================================
  const updatedState = updateWorkflowStep(state, 'log-analysis');

  // ================================================================
  // STEP 2: Call Log Analysis Service
  // ================================================================
  const result = await logAnalysisService(updatedState);

  // ================================================================
  // STEP 3: Save result into state
  // ================================================================
  return {
    ...updatedState,

    logAnalysisResult: result,
  };
};
