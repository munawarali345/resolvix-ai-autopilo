// ================================================================
// ROOT CAUSE AGENT RESPONSE PARSER
// ================================================================
//
// Purpose:
// Qwen AI se aane wale RAW response ko clean JSON object me
// safely convert karna.
// ================================================================

import { RootCauseAgentOutput } from '../../types/index.js';

// ================================================================
// Parse Root Cause AI Response
// ================================================================
export function parseRootCauseResponse(content: string): RootCauseAgentOutput {
  try {
    // ------------------------------------------------
    // STEP 1: Remove markdown formatting
    // AI kabhi response ko ```json ... ``` me wrap karta hai.
    // ------------------------------------------------
    const cleaned = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // ------------------------------------------------
    // STEP 2: Locate JSON boundaries
    // Agar AI extra text bhej de to sirf JSON extract karenge.
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
    // Validator is object ko verify karega.
    // ------------------------------------------------
    return parsed as RootCauseAgentOutput;
  } catch {
    // ------------------------------------------------
    // ERROR HANDLING
    // ------------------------------------------------
    throw new Error('Root Cause Parser failed: Invalid AI response format');
  }
}
