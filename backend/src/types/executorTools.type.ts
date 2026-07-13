// ================================================================
// EXECUTOR TOOL TYPES
// ================================================================

import { ExecutorInput } from './executorAgent.type.js';

// ================================================================
// SHARED TOOL INPUT
// ================================================================

export type ExecutorToolInput = ExecutorInput;

// ================================================================
// NOTIFICATION CHANNEL ENUM
// ================================================================

export type NotificationChannel =
  | 'email'
  | 'slack'
  | 'teams'
  | 'webhook'
  | 'none';

// ================================================================
// RESULT TYPES
// ================================================================

export interface FakeExecutionResult {
  command: string;
  success: boolean;
  exitCode: number;
  stdout: string;
  stderr: string;
  duration: number;
}

export interface ExecutionContext {
  success: boolean;
  exitCode: number;
  stdout: string;
  stderr: string;
  duration: number;
}

// ================================================================
// EXECUTE COMMAND
// ================================================================

export interface ExecuteCommandOutput {
  success: boolean;

  results: FakeExecutionResult[];

  duration: number;
}

// ================================================================
// VERIFICATION
// ================================================================

export interface VerificationOutput {
  verified: boolean;

  passedChecks: string[];

  failedChecks: string[];

  verificationEvidence: FakeExecutionResult[];
}

// ================================================================
// ROLLBACK
// ================================================================

export interface RollbackOutput {
  rollbackPerformed: boolean;

  rollbackSuccessful: boolean;

  rollbackSteps: string[];
}

// ================================================================
// EXECUTION STATUS
// ================================================================

export interface ExecutionStatusOutput {
  status: 'pending' | 'running' | 'completed' | 'failed' | 'rolled_back';
}

// ================================================================
// NOTIFICATION
// ================================================================

export interface NotificationOutput {
  notificationSent: boolean;

  notificationChannel: NotificationChannel;

  recipients: string[];

  failureReason: string | null;
}
