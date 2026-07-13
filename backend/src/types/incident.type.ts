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
