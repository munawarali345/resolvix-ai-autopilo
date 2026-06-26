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
  fixApplied?: string;
  resolvedAt?: Date;
  mttr?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
