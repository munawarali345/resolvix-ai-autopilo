import { ExecutionContext } from '../../../../types/index.js';

import { findDeployment } from './util.helper.js';

// ================================================================
// HANDLE DEPLOYMENT COMMAND
// ================================================================

export async function handleDeploymentCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a deployment command
  // ------------------------------------------------

  if (
    !normalizedCommand.includes('set image') &&
    !normalizedCommand.includes('apply -f')
  ) {
    return false;
  }

  // ------------------------------------------------
  // Kubernetes Commands
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kubectl')) {
    // --------------------------------------------
    // Set Image
    // --------------------------------------------

    if (normalizedCommand.includes('set image')) {
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

      deployment.status = 'restarting';

      deployment.updatedAt = new Date();

      await delay(context.duration);

      deployment.status = 'running';

      deployment.updatedAt = new Date();

      if (deployment.version !== undefined) {
        deployment.version++;
      }

      context.stdout = [
        `deployment.apps/${deploymentName} image updated successfully`,

        `deployment "${deploymentName}" restarted`,

        `Current revision: ${deployment.version}`,
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Apply Manifest
    // --------------------------------------------

    if (normalizedCommand.includes('apply -f')) {
      const fileName = command.split(' ').pop()?.trim();

      if (!fileName) {
        context.success = false;

        context.exitCode = 1;

        context.stderr = 'error: manifest file is required';

        return true;
      }

      await delay(context.duration);

      context.stdout = [
        `${fileName} applied successfully`,

        'deployment configured',

        'service configured',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Unsupported Deployment Command
    // --------------------------------------------

    context.success = false;

    context.exitCode = 1;

    context.stderr = `error: unsupported deployment command "${command}"`;

    return true;
  }

  // ------------------------------------------------
  // Unsupported Platform
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Deployment is not supported for command "${command}"`;

  return true;
}
