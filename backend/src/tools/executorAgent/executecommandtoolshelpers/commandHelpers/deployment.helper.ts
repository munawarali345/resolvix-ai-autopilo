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
    !normalizedCommand.includes('apply -f') &&
    !normalizedCommand.includes('rollout history') &&
    !normalizedCommand.includes('rollout undo') &&
    !normalizedCommand.includes('get configmap') &&
    !normalizedCommand.includes('get networkpolicy') &&
    !normalizedCommand.includes('get svc') &&
    !normalizedCommand.startsWith('docker pull')
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
    // rollout History
    // --------------------------------------------
    if (normalizedCommand.includes('rollout history')) {
      await delay(context.duration);

      context.stdout = [
        'deployment.apps/api-gateway',
        '',
        'REVISION  CHANGE-CAUSE',
        '1 Initial deployment',
        '2 Updated image',
        '3 Configuration update',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // rollout undo
    // --------------------------------------------
    if (normalizedCommand.includes('rollout undo')) {
      await delay(context.duration);

      context.stdout = [
        'Rolling back deployment...',
        'deployment.apps/api-gateway rolled back successfully.',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // get configMap
    // --------------------------------------------
    if (normalizedCommand.includes('get configmap')) {
      context.stdout = [
        'NAME                 DATA   AGE',
        'api-config           5      12d',
        'gateway-config       3      12d',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Get Network Policy
    // --------------------------------------------
    if (normalizedCommand.includes('get networkpolicy')) {
      context.stdout = [
        'NAME                 POD-SELECTOR',
        'default-deny         <none>',
        'allow-api-gateway    app=gateway',
      ].join('\n');

      return true;
    }

    // --------------------------------------------
    // Get Service
    // --------------------------------------------
    if (normalizedCommand.includes('get svc')) {
      context.stdout = [
        'NAME              TYPE        CLUSTER-IP',
        'api-gateway       ClusterIP   10.0.0.12',
        'payment-service   ClusterIP   10.0.0.15',
        'user-service      ClusterIP   10.0.0.18',
      ].join('\n');

      return true;
    }

    // ------------------------------------------------
    // Docker Pull Image
    // ------------------------------------------------

    if (normalizedCommand.startsWith('docker pull')) {
      await delay(context.duration);

      context.stdout = [
        'Pulling image...',
        'Downloaded newer image successfully.',
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
