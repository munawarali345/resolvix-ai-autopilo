// ================================================================
// RISK VALIDATOR OUTPUT VALIDATOR
// ================================================================
//
// Purpose:
// Ensures the Risk Validator Agent returns the expected output
// structure.
//
// ================================================================

import { RiskValidatorOutput } from '../../types/riskAgent.types.js';

// ================================================================
// Validate Risk Validator Output
// ================================================================

export const validateRiskValidatorOutput = (
  data: unknown,
): RiskValidatorOutput => {
  // ------------------------------------------------
  // STEP 1
  // Response must be an object
  // ------------------------------------------------

  if (!data || typeof data !== 'object') {
    throw new Error('Risk Validator: Response is not a valid object');
  }

  const output = data as RiskValidatorOutput;

  // ------------------------------------------------
  // STEP 2
  // Summary
  // ------------------------------------------------

  if (typeof output.summary !== 'string' || output.summary.trim() === '') {
    throw new Error('Risk Validator: Invalid summary');
  }

  // ------------------------------------------------
  // STEP 3
  // Risk Level
  // ------------------------------------------------

  const allowedRiskLevels = ['low', 'medium', 'high', 'critical'] as const;

  if (
    typeof output.riskLevel !== 'string' ||
    !allowedRiskLevels.includes(
      output.riskLevel as (typeof allowedRiskLevels)[number],
    )
  ) {
    throw new Error('Risk Validator: Invalid riskLevel');
  }

  // ------------------------------------------------
  // STEP 4
  // Risk Score
  // ------------------------------------------------

  if (
    typeof output.riskScore !== 'number' ||
    output.riskScore < 0 ||
    output.riskScore > 100
  ) {
    throw new Error('Risk Validator: Invalid riskScore');
  }

  // ------------------------------------------------
  // STEP 5
  // Approval Required
  // ------------------------------------------------

  if (typeof output.approvalRequired !== 'boolean') {
    throw new Error('Risk Validator: Invalid approvalRequired');
  }

  // ------------------------------------------------
  // STEP 6
  // Safe To Execute
  // ------------------------------------------------

  if (typeof output.safeToExecute !== 'boolean') {
    throw new Error('Risk Validator: Invalid safeToExecute');
  }

  // ------------------------------------------------
  // STEP 7
  // Potential Impacts
  // ------------------------------------------------

  if (!Array.isArray(output.potentialImpacts)) {
    throw new Error('Risk Validator: Invalid potentialImpacts');
  }

  for (const impact of output.potentialImpacts) {
    if (typeof impact !== 'string') {
      throw new Error('Risk Validator: Invalid potentialImpact item');
    }
  }

  // ------------------------------------------------
  // STEP 8
  // Validation Findings
  // ------------------------------------------------

  if (!Array.isArray(output.validationFindings)) {
    throw new Error('Risk Validator: Invalid validationFindings');
  }

  for (const finding of output.validationFindings) {
    if (typeof finding !== 'string') {
      throw new Error('Risk Validator: Invalid validationFinding item');
    }
  }

  // ------------------------------------------------
  // STEP 9
  // Missing Checks
  // ------------------------------------------------

  if (!Array.isArray(output.missingChecks)) {
    throw new Error('Risk Validator: Invalid missingChecks');
  }

  for (const check of output.missingChecks) {
    if (typeof check !== 'string') {
      throw new Error('Risk Validator: Invalid missingCheck item');
    }
  }

  // ------------------------------------------------
  // STEP 10
  // Recommended Precautions
  // ------------------------------------------------

  if (!Array.isArray(output.recommendedPrecautions)) {
    throw new Error('Risk Validator: Invalid recommendedPrecautions');
  }

  for (const precaution of output.recommendedPrecautions) {
    if (typeof precaution !== 'string') {
      throw new Error('Risk Validator: Invalid recommendedPrecaution item');
    }
  }

  // ------------------------------------------------
  // STEP 11
  // Decision
  // ------------------------------------------------

  const allowedDecisions = [
    'approved',
    'approval_required',
    'rejected',
  ] as const;

  if (
    typeof output.decision !== 'string' ||
    !allowedDecisions.includes(
      output.decision as (typeof allowedDecisions)[number],
    )
  ) {
    throw new Error('Risk Validator: Invalid decision');
  }

  // ------------------------------------------------
  // STEP 12
  // Reason
  // ------------------------------------------------

  if (typeof output.reason !== 'string' || output.reason.trim() === '') {
    throw new Error('Risk Validator: Invalid reason');
  }

  // ------------------------------------------------
  // STEP 13
  // Confidence
  // ------------------------------------------------

  if (
    typeof output.confidence !== 'number' ||
    output.confidence < 0 ||
    output.confidence > 100
  ) {
    throw new Error('Risk Validator: Invalid confidence');
  }

  // ------------------------------------------------
  // STEP 14
  // Validation Passed
  // ------------------------------------------------

  return output;
};
