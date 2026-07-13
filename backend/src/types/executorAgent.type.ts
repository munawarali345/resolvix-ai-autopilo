// ================================================================
// EXECUTOR AGENT TYPES
// ================================================================
//
// Purpose:
// Defines input/output contracts for the Executor Agent.
//
// The Executor Agent performs the approved remediation,
// verifies execution, performs rollback if necessary,
// and prepares execution evidence.
//
// ================================================================

import {
  Incident,
  WorkflowStep,
  FixAgentOutput,
  FixAgentArtifacts,
  RiskValidatorOutput,
  RiskValidatorArtifacts,
  logService,
} from './index.js';

import {
  ExecuteCommandOutput,
  VerificationOutput,
  RollbackOutput,
  ExecutionStatusOutput,
  NotificationOutput,
} from './executorTools.type.js';

// ================================================================
// EXECUTOR INPUT
// ================================================================

export interface ExecutorInput {
  // Original incident
  incident: Incident;

  // Approved remediation
  fixRecommendation: FixAgentOutput;

  // Operational artifacts
  fixArtifacts: FixAgentArtifacts;

  // Risk validation result
  riskValidation: RiskValidatorOutput;

  // Risk validation artifacts
  riskArtifacts: RiskValidatorArtifacts;

  // Current workflow step
  currentStep: WorkflowStep;
}

// ================================================================
// EXECUTION STATUS
// ================================================================

export type ExecutionStatus = 'SUCCESS' | 'FAILED' | 'ROLLED_BACK';

// ================================================================
// EXECUTOR ARTIFACTS
// ================================================================

export interface ExecutorArtifacts {
  executeCommand: ExecuteCommandOutput;

  verification: VerificationOutput;

  rollback: RollbackOutput;

  executionStatus: ExecutionStatusOutput;

  notification: NotificationOutput;
}

// ================================================================
// EXECUTOR OUTPUT
// ================================================================

export interface ExecutorOutput {
  // Execution summary
  summary: string;

  // Overall execution status
  executionStatus: ExecutionStatus;

  // Commands actually executed
  executedCommands: string[];

  // Rollback status
  rollbackPerformed: boolean;

  // Rollback reason (if any)
  rollbackReason: string | null;

  // Services impacted
  affectedServices: logService[];

  // AI confidence
  confidence: number;

  executionDuration: number;
}

// ================================================================
// EXECUTOR EXECUTION RESULT
// ================================================================

export interface ExecutorExecutionResult {
  execution: ExecutorOutput;

  artifacts: ExecutorArtifacts;
}
