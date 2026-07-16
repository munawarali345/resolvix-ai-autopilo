export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';

export type IncidentStatus = 'open' | 'in_progress' | 'resolved' | 'rejected';

export type Incident = {
  _id?: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  detectedAt: Date;
  rootCause?: string;
  fixSummary?: string;
  executionStatus?: 'SUCCESS' | 'FAILED' | 'ROLLED_BACK';
  resolvedAt?: Date;
  mttr?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
};


// ================================================================
// INCIDENT FILTER TYPES
// ================================================================

export interface IncidentFilter {

  severity?: IncidentSeverity;

  status?: IncidentStatus;

  startDate?: Date;

  endDate?: Date;

  sort?: "createdAt" | "severity" | "status" | "detectedAt";

  order?: "asc" | "desc";

}
