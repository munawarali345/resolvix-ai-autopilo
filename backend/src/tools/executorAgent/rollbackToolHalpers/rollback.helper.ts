import { ExecutionContext } from '../../../types/index.js';

import { findDeployment } from '../executecommandtoolshelpers/commandHelpers/util.helper.js';

// ================================================================
// HANDLE ROLLBACK COMMAND
// ================================================================

export async function handleRollbackCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a rollback command
  // ------------------------------------------------

  if (
    !normalizedCommand.includes('rollout undo') &&
    !normalizedCommand.includes('rollback')
  ) {
    return false;
  }

  // ------------------------------------------------
  // Kubernetes Commands
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kubectl')) {
    // --------------------------------------------
    // Rollback Deployment
    // --------------------------------------------

    if (normalizedCommand.includes('rollout undo deployment')) {
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

      deployment.status = 'restarting';

      deployment.updatedAt = new Date();

      await delay(context.duration);

      deployment.status = 'running';

      deployment.updatedAt = new Date();

      if (deployment.version !== undefined && deployment.version > 1) {
        deployment.version--;
      }

      context.stdout = [
        `deployment.apps/${deploymentName} rolled back successfully`,

        `deployment "${deploymentName}" is now running`,

        `Current revision: ${deployment.version}`,
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Unsupported kubectl rollback command
    // --------------------------------------------

    context.success = false;

    context.exitCode = 1;

    context.stderr = `error: unsupported rollback command "${command}"`;

    return true;
  }

  // ------------------------------------------------
  // Unsupported Platform
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Rollback is not supported for command "${command}"`;

  return true;
}
