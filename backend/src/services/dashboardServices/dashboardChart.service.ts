
// ================================================================
// DASHBOARD CHART SERVICE
// ================================================================
//
// Purpose:
//
// Dashboard ke saare charts ka data prepare karta hai.
//
// Frontend Recharts use karega.
// Backend sirf chart-ready arrays return karega.
// IncidentModel.aggregate() -> MongoDB aggregation pipeline start karta hai.
//
// Charts:
//
// 1. Incident Trend
// 2. Severity Distribution
// 3. MTTR Trend
// 4. Agent Status
//
// ================================================================

import { IncidentModel } from "../../models/incident.model.js";
import { AgentExecutionModel } from "../../models/agentExecution.model.js";


// ================================================================
// Dashboard Charts
// ================================================================

export const getDashboardCharts = async () => {

// ================================================================
// STEP 1
// Incident Trend (Daily Incident Count)
// ================================================================
//
// Purpose:
//
// Daily basis par kitne incidents detect huye.
//
// Ye data frontend Line Chart me use hoga.
//
// ================================================================

const incidentTrend = await IncidentModel.aggregate([

  // ------------------------------------------------
  // STEP 1
  // Group incidents by date
  // ------------------------------------------------

  {
    $group: {

      _id: {

        $dateToString: {

          format: "%Y-%m-%d",

          date: "$detectedAt",

        },

      },

      incidents: {

        $sum: 1,

      },

    },

  },

  // ------------------------------------------------
  // STEP 2
  // Sort by date
  // ------------------------------------------------

  {

    $sort: {

      _id: 1,

    },

  },

  // ------------------------------------------------
  // STEP 3
  // Rename fields for frontend
  // ------------------------------------------------

  {

    $project: {

      _id: 0,

      date: "$_id",

      incidents: 1,

    },

  },

]);


// ================================================================
// STEP 2
// Severity Distribution
// ================================================================
//
// Purpose:
//
// Count incidents by severity.
//
// Frontend will use this data
// for Pie / Donut chart.
//
// ================================================================

const severityDistribution = await IncidentModel.aggregate([

  // ------------------------------------------------
  // STEP 1
  // Group incidents by severity
  // ------------------------------------------------

  {
    $group: {

      _id: "$severity", // Same severity wale saare incidents ek group me chale jayenge.

      count: { // Har incident ko count karega

        $sum: 1,

      },

    },

  },

  // ----------------------------------------------------------------------------
  // STEP 2
  // Rename fields for frontend
  // yaha hame mongo jo dega wo ni hume frontedn me jo show kerna he rename krenge 
  // -----------------------------------------------------------------------------

  {

    $project: {

      _id: 0,

      severity: "$_id",

      count: 1,

    },

  },

]);


// ================================================================
// STEP 3
// MTTR Trend
// ================================================================
//
// Purpose:
//
// Calculate average MTTR per day.
//
// Frontend will use this
// for Line Chart.
//
// ================================================================
const mttrTrend = await IncidentModel.aggregate([

  // ------------------------------------------------
  // STEP 1
  // Only resolved incidents having MTTR
  // ------------------------------------------------

  {

    $match: {

      resolvedAt: { $ne: null },

      mttr: { $ne: null },

    },

  },

  // ------------------------------------------------
  // STEP 2
  // Group by resolved date
  // ------------------------------------------------

  {

    $group: {

      _id: {

        $dateToString: {

          format: "%Y-%m-%d",

          date: "$resolvedAt",

        },

      },

      averageMttr: {

        $avg: "$mttr",

      },

    },

  },

  // ------------------------------------------------
  // STEP 3
  // Sort by date
  // ------------------------------------------------

  {

    $sort: {

      _id: 1,

    },

  },

  // ------------------------------------------------
  // STEP 4
  // Format response
  // ------------------------------------------------

  {

    $project: {

      _id: 0,

      date: "$_id",

      averageMttr: {

        $round: ["$averageMttr", 2],

      },

    },

  },

]);



// ================================================================
// STEP 4
// Agent Status
// ================================================================
//
// Purpose:
//
// Count successful and failed executions
// for every AI agent.
//
// Frontend will use this data
// for Bar Chart.
//
// ================================================================

const agentStatus = await AgentExecutionModel.aggregate([

  // ------------------------------------------------
  // STEP 1
  // Group by agent name + execution status
  // ------------------------------------------------

  {

    $group: {

      _id: {

        agentName: "$agentName",

        status: "$status",

      },

      count: {

        $sum: 1,

      },

    },

  },

  // ------------------------------------------------
  // STEP 2
  // Group again by agent
  // ------------------------------------------------

  {

    $group: {

      _id: "$_id.agentName",

      executions: {

        $push: {

          status: "$_id.status",

          count: "$count",

        },

      },

    },

  },

  // ------------------------------------------------
  // STEP 3
  // Format response for frontend
  // ------------------------------------------------

  {

    $project: {

      _id: 0,

      agent: "$_id",

      success: {

        $ifNull: [

          {

            $first: {

              $map: {

                input: {

                  $filter: {

                    input: "$executions",

                    as: "execution",

                    cond: {

                      $eq: ["$$execution.status", "success"],

                    },

                  },

                },

                as: "successExecution",

                in: "$$successExecution.count",

              },

            },

          },

          0,

        ],

      },

      failed: {

        $ifNull: [

          {

            $first: {

              $map: {

                input: {

                  $filter: {

                    input: "$executions",

                    as: "execution",

                    cond: {

                      $eq: ["$$execution.status", "failed"],

                    },

                  },

                },

                as: "failedExecution",

                in: "$$failedExecution.count",

              },

            },

          },

          0,

        ],

      },

      running: {

        $ifNull: [

          {

            $first: {

              $map: {

                input: {

                  $filter: {

                    input: "$executions",

                    as: "execution",

                    cond: {

                      $eq: ["$$execution.status", "running"],

                    },

                  },

                },

                as: "runningExecution",

                in: "$$runningExecution.count",

              },

            },

          },

          0,

        ],

      },

    },

  },

]);


return {

     incidentTrend,

     severityDistribution,

     mttrTrend,

     agentStatus,

  };


};