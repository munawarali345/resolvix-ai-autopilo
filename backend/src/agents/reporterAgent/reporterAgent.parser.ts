// ================================================================
// REPORTER RESPONSE PARSER
// ================================================================
//
// Purpose:
// Converts the raw AI response from the Reporter Agent into
// a clean Report object.
//
// ================================================================

import { Report } from '../../types/index.js';

// ================================================================
// Parse Reporter Response
// ================================================================

export function parseReporterResponse(content: string): Report {
  try {
    // ------------------------------------------------
    // STEP 1: Remove markdown formatting
    // ------------------------------------------------

    const cleaned = content
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    // ------------------------------------------------
    // STEP 2: Locate JSON boundaries
    // ------------------------------------------------

    const jsonStart = cleaned.indexOf('{');

    const jsonEnd = cleaned.lastIndexOf('}');

    // ------------------------------------------------
    // STEP 3: Validate JSON existence
    // ------------------------------------------------

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON found in Reporter response');
    }

    // ------------------------------------------------
    // STEP 4: Extract JSON
    // ------------------------------------------------

    const jsonString = cleaned.slice(jsonStart, jsonEnd + 1);

    // ------------------------------------------------
    // STEP 5: Parse JSON
    // ------------------------------------------------

    const parsed = JSON.parse(jsonString);

    // ------------------------------------------------
    // STEP 6: Return Report object
    // Validator will validate structure.
    // ------------------------------------------------

    return parsed as Report;
  } catch {
    throw new Error('Reporter Parser failed: Invalid AI response format');
  }
}
