// src/services/agentExecution/getExecutionsByIncidentId.service.ts
// ========================
// Get Executions By Incident ID
// ========================

import { AgentExecutionModel } from '../../models/agentExecution.model.js';

// ========================
// Get All Executions For One Incident
// Ek incident ke saare agent executions fetch karne ke liye
// ========================

export const getExecutionsByIncidentIdService = async (incidentId: string) => {
  // Incident ID ke against saare executions find karo
  const executions = await AgentExecutionModel.find({ incidentId })

    // Latest records pehle lao
    .sort({ createdAt: -1 });

  // Agar koi execution na mile
  if (executions.length === 0) {
    throw new Error('No executions found for this incident');
  }

  // Saare execution records return karo
  return executions.map((execution) => execution.toObject());
};
