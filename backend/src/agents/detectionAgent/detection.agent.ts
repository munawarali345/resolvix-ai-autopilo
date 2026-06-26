// ================================================================
// DETECTION AGENT
// ================================================================
// Purpose:
// AI ko logs + metrics bhejna
// AI se incident detection karwana
// AI response ko parse aur validate karna
// Safe structured output return karna
// ================================================================

import { callQwen } from '../../ai/qwen/qwen.client.js';

import { SYSTEM_PROMPT } from '../../agents/detectionAgent/detection.prompt.js';

import { parseDetectionResponse } from './detection.parser.js';

import { validateDetectionOutput } from './detection.validator.js';

import {
  DetectionAgentInput,
  DetectionAgentOutput,
} from '../../types/detectionAgent.type.js';

// ================================================================
// Detection Agent
// ================================================================
export const detectionAgent = async (
  input: DetectionAgentInput,
): Promise<DetectionAgentOutput> => {
  try {
    // ============================================================
    // STEP 1
    // User prompt prepare karo
    // AI ko raw logs + calculated metrics bhejne hain
    // ============================================================

    const userPrompt = `
     Analyze the following production logs.

     Return ONLY the JSON defined in the system prompt.

     Logs:

     ${JSON.stringify(input.logs, null, 2)}

     Metrics:

     ${JSON.stringify(input.metrics, null, 2)}
`;

    // ============================================================
    // STEP 2
    // Qwen AI call karo
    // ============================================================

    const response = await callQwen([
      {
        role: 'system',

        content: SYSTEM_PROMPT,
      },

      {
        role: 'user',

        content: userPrompt,
      },
    ]);

    // ============================================================
    // STEP 3
    // Raw AI response ko JSON me convert karo
    // ============================================================

    const parsedResponse = parseDetectionResponse(response.content);

    // ============================================================
    // STEP 4
    // JSON structure validate karo
    // ============================================================

    const validatedResponse = validateDetectionOutput(parsedResponse);

    // ============================================================
    // STEP 5
    // Safe validated output return karo
    // ============================================================

    return validatedResponse;
  } catch (error) {
    // ============================================================
    // STEP 6
    // Error handling
    // ============================================================

    if (error instanceof Error) {
      throw new Error(`Detection Agent Failed: ${error.message}`);
    }

    throw new Error('Detection Agent Failed: Unknown Error');
  }
};
