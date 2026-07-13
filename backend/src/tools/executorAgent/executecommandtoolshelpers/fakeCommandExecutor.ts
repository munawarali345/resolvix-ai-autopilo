// ================================================================
// FAKE COMMAND EXECUTOR
// ================================================================
//
// Purpose:
//
// Routes a command to the correct execution helper.
//
// This class DOES NOT:
//
// - execute infrastructure
// - save execution history
// - generate execution ids
//
// It only orchestrates command handlers.
//
// ================================================================

import { ExecutionContext } from '../../../types/index.js';

// helpers
import { handleRestrictedCommand } from './commandHelpers/restricted.helper.js';
import { handleDeploymentCommand } from './commandHelpers/deployment.helper.js';
import { handleRestartCommand } from './commandHelpers/restart.helper.js';
import { handleScaleCommand } from './commandHelpers/scale.helper.js';
import { handleHealthCommand } from './commandHelpers/health.helper.js';
import { handleDatabaseCommand } from './commandHelpers/database.helper.js';
import { handleCacheCommand } from './commandHelpers/cache.helper.js';
import { handleNetworkCommand } from './commandHelpers/network.helper.js';
import { handlePerformanceCommand } from './commandHelpers/performance.helper.js';
import { handleLogsCommand } from './commandHelpers/log.helper.js';

// ================================================================
// EXECUTE COMMAND
// ================================================================

export async function executeCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<void> {
  if (
    await handleRestrictedCommand(
      command,

      normalizedCommand,

      context,
    )
  ) {
    return;
  }

  if (
    await handleDeploymentCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handleRestartCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handleScaleCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handleHealthCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handleDatabaseCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handleCacheCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handleNetworkCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handlePerformanceCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  if (
    await handleLogsCommand(
      command,

      normalizedCommand,

      context,

      delay,
    )
  ) {
    return;
  }

  // ================================================================
  // Unsupported Command
  // ================================================================

  context.success = false;

  context.exitCode = 127;

  context.stderr = `Unsupported command: "${command}"`;
}
