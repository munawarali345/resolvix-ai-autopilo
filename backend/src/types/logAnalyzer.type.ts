// ================================================================
// LOG ANALYZER AGENT TYPES
// ================================================================
//
// Purpose:
// Ye file Log Analyzer Agent ke input aur output types define karti hai.
// ================================================================

import {
  Incident,
  Log,
  DetectionServiceOutput,
  WorkflowStep,
  logService,
} from './index.js';

// ================================================================
// Log Analyzer Agent Input
// ================================================================
export interface LogAnalyzerAgentInput {
  // Incident created by Detection Service.
  incident: Incident;

  // Incident related logs.
  logs: Log[];

  // Detection Service output.
  detectionResult: DetectionServiceOutput;

  // Current workflow step.
  currentStep: WorkflowStep;
}

// ================================================================
// TIMELINE ITEM TYPE
// tool usees k liye
// ================================================================

export interface TimelineItem {
  // Event time
  timestamp: Date;

  // Service name
  service: string;

  // Log level
  level: string;

  // Log message
  message: string;
}

// ================================================================
// DEPENDENCY MAP TYPE
// tool usese k liye
// ================================================================

export interface DependencyMap {
  source: logService;

  affectedServices: logService[];
}

// ================================================================
// Grouped Log Structure
// ================================================================
export interface GroupedLog {
  // Original log message
  message: string;

  // Kitni baar repeat hua
  count: number;
}

export interface LogAnalyzerSkillOutput {
  // ERROR level logs
  errors: Log[];

  // Unique affected services
  affectedServices: logService[];

  // Grouped repeated log messages
  groupedLogs: GroupedLog[];

  // Incident timeline
  timeline: TimelineItem[];

  // Service dependency graph
  dependencyMap: DependencyMap[];
}

// ================================================================
// Log Analyzer Agent Output
// ================================================================
// AI generated deep analysis.
// ================================================================
export interface LogAnalyzerAgentOutput {
  // Overall incident summary.
  summary: string;

  // Important observations.
  keyFindings: string[];

  // Services affected.
  affectedServices: string[];

  // Failure pattern detected.
  failurePattern: string;

  // Suggestions for Root Cause Agent.
  investigationHints: string[];
}
