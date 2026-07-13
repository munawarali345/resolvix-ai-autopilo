// ================================================================
// LOGS HELPER
// ================================================================

import { ExecutionContext } from '../../../../types/index.js';

import { getLogByResource } from './util.helper.js';

// ================================================================
// HANDLE LOG COMMAND
// ================================================================

export async function handleLogsCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Detect Supported Log Commands
  // ------------------------------------------------

  const isLogCommand =
    normalizedCommand.startsWith('kubectl logs') ||
    normalizedCommand.startsWith('docker logs') ||
    normalizedCommand.startsWith('journalctl') ||
    normalizedCommand.startsWith('tail') ||
    normalizedCommand.startsWith('cat ');

  if (!isLogCommand) {
    return false;
  }

  await delay(context.duration);

  // ------------------------------------------------
  // Kubernetes Deployment Logs
  // ------------------------------------------------

  if (
    normalizedCommand.startsWith('kubectl logs') &&
    normalizedCommand.includes('deployment/')
  ) {
    const deploymentName = command.split('/').pop()?.trim();

    const log = getLogByResource(deploymentName!);

    if (!log) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = `No logs found for '${deploymentName}'.`;

      return true;
    }

    context.stdout = [
      `Fetching logs for deployment '${deploymentName}'...`,

      ...log.entries,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Kubernetes Pod Logs
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kubectl logs')) {
    const podName = command.split(' ').pop()?.trim();

    const log = getLogByResource(podName!);

    if (!log) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = `No logs found for '${podName}'.`;

      return true;
    }

    context.stdout = [
      `Fetching logs for pod '${podName}'...`,

      ...log.entries,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Docker Logs
  // ------------------------------------------------

  if (normalizedCommand.startsWith('docker logs')) {
    const containerName = command.split(' ').pop()?.trim();

    const log = getLogByResource(containerName!);

    if (!log) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = `No logs found for '${containerName}'.`;

      return true;
    }

    context.stdout = [
      `Fetching logs for container '${containerName}'...`,

      ...log.entries,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // journalctl
  // ------------------------------------------------

  if (normalizedCommand.startsWith('journalctl')) {
    const serviceName = command.split(' ').pop()?.trim();

    const log = getLogByResource(serviceName!);

    if (!log) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = `No logs found for '${serviceName}'.`;

      return true;
    }

    context.stdout = [
      `Fetching logs for service '${serviceName}'...`,

      ...log.entries,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // tail
  // ------------------------------------------------

  if (normalizedCommand.startsWith('tail')) {
    const fileName = command.split(' ').pop()?.trim();

    const log = getLogByResource(fileName!);

    if (!log) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = `No logs found for '${fileName}'.`;

      return true;
    }

    context.stdout = [`Reading '${fileName}'...`, ...log.entries].join('\n');

    return true;
  }

  // ------------------------------------------------
  // cat
  // ------------------------------------------------

  if (normalizedCommand.startsWith('cat ')) {
    const fileName = command.split(' ').pop()?.trim();

    const log = getLogByResource(fileName!);

    if (!log) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = `No logs found for '${fileName}'.`;

      return true;
    }

    context.stdout = [`Displaying '${fileName}'...`, ...log.entries].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Unsupported Log Command
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Unsupported log command "${command}"`;

  return true;
}
