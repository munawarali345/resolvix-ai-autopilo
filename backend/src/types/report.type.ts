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
};

export type Report = {
  _id?: string;
  incidentId: string;
  title: string;
  summary: string;
  timeline: ReportTimeline[];
  metrics: ReportMetrics;
  createdAt?: Date;
  updatedAt?: Date;
};
