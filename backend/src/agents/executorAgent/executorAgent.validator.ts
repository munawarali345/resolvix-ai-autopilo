// ================================================================
// EXECUTOR OUTPUT VALIDATOR
// ================================================================
//
// Purpose:
// Ensures the Executor Agent returns the expected output
// structure.
//
// ================================================================

import { ExecutorOutput } from '../../types/index.js';

// ================================================================
// Validate Executor Output
// ================================================================

export const validateExecutorOutput = (data: unknown): ExecutorOutput => {
  // ------------------------------------------------
  // STEP 1
  // Response must be an object
  // ------------------------------------------------

  if (!data || typeof data !== 'object') {
    throw new Error('Executor: Response is not a valid object');
  }

  const output = data as ExecutorOutput;

  // ------------------------------------------------
  // STEP 2
  // Summary
  // ------------------------------------------------

  if (typeof output.summary !== 'string' || output.summary.trim() === '') {
    throw new Error('Executor: Invalid summary');
  }

  // ------------------------------------------------
  // STEP 3
  // Execution Status
  // ------------------------------------------------

  const allowedStatuses = [
    'SUCCESS',
    'FAILED',
    'PARTIAL_SUCCESS',
    'ROLLED_BACK',
  ] as const;

  if (
    typeof output.executionStatus !== 'string' ||
    !allowedStatuses.includes(
      output.executionStatus as (typeof allowedStatuses)[number],
    )
  ) {
    throw new Error('Executor: Invalid executionStatus');
  }

  // ------------------------------------------------
  // STEP 4
  // Executed Commands
  // ------------------------------------------------

  if (!Array.isArray(output.executedCommands)) {
    throw new Error('Executor: Invalid executedCommands');
  }

  for (const command of output.executedCommands) {
    if (typeof command !== 'string') {
      throw new Error('Executor: Invalid executedCommand item');
    }
  }

  // ------------------------------------------------
  // STEP 5
  // Rollback Performed
  // ------------------------------------------------

  if (typeof output.rollbackPerformed !== 'boolean') {
    throw new Error('Executor: Invalid rollbackPerformed');
  }

  // ------------------------------------------------
  // STEP 6
  // Rollback Reason
  // ------------------------------------------------

  if (
    output.rollbackReason !== null &&
    typeof output.rollbackReason !== 'string'
  ) {
    throw new Error('Executor: Invalid rollbackReason');
  }

  // ------------------------------------------------
  // STEP 7
  // Affected Services
  // ------------------------------------------------

  if (!Array.isArray(output.affectedServices)) {
    throw new Error('Executor: Invalid affectedServices');
  }

  for (const service of output.affectedServices) {
    if (typeof service !== 'string') {
      throw new Error('Executor: Invalid affectedService item');
    }
  }

  // ------------------------------------------------
  // STEP 8
  // Confidence
  // ------------------------------------------------

  if (
    typeof output.confidence !== 'number' ||
    output.confidence < 0 ||
    output.confidence > 100
  ) {
    throw new Error('Executor: Invalid confidence');
  }

  // ------------------------------------------------
  // STEP 9
  // Execution Duration
  // ------------------------------------------------

  if (
    typeof output.executionDuration !== 'number' ||
    output.executionDuration < 0
  ) {
    throw new Error('Executor: Invalid executionDuration');
  }

  // ------------------------------------------------
  // STEP 10
  // Validation Passed
  // ------------------------------------------------

  return output;
};
