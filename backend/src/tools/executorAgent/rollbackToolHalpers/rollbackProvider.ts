// ================================================================
// ROLLBACK PROVIDER
// ================================================================
//
// Purpose:
// Simulates rollback execution.
//
// This provider NEVER executes real infrastructure.
//
// Responsibilities:
//
// - Prepare rollback execution context
// - Delegate rollback to the rollback helper
// - Return rollback execution result
//
// ================================================================

import {
  ExecutionContext,
  FakeExecutionResult,
} from '../../../types/executorTools.type.js';

import { handleRollbackCommand } from '../rollbackToolHalpers/rollback.helper.js';

// ================================================================
// EXECUTE ROLLBACK
// ================================================================

export async function rollbackProvider(
  command: string,
): Promise<FakeExecutionResult> {
  // --------------------------------------------------------------
  // Delay helper
  // --------------------------------------------------------------

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const normalizedCommand = command.trim().toLowerCase();

  const duration = Math.floor(Math.random() * 1500) + 500;

  // --------------------------------------------------------------
  // Execution context
  // --------------------------------------------------------------

  const context: ExecutionContext = {
    success: true,

    exitCode: 0,

    stdout: '',

    stderr: '',

    duration,
  };

  // --------------------------------------------------------------
  // Execute rollback
  // --------------------------------------------------------------

  await handleRollbackCommand(
    command,

    normalizedCommand,

    context,

    delay,
  );

  // --------------------------------------------------------------
  // Return execution result
  // --------------------------------------------------------------

  return {
    command,

    success: context.success,

    exitCode: context.exitCode,

    stdout: context.stdout,

    stderr: context.stderr,

    duration: context.duration,
  };
}
