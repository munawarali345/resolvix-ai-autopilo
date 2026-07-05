// ================================================================
// CONFIGURATION READER FUNCTION
// ================================================================

import { CONFIGURATIONS } from '../../../data/playbookData/configuration.data.js';

import {
  AffectedServicesToolInput,
  ConfigurationReaderOutput,
} from '../../../types/index.js';

// ================================================================
// Configuration Reader
// ================================================================

export function configurationReader(
  input: AffectedServicesToolInput,
): ConfigurationReaderOutput {
  // No affected services.

  if (!input.affectedServices.length) {
    return {
      configurations: [],
    };
  }

  // Match affected service configurations.

  const configurations = CONFIGURATIONS.filter((configuration) =>
    input.affectedServices.includes(configuration.service),
  );

  // Return matched configurations.

  return {
    configurations: configurations.map((configuration) => ({
      service: configuration.service,

      version: configuration.version,

      environment: configuration.environment,

      image: configuration.image,

      replicas: configuration.replicas,

      cpuLimit: configuration.cpuLimit,

      memoryLimit: configuration.memoryLimit,

      connectionPool: configuration.connectionPool,

      requestTimeout: configuration.requestTimeout,

      autoScaling: configuration.autoScaling,

      configurationVersion: configuration.configurationVersion,
    })),
  };
}
