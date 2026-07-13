import { ExecutionContext } from '../../../../types/index.js';

// ================================================================
// HANDLE RESTRICTED COMMAND
// ================================================================

export async function handleRestrictedCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,
): Promise<boolean> {
  // ------------------------------------------------
  // Process Management
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kill')) {
    context.success = false;

    context.exitCode = 126;

    context.stderr =
      "Execution blocked: 'kill' commands require human approval.";

    return true;
  }

  // ------------------------------------------------
  // File Deletion
  // ------------------------------------------------

  if (normalizedCommand.startsWith('rm')) {
    context.success = false;

    context.exitCode = 126;

    context.stderr =
      'Execution blocked: file deletion commands require human approval.';

    return true;
  }

  // ------------------------------------------------
  // Sensitive Credentials
  // ------------------------------------------------

  if (
    normalizedCommand.startsWith('cat') &&
    normalizedCommand.includes('/etc/db/credentials')
  ) {
    context.success = false;

    context.exitCode = 126;

    context.stderr =
      'Execution blocked: access to sensitive credentials is denied.';

    return true;
  }

  // ------------------------------------------------
  // Kernel Cache Manipulation
  // ------------------------------------------------

  if (normalizedCommand.includes('/proc/sys/vm/drop_caches')) {
    context.success = false;

    context.exitCode = 126;

    context.stderr =
      'Execution blocked: dropping kernel caches requires manual approval.';

    return true;
  }

  // ------------------------------------------------
  // Shutdown
  // ------------------------------------------------

  if (normalizedCommand.startsWith('shutdown')) {
    context.success = false;

    context.exitCode = 126;

    context.stderr =
      'Execution blocked: shutdown commands require human approval.';

    return true;
  }

  // ------------------------------------------------
  // Reboot
  // ------------------------------------------------

  if (normalizedCommand.startsWith('reboot')) {
    context.success = false;

    context.exitCode = 126;

    context.stderr =
      'Execution blocked: reboot commands require human approval.';

    return true;
  }

  // ------------------------------------------------
  // Disk Formatting
  // ------------------------------------------------

  if (normalizedCommand.startsWith('mkfs')) {
    context.success = false;

    context.exitCode = 126;

    context.stderr =
      'Execution blocked: disk formatting commands are prohibited.';

    return true;
  }

  return false;
}
