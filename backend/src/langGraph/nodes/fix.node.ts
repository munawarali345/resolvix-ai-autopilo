// ================================================================
// FIX NODE
// ================================================================
//
// Purpose:
// Ye node Fix Agent ko represent karta hai.
//
// Is node ka kaam:
// 1. Workflow step update karna 
// 2. Future me Fix Agent ko call karna
// ================================================================

import { WorkflowGraphState } from '../state/workflow.state.js';

import { updateWorkflowStep, setFixExecution } from '../../utils/workflowState.util.js';

import { fixAgentService } from '../../services/agentsServices/fixAgentService/fixAgent.service.js';


type GraphState = typeof WorkflowGraphState.State;

// ================================================================
// FIX NODE
// ================================================================
export const fixNode = async (state: GraphState ): Promise<GraphState> => {

  // Workflow step ko "fix" par set karo
  const updatedState = updateWorkflowStep( state, 'fix' );

  // ================================================================
    // STEP 2: Call root couse Service
    // ================================================================
    const result = await fixAgentService(updatedState);
  

    // ================================================================
    // STEP 3: Save result into state
    // ================================================================
    return setFixExecution(updatedState, result);

};
