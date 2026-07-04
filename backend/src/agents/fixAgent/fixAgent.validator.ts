// ================================================================
// FIX AGENT OUTPUT VALIDATOR
// ================================================================
//
// Purpose:
// Ensures the Fix Agent returns the expected output structure.
//
// ================================================================

import { FixAgentOutput } from '../../types/index.js';

// ================================================================
// Validate Fix Agent Output
// ================================================================

export const validateFixOutput = (
  data: unknown,
): FixAgentOutput => {

  // ------------------------------------------------
  // STEP 1
  // Response must be an object
  // ------------------------------------------------

  if (!data || typeof data !== 'object') {
    throw new Error('Fix Agent: Response is not a valid object');
  }

  const output = data as FixAgentOutput;

  // ------------------------------------------------
  // STEP 2
  // Summary
  // ------------------------------------------------

  if (
    typeof output.summary !== 'string' ||
    output.summary.trim() === ''
  ) {
    throw new Error('Fix Agent: Invalid summary');
  }

  // ------------------------------------------------
  // STEP 3
  // Recommended Action
  // ------------------------------------------------

  if (
    typeof output.recommendedAction !== 'string' ||
    output.recommendedAction.trim() === ''
  ) {
    throw new Error('Fix Agent: Invalid recommendedAction');
  }

  // ------------------------------------------------
  // STEP 4
  // Confidence
  // ------------------------------------------------

  if (
    typeof output.confidence !== 'number' ||
    output.confidence < 0 ||
    output.confidence > 100
  ) {
    throw new Error('Fix Agent: Invalid confidence');
  }

  // ------------------------------------------------
  // STEP 5
  // Affected Services
  // ------------------------------------------------

  if (!Array.isArray(output.affectedServices)) {
    throw new Error('Fix Agent: Invalid affectedServices');
  }

  for (const service of output.affectedServices) {
    if (typeof service !== 'string') {
      throw new Error('Fix Agent: Invalid affectedServices item');
    }
  }

  // ------------------------------------------------
  // STEP 6
  // Commands
  // ------------------------------------------------

  if (!Array.isArray(output.commands)) {
    throw new Error('Fix Agent: Invalid commands');
  }

  for (const command of output.commands) {
    if (typeof command !== 'string') {
      throw new Error('Fix Agent: Invalid command');
    }
  }

  // ------------------------------------------------
  // STEP 7
  // Rollback Plan
  // ------------------------------------------------

  if (!Array.isArray(output.rollbackPlan)) {
    throw new Error('Fix Agent: Invalid rollbackPlan');
  }

  for (const step of output.rollbackPlan) {
    if (typeof step !== 'string') {
      throw new Error('Fix Agent: Invalid rollbackPlan item');
    }
  }

  // ------------------------------------------------
  // STEP 8
  // Verification Steps
  // ------------------------------------------------

  if (!Array.isArray(output.verificationSteps)) {
    throw new Error('Fix Agent: Invalid verificationSteps');
  }

  for (const step of output.verificationSteps) {
    if (typeof step !== 'string') {
      throw new Error('Fix Agent: Invalid verificationSteps item');
    }
  }

  // ------------------------------------------------
  // STEP 9
  // Evidence
  // ------------------------------------------------

  if (!Array.isArray(output.evidence)) {
    throw new Error('Fix Agent: Invalid evidence');
  }

  for (const item of output.evidence) {
    if (typeof item !== 'string') {
      throw new Error('Fix Agent: Invalid evidence item');
    }
  }

  // ------------------------------------------------
  // STEP 10
  // Risk Hints
  // ------------------------------------------------

  if (!Array.isArray(output.riskHints)) {
    throw new Error('Fix Agent: Invalid riskHints');
  }

  for (const hint of output.riskHints) {
    if (typeof hint !== 'string') {
      throw new Error('Fix Agent: Invalid riskHints item');
    }
  }

  // ------------------------------------------------
  // STEP 11
  // Estimated Time
  // ------------------------------------------------

const allowedEstimatedTimes = [
  '5-10 minutes',
  '10-20 minutes',
  '20-30 minutes',
  '30-60 minutes',
  '1-2 hours',
] as const;

if (

  typeof output.estimatedTime !== 'string' ||
  !allowedEstimatedTimes.includes(output.estimatedTime as (typeof allowedEstimatedTimes)[number])

) {

  throw new Error('Fix Agent: Invalid estimatedTime');

}

  // ------------------------------------------------
  // STEP 12
  // Recommended Playbook ID (Optional)
  // ------------------------------------------------

  if (
    output.recommendedPlaybookId !== undefined &&
    typeof output.recommendedPlaybookId !== 'string'
  ) {
    throw new Error('Fix Agent: Invalid recommendedPlaybookId');
  }

  // ------------------------------------------------
  // STEP 13
  // Recommended Runbook ID (Optional)
  // ------------------------------------------------

  if (
    output.recommendedRunbookId !== undefined &&
    typeof output.recommendedRunbookId !== 'string'
  ) {
    throw new Error('Fix Agent: Invalid recommendedRunbookId');
  }

  // ------------------------------------------------
  // STEP 14
  // Validation Passed
  // ------------------------------------------------

  return output;

};