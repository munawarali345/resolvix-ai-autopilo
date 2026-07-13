// ================================================================
// EXECUTOR RESPONSE PARSER
// ================================================================
//
// Purpose:
// Converts the raw AI response from the Executor Agent into
// a clean JSON object.
//
// ================================================================

import { ExecutorOutput } from '../../types/index.js';

// ================================================================
// Parse Executor Response
// ================================================================

export function parseExecutorResponse(content: string): ExecutorOutput {
  try {
    // ------------------------------------------------
    // STEP 1: Remove markdown formatting
    // AI may wrap the response inside ```json ... ```
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

    return parsed as ExecutorOutput;
  } catch {
    // ------------------------------------------------
    // ERROR HANDLING
    // ------------------------------------------------

    throw new Error('Executor Parser failed: Invalid AI response format');
  }
}
