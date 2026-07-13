// ================================================================
// REPORTER AGENT TYPES
// ================================================================

import {
  Incident,
  WorkflowStep,
  DetectionAgentOutput,
  OrchestratorAgentOutput,
  LogAnalyzerAgentOutput,
  RootCauseAgentOutput,
  FixAgentOutput,
  FixAgentArtifacts,
  RiskValidatorOutput,
  RiskValidatorArtifacts,
  ExecutorOutput,
  ExecutorArtifacts,
  LogAnalysisArtifacts,
  Report,
  ReportTimeline,
  ReportMetrics,
} from './index.js';

import { ReportFormatterOutput } from './reporterAgentTools.Types.js';

// ================================================================
// REPORTER INPUT
// ================================================================

export interface ReporterInput {
  incident: Incident;

  detection: DetectionAgentOutput;

  orchestrator: OrchestratorAgentOutput;

  logAnalysis: LogAnalyzerAgentOutput;

  logAnalysisArtifacts: LogAnalysisArtifacts;

  rootCause: RootCauseAgentOutput;

  fixRecommendation: FixAgentOutput;

  fixAgentArtifacts: FixAgentArtifacts;

  riskValidation: RiskValidatorOutput;

  riskValidatorArtifacts: RiskValidatorArtifacts;

  execution: ExecutorOutput;

  executionAgentArtifacts: ExecutorArtifacts;

  currentStep: WorkflowStep;
}

// ================================================================
// REPORTER ARTIFACTS
// ================================================================

export interface ReporterArtifacts {
  timeline: ReportTimeline[];

  metrics: ReportMetrics;

  reportFormatter: ReportFormatterOutput;
}

// ================================================================
// REPORTER OUTPUT
// ================================================================

export interface ReporterOutput extends Omit<
  Report,
  '_id' | 'incidentId' | 'createdAt' | 'updatedAt'
> {}

// ================================================================
// EXECUTION RESULT
// ================================================================

export interface ReporterExecutionResult {
  report: ReporterOutput;

  artifacts: ReporterArtifacts;
}
