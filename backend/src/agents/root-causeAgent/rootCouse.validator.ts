// ================================================================
// ROOT CAUSE AGENT OUTPUT VALIDATOR
// ================================================================
//
// Purpose:
// Parser sirf JSON parse karta hai.
//
// Ye validator ensure karega ke AI ne
// required structure hi return kiya hai.
// ================================================================

import { RootCauseAgentOutput } from '../../types/index.js';

// ================================================================
// Validate Root Cause Output
// ================================================================
export const validateRootCauseOutput = (
  data: unknown,
): RootCauseAgentOutput => {
  // ------------------------------------------------
  // STEP 1
  // Response object hona chahiye
  // ------------------------------------------------
  if (!data || typeof data !== 'object') {
    throw new Error('Root Cause: Response is not a valid object');
  }

  // Parsed object
  const output = data as RootCauseAgentOutput;

  // ------------------------------------------------
  // STEP 2
  // Root Cause validate karo
  // ------------------------------------------------
  if (typeof output.rootCause !== 'string' || output.rootCause.trim() === '') {
    throw new Error('Root Cause: Invalid rootCause');
  }

  // ------------------------------------------------
  // STEP 3
  // Reasoning validate karo
  // ------------------------------------------------
  if (typeof output.reasoning !== 'string' || output.reasoning.trim() === '') {
    throw new Error('Root Cause: Invalid reasoning');
  }

  // ------------------------------------------------
  // STEP 4
  // Confidence validate karo
  // ------------------------------------------------
  if (
    typeof output.confidence !== 'number' ||
    output.confidence < 0 ||
    output.confidence > 100
  ) {
    throw new Error('Root Cause: Invalid confidence');
  }

  // ------------------------------------------------
  // STEP 5
  // Evidence validate karo
  // ------------------------------------------------
  if (!Array.isArray(output.evidence)) {
    throw new Error('Root Cause: Invalid evidence');
  }

  // Har evidence string honi chahiye
  for (const item of output.evidence) {
    if (typeof item !== 'string') {
      throw new Error('Root Cause: Invalid evidence item');
    }
  }

  // ------------------------------------------------
  // STEP 6
  // Sab validation pass
  // Safe object return karo
  // ------------------------------------------------
  return output;
};
