
// ================================================================
// REJECT INCIDENT SERVICE
// ================================================================
//
// Purpose:
//
// Human rejection ke baad:
//
// 1. Incident ko rejected mark karna
// 2. Paused workflow resume karna
// 3. approvalRouterNode workflow terminate karega
//
// ================================================================

import { Command } from "@langchain/langgraph";

import { IncidentModel } from "../../models/incident.model.js";

import { getWorkflow } from "../../langGraph/graph/workflow.graph.js";

// ================================================================
// REJECT INCIDENT
// ================================================================

export const rejectIncidentService = async (
  incidentId: string,
): Promise<void> => {

  // ------------------------------------------------
  // STEP 1
  // Validate Incident
  // ------------------------------------------------

  const incident = await IncidentModel.findById(incidentId);

  if (!incident) {
    throw new Error("Incident not found.");
  }

  if (incident.status === "resolved") {
    throw new Error("Resolved incident cannot be rejected.");
  }

  if (incident.status === "rejected") {
    throw new Error("Incident is already rejected.");
  }

  // ------------------------------------------------
  // STEP 2
  // Update Incident Status
  // ------------------------------------------------

  incident.status = "rejected";
  incident.updatedAt = new Date();

  await incident.save();

  // ------------------------------------------------
  // STEP 3
  // Get Workflow
  // ------------------------------------------------

  const workflow = getWorkflow();

  // ------------------------------------------------
  // STEP 4
  // Resume Workflow with rejection
  // ------------------------------------------------

  await workflow.invoke(

    new Command({

      resume: {

        approved: false,

      },

    }),

    {

      configurable: {

        thread_id: incidentId,

      },

    },

  );

};