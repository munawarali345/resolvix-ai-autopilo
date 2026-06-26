// src/services/agentExecution/getAllExecutions.service.ts
// ========================
// Get All Executions
// ========================

import { AgentExecutionModel } from '../../models/agentExecution.model.js';

// ========================
// Get All Execution Records
// System ke saare execution records fetch karne ke liye
// ========================

export const getAllExecutionsService = async () => {
  // Saare execution records fetch karo
  const executions = await AgentExecutionModel.find()

    // Latest records pehle lao
    .sort({ createdAt: -1 })

    // Mongoose documents ki bajaye plain objects return karo
    .lean();

  // Agar records na milen
  if (executions.length === 0) {
    throw new Error('No executions found');
  }

  // Saare execution records return karo
  return executions;
};
