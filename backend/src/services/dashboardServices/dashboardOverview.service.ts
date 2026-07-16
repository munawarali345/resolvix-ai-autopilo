
// ================================================================
// DASHBOARD OVERVIEW SERVICE
// ================================================================
//
// Purpose:
//
// Dashboard home page ke liye required metrics collect karta hai.
//
// Responsibilities:
//
// 1. Incident statistics
// 2. Health metrics
// 3. MTTR
// 4. Agent execution status
// 5. Chart data
//
// Ye service sirf data prepare karegi.
// Controller sirf is service ko call karega.
// ================================================================

import { getDashboardCharts } from './dashboardChart.service.js';
import { getDashboardMttrMetrics } from './dashboardMttr.service.js';
import { getDashboardincidentOverview } from './dashboardIncidentOverview.service.js';
import { getDashboardAgentSatatus } from './dashboardAgentStatus.service.js';
import { getDashboardHealthMetrics } from './dashboardHealthMetrics.service.js';


// ================================================================
// Dashboard Overview Service
// ================================================================

export const dashboardOverviewService = async () => {

  try {

// ============================================================
// STEP 1
// Incident Overview
// ============================================================

// ------------------------------------------------------------
// Single aggregation query
//
// Is query se ek hi database call me:
//
// • Total Incidents
// • Open
// • In Progress
// • Resolved
// • Critical
// • High
// • Medium
// • Low
//
// sab calculate ho jayega.
// ------------------------------------------------------------
const incidentOverview = await getDashboardincidentOverview();


// ============================================================
// STEP 2
// Health Metrics
// ============================================================

// ------------------------------------------------------------
// Dashboard health score.
//
// Fake monitoring system hai.
//
// Health ko incident severity ke basis per calculate
// kar rahe hain.
//
// Future:
//
// Prometheus
// Grafana
// Kubernetes
//
// se replace ho jayega.
// ------------------------------------------------------------
const healthMetrics =  getDashboardHealthMetrics(incidentOverview)


// ============================================================
// STEP 3
// MttrMatrics
// ============================================================
const MttrMetrics = await getDashboardMttrMetrics()



// ============================================================
// STEP 4
// Agent Status
// ============================================================

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
const agentStatus = await getDashboardAgentSatatus();


// ============================================================
// STEP 5
// Charts
// ============================================================
const charts = await getDashboardCharts();


// ============================================================
// STEP 6
// Return Dashboard Data
// ============================================================
return  {

  incidentOverview,
  
  healthMetrics,

  MttrMetrics,

  agentStatus,

  charts

}

} catch (error: any) {

    throw new Error(`Dashboard overview failed: ${error.message}`);

  }

};