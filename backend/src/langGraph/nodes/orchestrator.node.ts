// node = function

// ================================================================
// ORCHESTRATOR NODE
// ================================================================
//
// Purpose:
// Ye LangGraph ka pehla node hai.
//
// Is node ka kaam:
// 1. Workflow start karna.
// 2. Current workflow step update karna.
// 3. Orchestrator Agent ko call karna.
//
// state update hogi.
// isi file me actual orchestratorAgent() call hogi.
// ================================================================

import { WorkflowGraphState } from '../state/workflow.state.js';

type GraphState = typeof WorkflowGraphState.State;

import { updateWorkflowStep } from '../../utils/workflowState.util.js';

import { orchestratorService } from '../../services/agentsServices/orchestartorAgentService/orchestrator.service.js';

// ================================================================
// ORCHESTRATOR NODE
// ================================================================
export const orchestratorNode = async (
  state: GraphState,
): Promise<GraphState> => {
  // ================================================================
  // STEP 1: Set workflow step
  // ================================================================
  const updatedState = updateWorkflowStep(state, 'orchestrator');

  // ================================================================
  // STEP 2: Call Orchestrator Agent Service
  // ================================================================
  const decision = await orchestratorService(updatedState);

  // Updated state next node ko return karo.
  return {
    ...updatedState,

    orchestratorDecision: decision,
  };
};
