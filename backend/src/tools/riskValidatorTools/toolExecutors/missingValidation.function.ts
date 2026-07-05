// ================================================================
// MISSING VALIDATION FUNCTION
// ================================================================
//
// Purpose:
// Identifies important validation checks that are missing
// before remediation execution.
//
// This tool only reports missing validation evidence.
//
// ================================================================

import {
  MissingValidationOutput,
  RiskToolInput,
} from '../../../types/index.js';

// ================================================================
// MAIN FUNCTION
// ================================================================

export function findMissingValidation(
  input: RiskToolInput,
): MissingValidationOutput {
  const { recommendation, artifacts } = input;

  const missingChecks: string[] = [];

  // ------------------------------------------------
  // Recommendation Validation
  // ------------------------------------------------

  if (!recommendation.rollbackPlan.length) {
    missingChecks.push('Rollback plan is missing.');
  }

  // ------------------------------------------------
  // Verification Steps
  // ------------------------------------------------

  if (!recommendation.verificationSteps.length) {
    missingChecks.push('Verification steps are missing.');
  }

  if (!recommendation.commands.length) {
    missingChecks.push('Execution commands are missing.');
  }

  if (!recommendation.evidence.length) {
    missingChecks.push('Supporting remediation evidence is missing.');
  }

  if (!recommendation.affectedServices.length) {
    missingChecks.push('Affected services are not identified.');
  }

  // ------------------------------------------------
  // Operational Evidence Validation
  // ------------------------------------------------

  if (!artifacts.playbooks.length) {
    missingChecks.push('No matching remediation playbook found.');
  }

  // ------------------------------------------------
  // Runbook
  // ------------------------------------------------

  if (!artifacts.runbooks.length) {
    missingChecks.push('No matching operational runbook found.');
  }

  // ------------------------------------------------
  // Service Inventory
  // ------------------------------------------------

  if (!artifacts.serviceInventory.length) {
    missingChecks.push('Service inventory information is unavailable.');
  }

  // ------------------------------------------------
  // Configuration
  // ------------------------------------------------

  if (!artifacts.configurations.length) {
    missingChecks.push('Current service configuration is unavailable.');
  }

  // ------------------------------------------------
  // Configuration Changes
  // ------------------------------------------------

  if (!artifacts.configurationChanges.length) {
    missingChecks.push('Recent configuration change history is unavailable.');
  }

  // ------------------------------------------------
  // Overall Validation Status
  // ------------------------------------------------
  const validationPassed = missingChecks.length === 0;

  return {
    validationPassed,

    missingChecks,
  };
}
