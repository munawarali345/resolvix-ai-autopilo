// ================================================================
// FIX AGENT OUTPUT VALIDATOR
// ================================================================
//
// Purpose:
// Ensures the Fix Agent returns the expected output structure.
//
// ================================================================

import { FixAgentOutput } from '../../types/fixAgent.types.js';

import { LOG_SERVICES } from '../../types/index.js';

const allowedEstimatedTimes = [
  '5-10 minutes',
  '10-15 minutes',
  '15-30 minutes',
  '20-40 minutes',
] as const;

// ================================================================
// Validate Fix Agent Output
// ================================================================

export const validateFixAgentOutput = (data: unknown): FixAgentOutput => {
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

  if (typeof output.summary !== 'string' || output.summary.trim() === '') {
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
    if (!LOG_SERVICES.includes(service)) {
      throw new Error(`Fix Agent: Invalid affected service '${service}'`);
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
    if (typeof command !== 'string' || command.trim() === '') {
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
    if (typeof step !== 'string' || step.trim() === '') {
      throw new Error('Fix Agent: Invalid rollback step');
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
    if (typeof step !== 'string' || step.trim() === '') {
      throw new Error('Fix Agent: Invalid verification step');
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
    if (typeof item !== 'string' || item.trim() === '') {
      throw new Error('Fix Agent: Invalid evidence');
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
    if (typeof hint !== 'string' || hint.trim() === '') {
      throw new Error('Fix Agent: Invalid risk hint');
    }
  }

  // ------------------------------------------------
  // STEP 11
  // Estimated Time
  // ------------------------------------------------

  if (!allowedEstimatedTimes.includes(output.estimatedTime)) {
    throw new Error('Fix Agent: Invalid estimatedTime');
  }

  // ------------------------------------------------
  // STEP 12
  // Recommended Runbook Id
  // ------------------------------------------------

  if (
    output.recommendedRunbookId !== undefined &&
    (typeof output.recommendedRunbookId !== 'string' ||
      output.recommendedRunbookId.trim() === '')
  ) {
    throw new Error('Fix Agent: Invalid recommendedRunbookId');
  }

  // ------------------------------------------------
  // STEP 13
  // Recommended Playbook Id
  // ------------------------------------------------

  if (
    output.recommendedPlaybookId !== undefined &&
    (typeof output.recommendedPlaybookId !== 'string' ||
      output.recommendedPlaybookId.trim() === '')
  ) {
    throw new Error('Fix Agent: Invalid recommendedPlaybookId');
  }

  // ------------------------------------------------
  // STEP 14
  // Validation Passed
  // ------------------------------------------------

  return output;
};
