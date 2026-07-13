// ================================================================
// BUILD METRICS FUNCTION
// ================================================================
//
// Purpose:
// Builds incident execution metrics from AgentExecution records.
//
// This function reads successful agent executions,
// calculates workflow timing,
// and returns the metrics used by the Reporter Agent.
//
// Deterministic business logic.
// No AI reasoning.
//
// ================================================================

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

import { ReportMetrics, AgentName } from '../../../types/index.js';

// ================================================================
// INPUT
// ================================================================

export interface BuildMetricsInput {
  incidentId: string;
}

// ================================================================
// BUILD REPORT METRICS
// ================================================================

export async function buildMetrics(
  input: BuildMetricsInput,
): Promise<ReportMetrics> {
  // ------------------------------------------------
  // Load successful executions for this incident
  // ------------------------------------------------

  const executions = await AgentExecutionModel.find({
    incidentId: input.incidentId,

    status: 'success',
  })

    .sort({ completedAt: 1 })

    .lean();

  // ------------------------------------------------
  // Build execution lookup table
  // ------------------------------------------------

  const executionMap = new Map(
    executions.map((execution) => [execution.agentName, execution]),
  );

  // ------------------------------------------------
  // Helper
  // ------------------------------------------------

  const getExecutionTime = (agentName: AgentName): number => {
    return executionMap.get(agentName)?.executionTime ?? 0;
  };

  // ------------------------------------------------
  // Individual metrics
  // ------------------------------------------------

  const detectionTime = getExecutionTime('detection');

  const diagnosisTime =
    getExecutionTime('log-analysis') + getExecutionTime('root-cause');

  const executionTime =
    getExecutionTime('fix') +
    getExecutionTime('risk-validator') +
    getExecutionTime('executor');

  // ------------------------------------------------
  // Total workflow time
  // ------------------------------------------------

  const totalTime = detectionTime + diagnosisTime + executionTime;

  // ------------------------------------------------
  // MTTR
  // ------------------------------------------------

  const executorExecution = executionMap.get('executor');

  const mttr =
    executorExecution?.completedAt && executions.length
      ? Math.round(
          (new Date(executorExecution.completedAt).getTime() -
            new Date(executions[0].startedAt).getTime()) /
            1000,
        )
      : null;

  // ------------------------------------------------
  // Return metrics
  // ------------------------------------------------

  return {
    detectionTime,

    diagnosisTime,

    executionTime,

    totalTime,

    mttr,
  };
}
