// ================================================================
// DEPENDENCY MAPPER TOOL
// ================================================================
//
// Purpose:
// Logs me visible service dependencies identify karna.
//
// IMPORTANT:
//
// Ye tool actual infrastructure dependency discover nahi karta.
//
// Ye sirf log evidence ke basis par dependency relationship
// build karta hai.
//
// Example:
//
// payment-service
// "Failed to connect to database"
//
// Result:
//
// database
// ↓
// payment-service
// ================================================================

import { Log, DependencyMap, logService } from '../../types/index.js';

import { extractAffectedServices } from './extractAffectedServices.js';

// ================================================================
// Dependency Mapper
// ================================================================
export const dependencyMapper = (logs: Log[]): DependencyMap[] => {
  // ------------------------------------------------
  // STEP 1
  // Sab unique services nikaalo
  // ------------------------------------------------
  const services = extractAffectedServices(logs);

  // ------------------------------------------------
  // STEP 2
  // Dependency collector
  //
  // Key:
  // Source service
  //
  // Value:
  // Affected services
  // ------------------------------------------------
  const dependencyMap = new Map<logService, Set<logService>>();

  // ------------------------------------------------
  // STEP 3
  // Har log inspect karo
  // ------------------------------------------------
  for (const log of logs) {
    // Message ko lowercase me convert karo
    const message = log.message.toLowerCase();

    // ------------------------------------------------
    // STEP 4
    // Check karo message me kis service ka naam aa raha hai
    // ------------------------------------------------
    for (const service of services) {
      // Apni hi service ko ignore karo
      if (service === log.service) continue;

      // Agar message me kisi dusri service ka naam hai
      if (message.includes(service.toLowerCase())) {
        // Agar source pehli baar mila hai
        if (!dependencyMap.has(service)) {
          dependencyMap.set(service, new Set());
        }

        // Current service ko affected list me add karo
        dependencyMap.get(service)?.add(log.service);
      }
    }
  }

  // ------------------------------------------------
  // STEP 5
  // Final dependency structure build karo
  // ------------------------------------------------
  return Array.from(dependencyMap.entries()).map(
    ([source, affectedServices]) => ({
      source,

      affectedServices: Array.from(affectedServices),
    }),
  );
};
