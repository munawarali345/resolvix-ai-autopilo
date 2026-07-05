// ================================================================
// RISK VALIDATION NODE
// ================================================================
//
// Purpose:
// Ye node Risk Validation Agent ko represent karta hai.
//
// Is node ka kaam:
// 1. Workflow step update karna
// 2. Future me Risk Validation Agent ko call karna
// ================================================================

import { WorkflowGraphState } from '../state/workflow.state.js';

import {
  updateWorkflowStep,
  setRiskValidatorExecution,
} from '../../utils/workflowState.util.js';

import { riskValidatorAgentService } from '../../services/agentsServices/riskValidationAgentService/riskValidatorAgent.service.js';

type GraphState = typeof WorkflowGraphState.State;

// ================================================================
// RISK VALIDATION NODE
// ================================================================
export const riskValidationNode = async (
  state: GraphState,
): Promise<GraphState> => {
  // Workflow step ko "risk-validation" par set karo
  const updatedState = updateWorkflowStep(state, 'risk-validation');

  // ================================================================
  // STEP 2: Call risk validator Service
  // ================================================================
  const result = await riskValidatorAgentService(updatedState);

  // ================================================================
  // STEP 3: Save result into state
  // ================================================================
  return setRiskValidatorExecution(updatedState, result);
};
