// ================================================================
// VERIFICATION FUNCTION
// ================================================================
//
// Purpose:
// Reviews the execution results produced by executeCommandTool
// and determines whether the remediation completed successfully.
//
// This function NEVER executes infrastructure.
//
// Responsibilities:
//
// - Review execution results
// - Determine passed verification checks
// - Determine failed verification checks
// - Build VerificationOutput
//
// ================================================================

import {
  ExecuteCommandOutput,
  VerificationOutput,
  FakeExecutionResult,
} from '../../../types/executorTools.type.js';

// ================================================================
// VERIFY EXECUTION
// ================================================================

export function verifyExecution(
  execution: ExecuteCommandOutput,
): VerificationOutput {
  // --------------------------------------------------------------
  // Store verification results.
  // --------------------------------------------------------------

  const passedChecks: string[] = [];

  const failedChecks: string[] = [];

  const verificationEvidence: FakeExecutionResult[] = [];

  // --------------------------------------------------------------
  // Review every executed command result.
  // --------------------------------------------------------------

  for (const result of execution.results) {
    verificationEvidence.push(result);

    if (result.success) {
      passedChecks.push(result.command);
    } else {
      failedChecks.push(result.command);
    }
  }

  // --------------------------------------------------------------
  // Verification succeeds only when:
  //
  // - executeCommandTool succeeded
  // - no command failed
  // --------------------------------------------------------------

  const verified = execution.success && failedChecks.length === 0;

  // --------------------------------------------------------------
  // Return verification summary.
  // --------------------------------------------------------------

  return {
    verified,

    passedChecks,

    failedChecks,

    verificationEvidence,
  };
}
