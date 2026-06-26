// ================================================================
// ORCHESTRATOR AGENT RESPONSE PARSER
// ================================================================
//
// Purpose:
// Qwen AI ke raw response ko clean JSON object me convert karna.
//
// Responsibilities:
// 1. Markdown remove karna.
// 2. JSON block extract karna.
// 3. JSON parse karna.
// 4. Typed object return karna.
// ================================================================

import { OrchestratorAgentOutput } from '../../types/orchestrationAgent.type.js';

// ------------------------------------------------
// Function: parseOrchestratorResponse
// Input: AI ka raw string response
// Output: Parsed OrchestratorAgentOutput
// ------------------------------------------------
export function parseOrchestratorResponse(
  content: string,
): OrchestratorAgentOutput {
  try {
    // Markdown json opening tag remove karo.
    const cleaned = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // JSON object ka starting index dhoondo.
    const jsonStart = cleaned.indexOf('{');

    // JSON object ka ending index dhoondo.
    const jsonEnd = cleaned.lastIndexOf('}');

    // Check karo ke valid JSON mila ya nahi.
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON found in AI response.');
    }

    // Sirf JSON wala portion extract karo.
    const jsonString = cleaned.slice(jsonStart, jsonEnd + 1);

    // JSON string ko object me convert karo.
    const parsed = JSON.parse(jsonString);

    // Typed response return karo.
    return parsed as OrchestratorAgentOutput;
  } catch {
    // Invalid AI response par error throw karo.
    throw new Error('Orchestrator Parser failed: Invalid AI response format.');
  }
}
