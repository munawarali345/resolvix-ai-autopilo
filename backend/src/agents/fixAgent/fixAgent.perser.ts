
// ================================================================
// FIX AGENT RESPONSE PARSER
// ================================================================
//
// Purpose:
// Converts the raw AI response from the Fix Agent into
// a clean JSON object.
//
// ================================================================

import { FixAgentOutput } from '../../types/index.js';

// ================================================================
// Parse Fix Agent Response
// ================================================================

export function parseFixResponse(content: string): FixAgentOutput {

  try {

    // ------------------------------------------------
    // STEP 1: Remove markdown formatting
    // AI may wrap the response inside ```json ... ```
    // ------------------------------------------------

    const cleaned = content
      .replace(/```json/g, '')
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

      throw new Error('No valid JSON found in AI response');

    }

    // ------------------------------------------------
    // STEP 4: Extract JSON string
    // ------------------------------------------------

    const jsonString = cleaned.slice(jsonStart, jsonEnd + 1);

    // ------------------------------------------------
    // STEP 5: Parse JSON
    // ------------------------------------------------

    const parsed = JSON.parse(jsonString);

    // ------------------------------------------------
    // STEP 6: Return parsed object
    // Validator will verify the object.
    // ------------------------------------------------

    return parsed as FixAgentOutput;

  } catch {

    // ------------------------------------------------
    // ERROR HANDLING
    // ------------------------------------------------

    throw new Error('Fix Agent Parser failed: Invalid AI response format');

  }

}