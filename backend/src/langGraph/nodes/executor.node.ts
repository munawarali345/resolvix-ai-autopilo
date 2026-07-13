// ================================================================
// EXECUTION NODE
// ================================================================
//
// Purpose:
// Ye node Execution Agent ko represent karta hai.
//
// Is node ka kaam:
// 1. Workflow step update karna
// 2. Future me Execution Agent ko call karna
// ================================================================

import { WorkflowGraphState } from '../state/workflow.state.js';

import {
  updateWorkflowStep,
  setexecutorAgentExecution,
} from '../../utils/workflowState.util.js';

import { exectorAgentService } from '../../services/agentsServices/executorAgentService/executorAgent.service.js';

type GraphState = typeof WorkflowGraphState.State;

// ================================================================
// EXECUTION NODE
// ================================================================
export const executionNode = async (state: GraphState): Promise<GraphState> => {
  // Workflow step ko "execution" par set karo
  const updatedState = updateWorkflowStep(state, 'execution');

  // ================================================================
  // STEP 2: Call fix agent Service
  // ================================================================
  const result = await exectorAgentService(updatedState);

  // ================================================================
  // STEP 3: Save result into state
  // ================================================================
  return setexecutorAgentExecution(updatedState, result);
};
