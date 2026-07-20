// ================================================================
// LOG ANALYSIS SERVICE
// ================================================================
//
// Purpose:
// Ye service Log Analysis Agent ko call karti hai.
//
// Flow:
// 1. Input build
// 2. Agent call
// 3. Execution log save
// 4. Result return
// ================================================================

import {
  LogAnalyzerAgentInput,
  LogAnalyzerExecutionResult,
  WorkflowState,
} from '../../../types/index.js';

import { logAnalyzerAgent } from '../../../agents/log-analysisAgent/logAnalysis.agent.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

import { emitAgentStatusUpdate } from '../../../socket/agentStatus.events.socket.js';

// ================================================================
// LOG ANALYSIS SERVICE
// ================================================================
export const logAnalysisService = async (
  state: WorkflowState,
): Promise<LogAnalyzerExecutionResult> => {
  // ------------------------------------------------
  // STEP 1: Start timer
  // ------------------------------------------------
  const startTime = Date.now();

  // ------------------------------------------------
  // STEP 2: Required data validate
  // ------------------------------------------------
  if (!state.incident || !state.detectionResult) {
    throw new Error(
      'Log Analysis Service requires incident and detection result.',
    );
  }

  // ------------------------------------------------
  // STEP 3: Build Agent Input
  // ------------------------------------------------
  const agentInput: LogAnalyzerAgentInput = {
    incident: state.incident,

    logs: state.logs,

    detectionResult: state.detectionResult,

    currentStep: state.currentStep,
  };

  // ------------------------------------------------
  // STEP 4: Call Log Analyzer Agent
  // ------------------------------------------------
  const aiResponse = await logAnalyzerAgent(agentInput);

  // ------------------------------------------------
  // STEP 5: Save execution log
  // ------------------------------------------------

  const execution = await AgentExecutionModel.create({
    incidentId: state.incident._id?.toString(),

    agentName: 'log-analysis',

    status: 'success',

    input: agentInput,

    output: aiResponse,

    executionTime: Date.now() - startTime,

    startedAt: new Date(startTime),

    completedAt: new Date(),
  });

  // agentExecution update on frontend
  emitAgentStatusUpdate({
    incidentId: execution.incidentId,

    agentName: execution.agentName,

    status: execution.status,

    executionTime: execution.executionTime,

    startedAt: execution.startedAt,

    completedAt: execution.completedAt,

    error: execution.error,
  });

  // ------------------------------------------------
  // STEP 6: Return result
  // ------------------------------------------------
  return aiResponse;
};
