// ================================================================
// REPORT TYPES
// ================================================================
//
// Purpose:
// Frontend report module types.
//
// Backend:
// Report model response
//
// Used by:
// - Report Service
// - React Query Hooks
// - Report UI Components
//
// ===============================================================

// ================================================================
// REPORT INCIDENT STATUS
// ================================================================

export type ReportIncidentStatus = 'RESOLVED' | 'FAILED' | 'ROLLED_BACK';

// ================================================================
// REPORT TIMELINE
// ================================================================
//
// Backend:
// ReportTimeline
//
// Purpose:
// Agent execution timeline show karne ke liye.
//
// ================================================================

export type ReportTimeline = {
  timestamp: Date;

  event: string;

  agent: string;
};

// ================================================================
// REPORT METRICS
// ================================================================
//
// Backend:
// ReportMetrics
//
// Purpose:
// Incident performance metrics.
//
// ================================================================

export type ReportMetrics = {
  detectionTime: number;

  diagnosisTime: number;

  executionTime: number;

  totalTime: number;

  mttr: number | null;
};

// ================================================================
// REPORT LIST ITEM
// ================================================================
//
// GET /api/reports
//
// Backend list service sirf ye fields return kar rahi hai:
//
// {
//   id,
//   incidentId,
//   title,
//   summary,
//   incidentStatus,
//   confidence,
//   createdAt
// }
//
// ================================================================

export type Report = {
  id: string;

  incidentId: string;

  title: string;

  summary: string;

  incidentStatus: ReportIncidentStatus;

  confidence: number;

  createdAt?: Date;
};

// ================================================================
// REPORT DETAILS
// ================================================================
//
// GET /api/reports/:reportId
//
// Backend:
//
// {
//   incidentId,
//   title,
//   summary,
//   executiveSummary,
//   technicalSummary,
//   incidentStatus,
//   confidence,
//   timeline,
//   metrics
// }
//
// ================================================================

export type ReportDetails = {
  id: string;

  incidentId: string;

  title: string;

  summary: string;

  executiveSummary: string;

  technicalSummary: string;

  incidentStatus: ReportIncidentStatus;

  confidence: number;

  timeline: ReportTimeline[];

  metrics: ReportMetrics;

  createdAt?: Date;
};
