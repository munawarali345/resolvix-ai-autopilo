import { ExecutionContext } from '../../../../types/index.js';

import { findDeployment } from './util.helper.js';

// ================================================================
// HANDLE SCALE COMMAND
// ================================================================

export async function handleScaleCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a scale command
  // ------------------------------------------------

  if (!normalizedCommand.includes('scale deployment')) {
    return false;
  }

  // ------------------------------------------------
  // Kubernetes Commands
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kubectl')) {
    // --------------------------------------------
    // Scale Deployment
    // --------------------------------------------

    if (normalizedCommand.includes('scale deployment')) {
      const deploymentName = command
        .split(' ')
        .find((part) => part.startsWith('deployment/'))
        ?.split('/')[1];

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

      const replicaArgument = command
        .split(' ')
        .find((part) => part.startsWith('--replicas='));

      if (!replicaArgument) {
        context.success = false;

        context.exitCode = 1;

        context.stderr = 'error: replicas value is required';

        return true;
      }

      const replicas = Number(replicaArgument.split('=')[1]);

      if (Number.isNaN(replicas) || replicas < 0) {
        context.success = false;

        context.exitCode = 1;

        context.stderr = 'error: invalid replicas value';

        return true;
      }

      deployment.status = 'restarting';

      deployment.updatedAt = new Date();

      await delay(context.duration);

      deployment.replicas = replicas;

      deployment.status = 'running';

      deployment.updatedAt = new Date();

      context.stdout = [
        `deployment.apps/${deploymentName} scaled successfully`,

        `Replicas: ${deployment.replicas}`,

        'Scaling completed successfully.',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Unsupported Scale Command
    // --------------------------------------------

    context.success = false;

    context.exitCode = 1;

    context.stderr = `error: unsupported scale command "${command}"`;

    return true;
  }

  // ------------------------------------------------
  // Unsupported Platform
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Scale is not supported for command "${command}"`;

  return true;
}
