// ================================================================
// INCIDENT TYPES
// ================================================================
//
// Purpose:
// Frontend incident module types.
//
// Backend:
// Incident model response
//
// Used by:
// - Incident Service
// - React Query Hooks
// - UI Components
//
// ================================================================
import type { Pagination } from './pagination.types';

// ================================================================
// INCIDENT SEVERITY
// ================================================================

export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';

// ================================================================
// INCIDENT STATUS
// ================================================================

export type IncidentStatus = 'open' | 'in_progress' | 'resolved' | 'rejected';

// ================================================================
// EXECUTION STATUS
// ================================================================

export type IncidentExecutionStatus = 'SUCCESS' | 'FAILED' | 'ROLLED_BACK';

// ================================================================
// INCIDENT
// ================================================================

export type Incident = {
  id: string;

  title: string;

  description: string;

  severity: IncidentSeverity;

  status: IncidentStatus;

  detectedAt: Date;

  rootCause?: string;

  fixSummary?: string;

  executionStatus?: IncidentExecutionStatus | undefined;

  resolvedAt?: Date;

  mttr?: number | null;

  createdAt?: Date;

  updatedAt?: Date;
};

// ================================================================
// INCIDENT LOG
// ================================================================
//
// Backend:
// getIncidentDetailsService
//
// returns logs also.
//
// ================================================================

export type IncidentLog = {
  service: string;

  level: 'ERROR' | 'WARN' | 'INFO';

  message: string;

  timestamp: Date;
};

// ================================================================
// INCIDENT DETAILS RESPONSE
// ================================================================
//
// GET /api/incidents/:incidentId
//
// Backend:
//
// {
//    incident,
//    logs
// }
//
// ================================================================

export type IncidentDetails = {
  incident: Incident;

  logs: IncidentLog[];
};

// ================================================================
// INCIDENT LIST RESPONSE
// ================================================================
//
// GET /api/incidents
//
// Backend:
//
// {
//   incidents:[],
//   pagination:{}
// }
//
// ================================================================

export type IncidentListResponse = {
  incidents: Incident[];

  pagination: Pagination;
};

// ================================================================
// INCIDENT FILTER
// ================================================================

export interface IncidentFilter {
  severity?: IncidentSeverity;

  status?: IncidentStatus;

  startDate?: Date;

  endDate?: Date;

  sort?: 'createdAt' | 'severity' | 'status' | 'detectedAt';

  order?: 'asc' | 'desc';
}
