// ================================================================
// APPROVAL POLICY FUNCTION
// ================================================================
//
// Purpose:
// Evaluates approval requirement using Risk Tool Input
// and returns ApprovalPolicyOutput.
//
// Fully type-safe & aligned with RiskValidatorArtifacts.
//
// ================================================================

import { RiskToolInput, ApprovalPolicyOutput } from '../../../types/index.js';

import { APPROVAL_POLICY } from '../../../config/approvalPolicyTool.config.js';

// ================================================================
// MAIN FUNCTION
// ================================================================

export function validateApprovalPolicy(
  input: RiskToolInput,
): ApprovalPolicyOutput {
  // input se jo need he wo nikal raha he
  const { incident, recommendation, artifacts } = input;

  // -----------------------------
  // SERVICE CHECK
  // -----------------------------
  const serviceMatch = recommendation.affectedServices.some((service) =>
    APPROVAL_POLICY.services.includes(service),
  );

  // -----------------------------
  // SEVERITY CHECK
  // -----------------------------
  const severityMatch = APPROVAL_POLICY.severities.includes(incident.severity);

  // -----------------------------
  // ENVIRONMENT CHECK
  // -----------------------------
  if (!Array.isArray(artifacts.configurations)) {
    throw new Error(
      `configurations is not array. Got: ${JSON.stringify(artifacts.configurations)}`,
    );
  }
  const environmentMatch = artifacts.configurations.some((cfg) =>
    APPROVAL_POLICY.environments.includes(cfg.environment),
  );

  // -----------------------------
  // CRITICALITY CHECK
  // -----------------------------
  const criticalityMatch = artifacts.serviceInventory.some((service) =>
    APPROVAL_POLICY.criticality.includes(service.criticality),
  );

  // -----------------------------
  // FINAL DECISION
  // -----------------------------
  const requiresApproval =
    serviceMatch || severityMatch || environmentMatch || criticalityMatch;

  // -----------------------------
  // OUTPUT (STRICT TYPE MATCH)
  // -----------------------------
  return {
    approvalRequired: requiresApproval,

    approvalReason: buildReason({
      serviceMatch,

      severityMatch,

      environmentMatch,

      criticalityMatch,
    }),
  };
}

// ================================================================
// REASON BUILDER
// ================================================================

function buildReason(flags: {
  serviceMatch: boolean;

  severityMatch: boolean;

  environmentMatch: boolean;

  criticalityMatch: boolean;
}) {
  const reasons: string[] = [];

  if (flags.serviceMatch)
    reasons.push('Affected service requires manual approval');
  if (flags.severityMatch)
    reasons.push('Incident severity requires manual approval');
  if (flags.environmentMatch)
    reasons.push('Production environment is protected');
  if (flags.criticalityMatch) reasons.push('Critical service impact detected');

  return reasons.length
    ? reasons.join(', ')
    : 'No approval required based on policy';
}
