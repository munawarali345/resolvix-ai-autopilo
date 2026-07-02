// ================================================================
// ROOT CAUSE NODE
// ================================================================
//
// Purpose:
// Ye node Root Cause Analysis Agent ko represent karta hai.
//
// Is node ka kaam:
// 1. Workflow step update karna
// 2. Future me Root Cause Agent ko call karna
// ================================================================

import { WorkflowState } from '../../types/index.js';

import {
  updateWorkflowStep,
  setRootCauseExecution,
} from '../../utils/workflowState.util.js';

import { rootCauseService } from '../../services/agentsServices/rootCauseAgentService/rootCause.Service.js';

// ================================================================
// ROOT CAUSE NODE
// ================================================================
export const rootCauseNode = async (
  state: WorkflowState,
): Promise<WorkflowState> => {
  // ================================================================
  // STEP 1: Update workflow step
  // ================================================================
  const updatedState = updateWorkflowStep(state, 'root-cause');

  // ================================================================
  // STEP 2: Call root couse Service
  // ================================================================
  const result = await rootCauseService(updatedState);

  // ================================================================
  // STEP 3: Save result into state
  // ================================================================
  return setRootCauseExecution(updatedState, result);
};
