// ================================================================
// LOG ANALYZER AGENT OUTPUT VALIDATOR
// ================================================================
// Purpose:
// Parser sirf JSON parse karta hai.
//
// Ye validator ensure karega ke AI ne
// required structure hi return kiya hai.
// ================================================================

import { LogAnalyzerAgentOutput } from '../../types/logAnalyzer.type.js';

// ================================================================
// Validate Log Analyzer Output
// ================================================================
export const validateLogAnalyzerOutput = (
  data: unknown,
): LogAnalyzerAgentOutput => {
  // ------------------------------------------------
  // STEP 1
  // Response object hona chahiye
  // ------------------------------------------------
  if (!data || typeof data !== 'object') {
    throw new Error('Log Analyzer: Response is not a valid object');
  }

  // Parsed object
  const output = data as LogAnalyzerAgentOutput;

  // ------------------------------------------------
  // STEP 2
  // Summary validate karo
  // ------------------------------------------------
  if (typeof output.summary !== 'string' || output.summary.trim() === '') {
    throw new Error('Log Analyzer: Invalid summary');
  }

  // ------------------------------------------------
  // STEP 3
  // Key Findings validate karo
  // ------------------------------------------------
  if (!Array.isArray(output.keyFindings)) {
    throw new Error('Log Analyzer: Invalid keyFindings');
  }

  // Har finding string honi chahiye
  for (const finding of output.keyFindings) {
    if (typeof finding !== 'string') {
      throw new Error('Log Analyzer: Invalid key finding');
    }
  }

  // ------------------------------------------------
  // STEP 4
  // Affected Services validate karo
  // ------------------------------------------------
  if (!Array.isArray(output.affectedServices)) {
    throw new Error('Log Analyzer: Invalid affectedServices');
  }

  // Har service string honi chahiye
  for (const service of output.affectedServices) {
    if (typeof service !== 'string') {
      throw new Error('Log Analyzer: Invalid affected service');
    }
  }

  // ------------------------------------------------
  // STEP 5
  // Failure Pattern validate karo
  // ------------------------------------------------
  if (
    typeof output.failurePattern !== 'string' ||
    output.failurePattern.trim() === ''
  ) {
    throw new Error('Log Analyzer: Invalid failurePattern');
  }

  // ------------------------------------------------
  // STEP 6
  // Investigation Hints validate karo
  // ------------------------------------------------
  if (!Array.isArray(output.investigationHints)) {
    throw new Error('Log Analyzer: Invalid investigationHints');
  }

  // Har hint string honi chahiye
  for (const hint of output.investigationHints) {
    if (typeof hint !== 'string') {
      throw new Error('Log Analyzer: Invalid investigation hint');
    }
  }

  // ------------------------------------------------
  // STEP 7
  // Sab validation pass
  // Safe object return karo
  // ------------------------------------------------
  return output;
};
