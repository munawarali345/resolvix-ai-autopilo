// src/services/agentExecution/completeExecution.service.ts
// ========================
// Complete Agent Execution
// ========================

import { AgentExecutionModel } from '../../models/agentExecution.model.js';
import { AgentExecution } from '../../types/index.js';

// ========================
// Complete Execution
// ========================

export const completeExecutionService = async (
  executionId: string,
  output: Record<string, unknown>,
): Promise<AgentExecution> => {
  // Execution record find karo
  const execution = await AgentExecutionModel.findById(executionId);

  if (!execution) {
    throw new Error('Execution not found');
  }

  // Completion time set karo
  const completedAt = new Date();

  // Status success mark karo
  execution.status = 'success';

  // Agent ka output save karo
  execution.output = output;

  // Completion timestamp save karo
  execution.completedAt = completedAt;

  // Execution time calculate karo (milliseconds)
  execution.executionTime =
    completedAt.getTime() - execution.startedAt.getTime();

  // Changes database me save karo
  await execution.save();

  // Updated execution return karo
  return execution.toObject() as AgentExecution;
};
