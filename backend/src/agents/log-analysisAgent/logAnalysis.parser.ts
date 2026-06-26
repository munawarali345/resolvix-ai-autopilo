// ================================================================
// LOG ANALYZER AGENT RESPONSE PARSER
// ================================================================
// Purpose:
// Qwen AI se aane wale RAW response ko clean JSON object me
// safely convert karna.
// ================================================================
import { LogAnalyzerAgentOutput } from '../../types/logAnalyzer.type.js';

// ================================================================
// Parse Log Analyzer AI Response
// ================================================================
export function parseLogAnalyzerResponse(
  content: string,
): LogAnalyzerAgentOutput {
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
    // Agar JSON object hi na mile to parser fail karega.
    // ------------------------------------------------
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON found in AI response');
    }

    // ------------------------------------------------
    // STEP 4: Extract JSON string
    // Sirf JSON portion ko alag nikala ja raha hai.
    // ------------------------------------------------
    const jsonString = cleaned.slice(jsonStart, jsonEnd + 1);

    // ------------------------------------------------
    // STEP 5: Parse JSON
    // String ko JavaScript object me convert karo.
    // ------------------------------------------------
    const parsed = JSON.parse(jsonString);

    // ------------------------------------------------
    // STEP 6: Return parsed object
    // Validator is object ko verify karega.
    // ------------------------------------------------
    return parsed as LogAnalyzerAgentOutput;
  } catch {
    // ------------------------------------------------
    // ERROR HANDLING
    // Invalid AI response format.
    // ------------------------------------------------
    throw new Error('Log Analyzer Parser failed: Invalid AI response format');
  }
}
