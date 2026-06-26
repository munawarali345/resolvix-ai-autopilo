// ================================================================
// REPORTING NODE
// ================================================================
//
// Purpose:
// Ye node Reporter Agent ko represent karta hai.
//
// Is node ka kaam:
// 1. Workflow step update karna
// 2. Future me Report generate karna
// ================================================================

import { WorkflowState } from '../../types/index.js';

import { updateWorkflowStep } from '../../utils/workflowState.util.js';

// ================================================================
// REPORTING NODE
// ================================================================
export const reportingNode = async (
  state: WorkflowState,
): Promise<WorkflowState> => {
  // Workflow step ko "reporting" par set karo
  const updatedState = updateWorkflowStep(
    state,

    'reporting',
  );

  // TODO:
  // Yahan future me reportingAgent(updatedState)
  // call hoga (incident report generate karega)

  return updatedState;
};
