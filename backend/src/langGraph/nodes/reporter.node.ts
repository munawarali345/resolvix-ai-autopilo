// ================================================================
// REPORTER NODE
// ================================================================
//
// Purpose:
// Ye node Reporter Agent ko represent karta hai.
//
// Is node ka kaam:
// 1. Workflow step update karna
// ================================================================

import { WorkflowState } from '../../types/index.js';

import {
  updateWorkflowStep,
  setReporterExecution,
} from '../../utils/workflowState.util.js';

import { reporterService } from '../../services/agentsServices/reporterAgentService/reporter.service.js';

// ================================================================
// ROOT CAUSE NODE
// ================================================================
export const reporterNode = async (
  state: WorkflowState,
): Promise<WorkflowState> => {
  // ================================================================
  // STEP 1: Update workflow step
  // ================================================================
  const updatedState = updateWorkflowStep(state, 'reporting');

  // ================================================================
  // STEP 2: Call reporter Service
  // ================================================================
  const result = await reporterService(updatedState);

  // ================================================================
  // STEP 3: Save result into state
  // ================================================================
  return setReporterExecution(updatedState, result);
};
