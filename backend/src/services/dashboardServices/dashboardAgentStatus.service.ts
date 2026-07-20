// ================================================================
// DASHBOARD AGENT STATUS SERVICE
// ================================================================
//
// Purpose:
//
//
// agentStatus:
// ------------------------------------------------------------
// Dashboard ke liye sirf execution summary chahiye.
//
// Isliye AgentExecution collection se:
//
// • Running
// • Success
// • Failed
//
// ek hi aggregation query me calculate karte hain.
// ------------------------------------------------------------
// ================================================================

import { AgentExecutionModel } from '../../models/agentExecution.model.js';

// ================================================================
// Dashboard Agent status
// ================================================================

export const getDashboardAgentSatatus = async () => {
  const [agentExecutionSummary] = await AgentExecutionModel.aggregate([
    {
      $group: {
        _id: null,

        runningAgents: {
          $sum: {
            $cond: [{ $eq: ['$status', 'running'] }, 1, 0],
          },
        },

        successfulExecutions: {
          $sum: {
            $cond: [{ $eq: ['$status', 'success'] }, 1, 0],
          },
        },

        failedExecutions: {
          $sum: {
            $cond: [{ $eq: ['$status', 'failed'] }, 1, 0],
          },
        },
      },
    },
  ]);

  // ------------------------------------------------------------
  // Empty database handling
  // ------------------------------------------------------------

  const agentStatus = agentExecutionSummary ?? {
    runningAgents: 0,

    successfulExecutions: 0,

    failedExecutions: 0,
  };

  return agentStatus;
};
