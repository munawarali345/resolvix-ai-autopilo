import { ExecutionContext } from '../../../../types/index.js';

import { findDeployment } from './util.helper.js';

// ================================================================
// HANDLE HEALTH COMMAND
// ================================================================

export async function handleHealthCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a health command
  // ------------------------------------------------

  if (
    !normalizedCommand.includes('rollout status') &&
    !normalizedCommand.includes('get pods') &&
    !normalizedCommand.includes('describe pod') &&
    !normalizedCommand.includes('get svc') &&
    !normalizedCommand.startsWith('curl')
  ) {
    return false;
  }

  // ------------------------------------------------
  // Kubernetes Commands
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kubectl')) {
    // --------------------------------------------
    // Rollout Status
    // --------------------------------------------

    if (normalizedCommand.includes('rollout status')) {
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

        context.stderr = `error: deployment '${deploymentName}' not found`;

        return true;
      }

      await delay(context.duration);

      context.stdout = [
        `deployment "${deploymentName}" successfully rolled out`,

        `Ready replicas: ${deployment.replicas}/${deployment.replicas}`,

        'Deployment is healthy.',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Get Pods
    // --------------------------------------------

    if (normalizedCommand.includes('get pods')) {
      await delay(context.duration);

      context.stdout = [
        'NAME                     READY   STATUS    RESTARTS',

        'payment-service-abc123   1/1     Running   0',

        'auth-service-def456      1/1     Running   0',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Get Services
    // --------------------------------------------

    if (normalizedCommand.includes('get svc')) {
      await delay(context.duration);

      context.stdout = [
        'NAME              TYPE        CLUSTER-IP',
        'api-gateway       ClusterIP  10.96.0.10',
        'payment-service   ClusterIP  10.96.0.20',
        'user-service      ClusterIP  10.96.0.30',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Describe Pod
    // --------------------------------------------

    if (normalizedCommand.includes('describe pod')) {
      const podName = command.split(' ').pop()?.trim();

      if (!podName) {
        context.success = false;

        context.exitCode = 1;

        context.stderr = 'error: pod name is required';

        return true;
      }

      await delay(context.duration);

      context.stdout = [
        `Name: ${podName}`,

        'Status: Running',

        'Containers Ready: 1/1',

        'Events: No warnings.',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Unsupported Health Command
    // --------------------------------------------

    context.success = false;

    context.exitCode = 1;

    context.stderr = `error: unsupported health command "${command}"`;

    return true;
  }

  // ------------------------------------------------
  // Curl Health Endpoint
  // ------------------------------------------------

  // ------------------------------------------------
  // Auth Health Endpoint
  // ------------------------------------------------

  if (normalizedCommand.includes('/auth/health')) {
    await delay(context.duration);

    context.stdout = JSON.stringify(
      {
        service: 'authentication',
        status: 'UP',
        jwt: 'UP',
      },
      null,
      2,
    );

    return true;
  }

  // ------------------------------------------------
  // Generic Health Endpoint
  // ------------------------------------------------

  if (normalizedCommand.includes('/health')) {
    await delay(context.duration);

    context.stdout = JSON.stringify(
      {
        status: 'UP',
        database: 'UP',
        cache: 'UP',
      },
      null,
      2,
    );

    return true;
  }

  // ------------------------------------------------
  // Unsupported Platform
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Health check is not supported for command "${command}"`;

  return true;
}
