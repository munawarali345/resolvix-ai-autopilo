// ================================================================
// ORCHESTRATOR SERVICE (AI BRAIN ENGINE)
// ================================================================
// Purpose:
// Ye service Orchestrator Agent ko call karti hai aur decision return karti hai.
//
// Flow:
// 1. Input build
// 2. Qwen AI call
// 3. Execution log save
// 4. Clean decision return
// ================================================================

import {
  OrchestratorAgentOutput,
  WorkflowState,
  OrchestratorAgentInput,
} from '../../../types/index.js';

import { orchestratorAgent } from '../../../agents/orchestratorAgent/orchestrator.agent.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

// main function
export const orchestratorService = async (
  updatedState: WorkflowState,
): Promise<OrchestratorAgentOutput> => {
  // ------------------------------------------------
  // STEP 1: Execution start time (performance tracking)
  // ------------------------------------------------
  const startTime = Date.now();

  //  pehle check kro incident or desion result he ya ni
  // agar ni he to
  if (!updatedState.incident || !updatedState.detectionResult) {
    throw new Error(
      'Orchestrator Service requires incident and detection result.',
    );
  }

  // ------------------------------------------------
  // STEP 2: Build AI input from workflow state
  // ------------------------------------------------
  const agentInput: OrchestratorAgentInput = {
    incident: updatedState.incident,
    logs: updatedState.logs,
    detectionResult: updatedState.detectionResult,
    currentStep: updatedState.currentStep,
  };

  // ------------------------------------------------
  // STEP 2: Call Orchestrator AI Agent (Qwen)
  // ------------------------------------------------

  const aiResponse = await orchestratorAgent(agentInput);

  // ------------------------------------------------
  // STEP 5: Save execution log (audit trail)
  // ------------------------------------------------
  await AgentExecutionModel.create({
    incidentId: updatedState.incident?._id?.toString() || 'no-incident',

    agentName: 'orchestrator',

    status: 'success',

    input: agentInput,

    output: aiResponse,

    executionTime: Date.now() - startTime,

    startedAt: new Date(startTime),

    completedAt: new Date(),
  });

  // ------------------------------------------------
  // STEP 6: Return final orchestrator decision
  // ------------------------------------------------
  return aiResponse;
};
