import { ExecutionContext } from '../../../../types/index.js';

import {
  findDeployment,
  findContainer,
  findService,
  findDatabase,
  findCache,
  resolveResourceName,
} from './util.helper.js';

// ================================================================
// HANDLE RESTART COMMAND
// ================================================================

export async function handleRestartCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Detect restart command
  // ------------------------------------------------

  if (!normalizedCommand.includes('restart')) {
    return false;
  }

  // ------------------------------------------------
  // Kubernetes Restart
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kubectl')) {
    const deploymentName = command.split('/').pop()?.trim();

    if (!deploymentName) {
      context.success = false;
      context.exitCode = 1;
      context.stderr = 'error: deployment name is required';

      return true;
    }

    const deployment = findDeployment(deploymentName);

    if (!deployment) {
      context.success = false;
      context.exitCode = 1;
      context.stderr = `Deployment '${deploymentName}' not found.`;

      return true;
    }

    deployment.status = 'restarting';
    deployment.updatedAt = new Date();

    await delay(context.duration);

    deployment.status = 'running';
    deployment.updatedAt = new Date();

    if (deployment.version !== undefined) {
      deployment.version++;
    }

    context.stdout = [
      `deployment.apps/${deploymentName} restarted`,
      'Waiting for deployment rollout to finish...',
      `deployment "${deploymentName}" successfully rolled out`,
      `Ready replicas: ${deployment.replicas}/${deployment.replicas}`,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Docker Restart
  // ------------------------------------------------

  if (normalizedCommand.startsWith('docker')) {
    const containerName = command.split(' ').pop()?.trim();

    if (!containerName) {
      context.success = false;
      context.exitCode = 1;
      context.stderr = 'Container name is required.';

      return true;
    }

    const container = findContainer(containerName);

    if (!container) {
      context.success = false;
      context.exitCode = 1;
      context.stderr = `Error response from daemon: No such container: ${containerName}`;

      return true;
    }

    container.status = 'restarting';
    container.updatedAt = new Date();

    await delay(context.duration);

    container.status = 'running';
    container.updatedAt = new Date();

    context.stdout = [
      `Stopping container '${containerName}'...`,
      'Container stopped.',
      `Starting container '${containerName}'...`,
      'Container started successfully.',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Linux Service / Database / Cache Restart
  // ------------------------------------------------

  if (
    normalizedCommand.startsWith('systemctl') ||
    normalizedCommand.startsWith('service')
  ) {
    const parts = command.trim().split(/\s+/);

    const rawServiceName = normalizedCommand.startsWith('systemctl')
      ? parts[2]
      : parts[1];

    const serviceName = resolveResourceName(rawServiceName);

    if (!rawServiceName) {
      context.success = false;
      context.exitCode = 1;
      context.stderr = 'Service name is required.';

      return true;
    }

    // ---------------- Database ----------------

    const database = findDatabase(serviceName);

    if (database) {
      database.status = 'restarting';
      database.updatedAt = new Date();

      await delay(context.duration);

      database.status = 'running';
      database.activeConnections = 0;
      database.lastRestartAt = new Date();
      database.updatedAt = new Date();

      context.stdout = [
        `Stopping ${database.name}...`,
        `${database.name} stopped.`,
        `Starting ${database.name}...`,
        `${database.name} started successfully.`,
        'Active connections reset to 0.',
      ].join('\n');

      return true;
    }

    // ---------------- Cache ----------------

    const cache = findCache(serviceName);

    if (cache) {
      cache.status = 'restarting';
      cache.updatedAt = new Date();

      await delay(context.duration);

      cache.status = 'running';
      cache.updatedAt = new Date();

      context.stdout = [
        `Stopping ${cache.name}...`,
        `${cache.name} stopped.`,
        `Starting ${cache.name}...`,
        `${cache.name} started successfully.`,
      ].join('\n');

      return true;
    }

    // ---------------- Service ----------------

    const service = findService(serviceName);

    if (service) {
      service.status = 'restarting';
      service.updatedAt = new Date();

      await delay(context.duration);

      service.status = 'running';
      service.updatedAt = new Date();

      if (service.version !== undefined) {
        service.version++;
      }

      context.stdout = [
        `Stopping ${service.name}.service...`,
        `${service.name}.service stopped.`,
        `Starting ${service.name}.service...`,
        `${service.name}.service is now active (running).`,
      ].join('\n');

      return true;
    }

    // ---------------- Not Found ----------------

    context.success = false;
    context.exitCode = 1;
    context.stderr = `Failed to restart '${serviceName}'. Resource not found.`;

    return true;
  }

  // ------------------------------------------------
  // Restart command not handled
  // ------------------------------------------------

  return false;
}
