// ================================================================
// IMPACT ASSESSMENT FUNCTION
// ================================================================
//
// Purpose:
// Evaluates the operational impact of the recommended remediation.
//
// Provides operational evidence only.
//
// It does NOT:
// - Calculate risk score
// - Determine approval
// - Produce the final execution decision
//
// ================================================================

import { ImpactAssessmentOutput, RiskToolInput } from '../../../types/index.js';

// ================================================================
// MAIN FUNCTION
// ================================================================

export function assessImpact(input: RiskToolInput): ImpactAssessmentOutput {
  const { recommendation, artifacts } = input;

  // ------------------------------------------------
  // Build Critical Service Lookup
  // ------------------------------------------------

  const serviceInventory = artifacts.serviceInventory ?? [];

  const criticalServices = new Set(
    serviceInventory
      .filter((service) => service.criticality === 'critical')
      .map((service) => service.name),
  );

  // ------------------------------------------------
  // Affected Services
  // ------------------------------------------------

  const affectedServices = recommendation.affectedServices ?? [];

  // ------------------------------------------------
  // Critical Service Impact
  // ------------------------------------------------

  const affectedCriticalServices = affectedServices.some((service) =>
    criticalServices.has(service),
  );

  // ------------------------------------------------
  // Supporting Operational Evidence
  // ------------------------------------------------

  const rollbackAvailable = (recommendation.rollbackPlan?.length ?? 0) > 0;

  const verificationAvailable =
    (recommendation.verificationSteps?.length ?? 0) > 0;

  // ------------------------------------------------
  // Impact Assessment
  // ------------------------------------------------

  const safeToExecute = !affectedCriticalServices;

  // ------------------------------------------------
  // Potential Operational Impacts
  // ------------------------------------------------

  const potentialImpacts: string[] = [];

  if (affectedCriticalServices) {
    potentialImpacts.push('Critical production service will be impacted.');
  }

  if (!rollbackAvailable) {
    potentialImpacts.push('Rollback plan is not available.');
  }

  if (!verificationAvailable) {
    potentialImpacts.push('Post-remediation verification steps are missing.');
  }

  // ------------------------------------------------
  // Output
  // ------------------------------------------------

  return {
    safeToExecute,

    potentialImpacts,

    affectedServices,
  };
}
