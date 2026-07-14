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

  // Frontend ke liye required fields map karo
  const agentStatus = executions.map((execution) => ({
    agentName: execution.agentName,
    status: execution.status,
    executionTime: execution.executionTime,
    startedAt: execution.startedAt,
    completedAt: execution.completedAt,
    error: execution.error,
  }));

  // Return mapped response
  return agentStatus;
};
