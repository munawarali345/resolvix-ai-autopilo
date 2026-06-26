// src/services/agentExecution/getExecutionById.service.ts
// Get Execution By ID
// ========================
// iska kam
// execution id mile
// db se record lao
// or retrun kro
// ========================

import { AgentExecutionModel } from '../../models/agentExecution.model.js';

// ========================
// Get Single Execution
// ========================

export const getExecutionByIdService = async (executionId: string) => {
  // Execution record find karo
  const execution = await AgentExecutionModel.findById(executionId);

  // Record na mile
  if (!execution) {
    throw new Error('Execution not found');
  }

  // Execution return karo
  return execution.toObject();
};
