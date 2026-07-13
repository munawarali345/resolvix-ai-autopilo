// ================================================================
// DETERMINE EXECUTION STATUS FUNCTION
// ================================================================
//
// Purpose:
// Determines the final execution status of the remediation.
//
// This function NEVER executes infrastructure.
//
// Responsibilities:
//
// - Review execution result
// - Review verification result
// - Review rollback result
// - Determine final execution status
//
// ================================================================

import {
  ExecuteCommandOutput,
  VerificationOutput,
  RollbackOutput,
  ExecutionStatusOutput,
} from '../../../types/executorTools.type.js';

// ================================================================
// DETERMINE EXECUTION STATUS
// ================================================================

export function determineExecutionStatus(
  execution: ExecuteCommandOutput,

  verification: VerificationOutput,

  rollback: RollbackOutput,
): ExecutionStatusOutput {
  // --------------------------------------------------------------
  // Default status
  // --------------------------------------------------------------

  let status: ExecutionStatusOutput['status'] = 'running';

  // --------------------------------------------------------------
  // Successful execution
  // --------------------------------------------------------------

  if (execution.success && verification.verified) {
    status = 'completed';
  }

  // --------------------------------------------------------------
  // Failed execution with successful rollback
  // --------------------------------------------------------------
  else if (rollback.rollbackPerformed && rollback.rollbackSuccessful) {
    status = 'rolled_back';
  }

  // --------------------------------------------------------------
  // Execution failed
  // --------------------------------------------------------------
  else {
    status = 'failed';
  }

  // --------------------------------------------------------------
  // Return execution status
  // --------------------------------------------------------------

  return {
    status,
  };
}
