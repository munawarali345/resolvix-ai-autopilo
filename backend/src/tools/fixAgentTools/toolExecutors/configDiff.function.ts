
// ================================================================
// CONFIGURATION DIFF FUNCTION
// ================================================================

import { CONFIGURATION_CHANGES } from "../../../data/playbookData/configDiff.data.js";

import {
  ConfigurationDiffOutput,
  AffectedServicesToolInput,
} from "../../../types/index.js";

// ================================================================
// Configuration Diff
// ================================================================

export function configurationDiff(

  input: AffectedServicesToolInput,

): ConfigurationDiffOutput {

  // No affected services.

  if (!input.affectedServices.length) {

    return {

      changes: [],

    };

  }

  // Find configuration changes for affected services.

  const changes = CONFIGURATION_CHANGES.filter(

    (change) =>

      input.affectedServices.includes(

        change.service,

      ),

  );

  // Return matching configuration changes.

  return {

    changes: changes.map(

  (change) => ({

    id: change.id,

    service: change.service,

    previousConfigurationVersion: change.previousConfigurationVersion,

    currentConfigurationVersion: change.currentConfigurationVersion,

    field: change.field,

    previousValue: change.previousValue,

    currentValue: change.currentValue,

    reason: change.reason,

    changedAt: change.changedAt,

    }),

  ),

  };

}