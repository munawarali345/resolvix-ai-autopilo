// ================================================================
// APPROVE INCIDENT SERVICE
// ================================================================
//
// Purpose:
//
// Human approval ke baad paused LangGraph workflow ko
// resume karna.
//
// Flow:
//
// 1. Validate incident
// 2. Get compiled workflow
// 3. Resume workflow
// 4. Return
//
// ================================================================

import { Command } from "@langchain/langgraph";

import { IncidentModel } from "../../models/incident.model.js";

import { getWorkflow } from "../../langGraph/graph/workflow.graph.js";

// ================================================================
// APPROVE INCIDENT
// ================================================================

export const approveIncidentService = async (
  incidentId: string,
): Promise<void> => {

  // ------------------------------------------------
  // STEP 1
  // Validate Incident
  // Ye sirf verify kar raha hai ki frontend ne valid Incident bheja hai.
  // ------------------------------------------------

  const incident = await IncidentModel.findById(incidentId);

  if (!incident) {

    throw new Error("Incident not found.");

  }

  if (incident.status === "resolved") {
    throw new Error("Incident is already resolved.");
  }

  if (incident.status === "rejected") {
     throw new Error("Incident is already rejected.");
  }

  // ------------------------------------------------
  // STEP 2
  // Get compiled workflow
  // Ye wahi compiled graph hai jo startup par bana tha.
  // Ye naya graph nahi banata.
  // Bas existing graph return karta hai.
  // ------------------------------------------------

  const workflow = getWorkflow();

  // -------------------------------------------------------------------------------
  // STEP 3
  // Resume paused workflow
  // Detection Service me bhi ye use hua tha 
  // bus input ka farq he
  // detection k time workflow.invoke(workflowState) yani new workflow start kro 
  // -------------------------------------------------------------------------------

  await workflow.invoke( // yaha new ni bana re he jo puase tha wo resume jer re he 

       new Command({

           resume: {

              approved: true,

            },

         }),

        {

         configurable: {

            thread_id: incidentId,

          },

       },

     );

};


// Command
// new Command({
//    resume:{
//       approved:true
//    }
// })

// Ye object seedha jayega

// const approvalDecision = interrupt(...)

// wali line par.

// Matlab

// ye

// approvalDecision

// ban jayega

// {
//    approved:true
// }

// Fir node ye dekhega

// if(!approvalDecision.approved)

// false

// to

// Execution Node

// ↓

// Reporter

// ↓

// END

// thread_id

// Ye bahut important hai.

// thread_id: incidentId

// Detection Service me bhi yehi diya tha.

// thread_id = incident._id

// Ab LangGraph MongoDB me yehi thread search karega.

// Example

// Thread

// 687e13...

// ↓

// MongoDB

// ↓

// State

// ↓

// approvalRouterNode

// ↓

// interrupt()

// ↓

// Resume

// Isliye hum state manually rebuild nahi karte.

// MongoDBSaver sab kuch already save kar chuka hota hai.