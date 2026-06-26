// ========================
// Create Agent Execution
// ========================

import { AgentExecutionModel } from '../../models/agentExecution.model.js';
import { AgentExecution, AgentName } from '../../types/index.js';

// ========================
// Create Execution
// Jab koi agent start ho to uski execution DB me save karo
// ========================

export const createExecutionService = async (
  incidentId: string,
  agentName: AgentName,
  input: Record<string, unknown>,
): Promise<AgentExecution> => {
  // Nayi execution create karo
  const execution = await AgentExecutionModel.create({
    // Kis incident ke liye execution chal rahi hai
    incidentId,

    // Kaunsa agent run hua
    agentName,

    // Start me status hamesha running hoga
    status: 'running',

    // Agent ko jo input mila
    input,

    // Abhi execution complete nahi hui
    // Isliye time 0 rakho
    executionTime: 0,

    // Execution start time
    startedAt: new Date(),
  });

  // Created execution return karo
  return execution.toObject() as AgentExecution;
};
