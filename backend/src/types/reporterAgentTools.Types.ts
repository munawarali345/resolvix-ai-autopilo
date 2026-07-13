// ================================================================
// REPORTER TOOL TYPES
// ================================================================

import { ReporterInput } from './reporterAgent.types.js';
// ================================================================
// SHARED TOOL INPUT
// ================================================================

export type ReporterToolInput = ReporterInput;

// ================================================================
// TIMELINE
// ================================================================

export interface TimelineEvent {
  step: string;

  timestamp: Date;

  description: string;
}

export interface TimelineOutput {
  timeline: TimelineEvent[];
}

// ================================================================
// METRICS
// ================================================================

export interface MetricsOutput {
  incidentDuration: number;

  executionDuration: number;

  mttr: number | null;
}

// ================================================================
// REPORT FORMATTER
// ================================================================

export interface ReportFormatterOutput {
  markdown: string;

  html: string;

  json: Record<string, unknown>;
}
