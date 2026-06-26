// src/services/agentExecution/failExecution.service.ts
// ========================
// Fail Agent Execution
// ========================

import { AgentExecutionModel } from '../../models/agentExecution.model.js';
import { AgentExecution } from '../../types/index.js';

// ========================
// Mark Execution As Failed
// ========================

export const failExecutionService = async (
  executionId: string,
  error: string,
): Promise<AgentExecution> => {
  // Existing execution record find karo
  const execution = await AgentExecutionModel.findById(executionId);

  // Execution record exist na kare
  if (!execution) {
    throw new Error('Execution not found');
  }

  // Current completion time lo
  const completedAt = new Date();

  // Status failed mark karo
  execution.status = 'failed';

  // Error message save karo
  execution.error = error;

  // Completion timestamp save karo
  execution.completedAt = completedAt;

  // Total execution time calculate karo
  execution.executionTime =
    completedAt.getTime() - execution.startedAt.getTime();

  // Updated execution database me save karo
  await execution.save();

  // Updated object return karo
  return execution.toObject() as AgentExecution;
};
