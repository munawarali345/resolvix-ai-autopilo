// ================================================================
// WORKFLOW TYPES
// ================================================================
// LangGraph workflow ke andar ye shared types use honge.
// Ye sirf workflow ki state ko define karte hain.
// ================================================================

import { Log } from './log.type.js';
import { Incident } from './incident.type.js';
import {
  DetectionServiceOutput,
  OrchestratorAgentOutput,
  LogAnalyzerAgentOutput,
  LogAnalysisArtifacts,
  RootCauseAgentOutput,
  FixAgentArtifacts,
  FixAgentOutput,
  RiskValidatorArtifacts,
  RiskValidatorOutput,
} from './index.js';

// ================================================================
// Workflow kis stage par hai
// complete system flow hai
// isko sirf GRAPH / STATE use karta hai
// ================================================================
export type WorkflowStep =
  | 'orchestrator'
  | 'log-analysis'
  | 'root-cause'
  | 'fix'
  | 'risk-validation'
  | 'execution'
  | 'reporting'
  | 'completed';

// ================================================================
// Orchestrator can route only to these steps
// NextWorkflowStep → orchestrator ka decision
// ================================================================
export type NextWorkflowStep =
  | 'log-analysis'
  | 'root-cause'
  | 'fix'
  | 'risk-validation'
  | 'execution'
  | 'reporting';


  export interface ApprovalState {

  status: "pending" | "approved" | "rejected" | null;

}

// ================================================================
// Shared Workflow State Interface
// ================================================================
export interface WorkflowState {
  // Workflow me process hone wale logs
  logs: Log[];

  // Detection ke baad create hone wala incident
  incident: Incident | null;

  detectionResult: DetectionServiceOutput | null;

  orchestratorDecision: OrchestratorAgentOutput | null;

  logAnalysisResult: LogAnalyzerAgentOutput | null;

  logAnalysisArtifacts: LogAnalysisArtifacts | null;

  rootCauseResult: RootCauseAgentOutput | null;

  fixAgentResult: FixAgentOutput | null;

  fixAgentArtifacts: FixAgentArtifacts | null;

  riskValidatorResult: RiskValidatorOutput | null;

  riskValidatorArtifacts: RiskValidatorArtifacts | null;

  approval: ApprovalState | null;

  // Current workflow stage
  currentStep: WorkflowStep;

  // Workflow error
  error: string | null;
}
