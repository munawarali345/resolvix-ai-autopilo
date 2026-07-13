export type ReportTimeline = {
  timestamp: Date;

  event: string;

  agent: string;
};

export type ReportMetrics = {
  detectionTime: number;

  diagnosisTime: number;

  executionTime: number;

  totalTime: number;

  mttr: number | null;
};

export type Report = {
  _id?: string;

  incidentId: string;

  title: string;

  summary: string;

  executiveSummary: string;

  technicalSummary: string;

  incidentStatus: 'RESOLVED' | 'FAILED' | 'ROLLED_BACK';

  confidence: number;

  timeline: ReportTimeline[];

  metrics: ReportMetrics;

  createdAt?: Date;

  updatedAt?: Date;
};
