// ================================================================
// BUILD TIMELINE FUNCTION
// ================================================================
//
// Purpose:
// Generates a structured incident timeline from the complete
// autonomous incident response workflow.
//
// This function converts agent into
// chronological timeline events.
//
// This is deterministic business logic.
// No AI reasoning is performed here.
//
// ================================================================

import { ReportTimeline } from '../../../types/index.js';

// ================================================================
// BUILD TIMELINE INPUT
// ================================================================

export interface BuildTimelineInput {
  incident: {
    title: string;
  };

  detection: {
    isIncident: boolean;

    confidence: number;

    signals: string[];
  };

  logAnalysis: {
    findings: string[];

    affectedServices: string[];
  };

  rootCause: {
    rootCause: string;
  };

  fixRecommendation: {
    recommendedAction: string;
  };

  riskValidation: {
    decision: string;
  };

  execution: {
    executionStatus: string;
  };
}

// ================================================================
// BUILD INCIDENT TIMELINE
// ================================================================
//
// Input:
// Complete workflow outputs.
//
// Output:
// Structured incident timeline.
//
// ================================================================

export function buildTimeline(input: BuildTimelineInput): ReportTimeline[] {
  const timeline: ReportTimeline[] = [];

  // ------------------------------------------------
  // Incident Detection Event
  // ------------------------------------------------

  timeline.push({
    timestamp: new Date(),

    event: `Incident detected: ${input.incident.title ?? 'Unknown incident'}`,

    agent: 'Detection Agent',
  });

  // ------------------------------------------------
  // Log Analysis Event
  // ------------------------------------------------

  timeline.push({
    timestamp: new Date(),

    event: 'Incident logs analyzed and failure patterns identified.',

    agent: 'Log Analyzer Agent',
  });

  // ------------------------------------------------
  // Root Cause Event
  // ------------------------------------------------

  timeline.push({
    timestamp: new Date(),

    event: `Root cause identified: ${input.rootCause.rootCause}`,

    agent: 'Root Cause Agent',
  });

  // ------------------------------------------------
  // Fix Recommendation Event
  // ------------------------------------------------

  timeline.push({
    timestamp: new Date(),

    event: `Remediation recommendation generated: ${input.fixRecommendation.recommendedAction}`,

    agent: 'Fix Recommendation Agent',
  });

  // ------------------------------------------------
  // Risk Validation Event
  // ------------------------------------------------

  timeline.push({
    timestamp: new Date(),

    event: `Risk validation completed: ${input.riskValidation.decision}`,

    agent: 'Risk Validator Agent',
  });

  // ------------------------------------------------
  // Execution Event
  // ------------------------------------------------

  timeline.push({
    timestamp: new Date(),

    event: `Remediation execution completed with status: ${input.execution.executionStatus}`,

    agent: 'Executor Agent',
  });

  return timeline;
}
