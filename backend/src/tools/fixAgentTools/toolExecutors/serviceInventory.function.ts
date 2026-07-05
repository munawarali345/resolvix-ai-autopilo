// ================================================================
// SERVICE INVENTORY FUNCTION
// ================================================================

import { SERVICE_INVENTORY } from '../../../data/playbookData/serviceInventoryData.js';

import {
  AffectedServicesToolInput,
  ServiceInventoryOutput,
} from '../../../types/index.js';

// ================================================================
// Service Inventory
// ================================================================

export function serviceInventory(
  input: AffectedServicesToolInput,
): ServiceInventoryOutput {
  // No affected services.

  if (!input.affectedServices.length) {
    return {
      services: [],
    };
  }

  // Find affected services.

  const services = SERVICE_INVENTORY.filter((service) =>
    input.affectedServices.includes(service.name),
  );

  // Return service inventory.

  return {
    services: services.map((service) => ({
      id: service.id,

      name: service.name,

      owner: service.owner,

      team: service.team,

      environment: service.environment,

      version: service.version,

      runtime: service.runtime,

      repository: service.repository,

      criticality: service.criticality,
    })),
  };
}
