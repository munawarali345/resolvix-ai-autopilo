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

  console.log("========== APPROVAL ROUTER ==========");
console.log("Incident:", state.incident?._id);
console.log("Approval Required:", state.riskValidatorResult?.approvalRequired);
console.log("Decision:", state.riskValidatorResult?.decision);
console.log("About to interrupt...");

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

  // ------------------------------------------------
  // Pause workflow and wait for human decision.
  //
  // interrupt() workflow ko yahin pause karega.
  //
  // Jab admin Approve/Reject karega,
  // LangGraph isi line par dobara resume hoga.
  //
  // interrupt() ka return value wahi data hoga
  // jo hum resume() ke through bhejenge.
  //
  // ------------------------------------------------

   const approvalDecision = interrupt({

     incidentId: state.incident?._id,

     reason: state.riskValidatorResult.reason,

     riskLevel: state.riskValidatorResult.riskLevel,

     riskScore: state.riskValidatorResult.riskScore,

  });


  // ------------------------------------------------
    // Safety Check
    //
    // Resume hone ke baad approvalDecision milni chahiye.
    //
    // Agar kisi wajah se empty hai to workflow continue
    // nahi karna chahiye.
    // ------------------------------------------------

    if (!approvalDecision) {
       throw new Error("Approval decision was not received.");
    }

    // ------------------------------------------------
    // Human rejected the fix.
    //
    // Workflow yahin terminate kar diya jayega.
    //
    // Execution node kabhi nahi chalega.
    // ------------------------------------------------
 
     if (!approvalDecision.approved) {

       return {};
       
     }

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
