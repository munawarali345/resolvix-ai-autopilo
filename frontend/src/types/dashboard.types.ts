// ================================================================
// DASHBOARD TYPES
// ================================================================
//
// Purpose:
// Frontend dashboard data contract.
//
// Backend dashboard overview API ka response
// yaha define hoga.
//
// Flow:
//
// Backend
//    ↓
// dashboard.service
//    ↓
// dashboard.types
//    ↓
// Dashboard UI
//
// ================================================================

// ================================================================
// INCIDENT OVERVIEW
// ================================================================
//
// Total incidents aur status/severity counts.
//
// ================================================================

export interface IncidentOverview {
  // Total incidents count
  totalIncidents: number;

  // Status based counts
  openIncidents: number;

  inProgressIncidents: number;

  resolvedIncidents: number;

  // Severity based counts
  criticalIncidents: number;

  highIncidents: number;

  mediumIncidents: number;

  lowIncidents: number;
}

// ================================================================
// HEALTH METRICS
// ================================================================
//
// System health aur resolution percentage.
//
// ================================================================

export interface HealthMetrics {
  // Overall system health score
  systemHealth: number;

  // Resolved incidents percentage
  resolvedRate: number;
}

// ================================================================
// MTTR METRICS
// ================================================================
//
// Mean Time To Resolve.
//
// Minutes me backend se aa raha hai.
//
// ================================================================

export interface MttrMetrics {
  // Average resolution time
  averageMTTR: number;
}

// ================================================================
// AGENT STATUS
// ================================================================
//
// AI agent execution summary.
//
// ================================================================

export interface AgentStatus {
  // Currently running agents
  runningAgents: number;

  // Successful executions
  successfulExecutions: number;

  // Failed executions
  failedExecutions: number;
}

// ================================================================
// INCIDENT TREND CHART
// ================================================================
//
// Line chart ke liye data.
//
// ================================================================

export interface IncidentTrend {
  date: string;

  incidents: number;
}

// ================================================================
// SEVERITY DISTRIBUTION CHART
// ================================================================
//
// Pie chart ke liye data.
//
// ================================================================

export interface SeverityDistribution {
  severity: string;

  count: number;
}

// ================================================================
// MTTR TREND CHART
// ================================================================
//
// MTTR line chart data.
//
// ================================================================

export interface MttrTrend {
  date: string;

  averageMttr: number;
}

// ================================================================
// AGENT STATUS CHART
// ================================================================
//
// Agent execution chart data.
//
// ================================================================

export interface AgentStatusChart {
  agent: string;

  success: number;

  failed: number;

  running: number;
}

// ================================================================
// DASHBOARD CHARTS
// ================================================================

export interface DashboardCharts {
  incidentTrend: IncidentTrend[];

  severityDistribution: SeverityDistribution[];

  mttrTrend: MttrTrend[];

  agentStatus: AgentStatusChart[];
}

// ================================================================
// COMPLETE DASHBOARD RESPONSE
// ================================================================
//
// Backend:
//
// data:{
//   incidentOverview,
//   healthMetrics,
//   MttrMetrics,
//   agentStatus,
//   charts
// }
//
// ================================================================

export interface DashboardOverview {
  incidentOverview: IncidentOverview;

  healthMetrics: HealthMetrics;

  mttrMetrics: MttrMetrics;

  agentStatus: AgentStatus;

  charts: DashboardCharts;
}
