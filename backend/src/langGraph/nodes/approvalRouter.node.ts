// ================================================================
// APPROVAL ROUTER NODE
// ================================================================
//
// Purpose:
// Determines whether human approval is required.
//
// If approval is required, the workflow is paused
// using LangGraph interrupt().
//
// After approval is received, LangGraph resumes
// execution from this node.
//
// Otherwise the workflow continues directly to
// the Executor node.
//
// ================================================================

import { interrupt } from '@langchain/langgraph';

import { WorkflowState } from '../../types/index.js';

// ================================================================
// NODE
// ================================================================

export async function approvalRouterNode(
  state: WorkflowState,
): Promise<Partial<WorkflowState>> {
  // ------------------------------------------------
  // Safety Check
  // ------------------------------------------------

  if (!state.riskValidatorResult) {
    throw new Error(
      'Risk Validator result is missing before approval routing.',
    );
  }

  // ------------------------------------------------
  // Human Approval Required
  //
  // interrupt() workflow ko pause karta hai.
  //
  // Is waqt LangGraph current workflow state ko
  // configured checkpointer ke through persist karta hai.
  //
  // Neeche diya gaya payload frontend/API ko mil sakta hai
  // taake human approval request display ki ja sake.
  //
  // ------------------------------------------------

  if (state.riskValidatorResult.approvalRequired) {
    interrupt({
      incidentId: state.incident?._id,

      reason: state.riskValidatorResult.reason,

      riskLevel: state.riskValidatorResult.riskLevel,

      riskScore: state.riskValidatorResult.riskScore,
    });
  }

  // ------------------------------------------------
  // Continue Workflow
  // ------------------------------------------------

  return {};
}

// interrupt()
//         │
//         ▼
// LangGraph ko signal deta hai

//         │
//         ▼

// LangGraph

//         │
//         ▼

// Checkpointer

//         │
//         ▼

// State save hoti hai
