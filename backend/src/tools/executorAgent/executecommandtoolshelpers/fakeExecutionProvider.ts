// ================================================================
// FAKE EXECUTION PROVIDER
// ================================================================
//
// Purpose:
// Simulates execution of infrastructure commands.
//
// This provider NEVER executes real infrastructure.
// It updates the fake infrastructure state,
// generates realistic execution results,
// and records execution history.
//
// In production this provider will be replaced by
// Kubernetes / Docker / SSH providers.
//
// ================================================================

import { randomUUID } from 'crypto';

import { infrastructure, type ExecutionHistory } from './infrastructure.js';

import { executeCommand } from './fakeCommandExecutor.js';

import {
  FakeExecutionResult,
  ExecutionContext,
} from '../../../types/executorTools.type.js';

// ================================================================
// EXECUTE COMMAND
// ================================================================

export async function fakeExecutionProvider(
  command: string,
): Promise<FakeExecutionResult> {
  // ================================================================
  // DELAY
  // ================================================================

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const normalizedCommand = command.trim().toLowerCase();

  const executionId = randomUUID();

  const duration = Math.floor(Math.random() * 1500) + 500;

  const context: ExecutionContext = {
    success: true,

    exitCode: 0,

    stdout: '',

    stderr: '',

    duration,
  };

  // ================================================================
  // ROUTE COMMAND TO EXECUTION HANDLERS
  // ================================================================
  //
  // Delegates the incoming command to the command executor.
  //
  // The executor is responsible for:
  //
  // - Selecting the appropriate command handler
  // - Updating the execution context
  // - Returning control once the command is processed
  //
  // ================================================================
  await executeCommand(command, normalizedCommand, context, delay);

  const history: ExecutionHistory = {
    executionId,
    command,
    exitCode: context.exitCode,
    stdout: context.stdout,
    stderr: context.stderr,
    duration: context.duration,
    success: context.success,
    executedAt: new Date(),
  };

  infrastructure.executionHistory.push(history);

  return {
    command,
    success: context.success,
    exitCode: context.exitCode,
    stdout: context.stdout,
    stderr: context.stderr,
    duration: context.duration,
  };
}

export default fakeExecutionProvider;
