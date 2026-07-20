// ================================================================
// COMPLETE NODE
// ================================================================
//
// Purpose:
//
// Final workflow step.
//
// Is node ka kaam:
//
// 1. Workflow ko completed mark karna
// 2. Future cleanup hooks ki jagah provide karna
//
// NOTE:
//
// Koi AI call nahi.
// Koi DB update nahi.
// Koi service call nahi.
//
// ================================================================

import { WorkflowState } from '../../types/index.js';

import { updateWorkflowStep } from '../../utils/workflowState.util.js';

// ================================================================
// COMPLETE NODE
// ================================================================

export const completeNode = async (
  state: WorkflowState,
): Promise<WorkflowState> => {
  const updatedState = updateWorkflowStep(state, 'completed');

  return updatedState;
};
