// ================================================================
// ORCHESTRATOR AGENT
// ================================================================
//
// Purpose:
// Ye agent poore workflow ko coordinate karta hai.

// Responsibilities:
// 1. Workflow start karna.
// 2. Incident verify karna.
// 3. Agle agents ke liye workflow prepare karna.

import { callQwen } from '../../ai/qwen/qwen.client.js';
import { ORCHESTRATOR_SYSTEM_PROMPT } from './orchestrator.prompt.js';
import { parseOrchestratorResponse } from './orchestrator.parser.js';
import { validateOrchestratorOutput } from './orchestrator.validator.js';
import {
  OrchestratorAgentInput,
  OrchestratorAgentOutput,
} from '../../types/orchestrationAgent.type.js';

// main function
export const orchestratorAgent = async (
  agentInput: OrchestratorAgentInput,
): Promise<OrchestratorAgentOutput> => {
  try {
    // ============================================================
    // STEP 1
    // User prompt prepare karo
    // ============================================================
    const userPrompt = `
       Analyze this incident and decide next workflow step.

       INSTRUCTIONS: Return ONLY valid JSON. Be deterministic.

       Incident:
          ${JSON.stringify(agentInput.incident, null, 2)}

       Logs:
         ${JSON.stringify(agentInput.logs, null, 2)}

       Detection Result:
         ${JSON.stringify(agentInput.detectionResult, null, 2)}

       Current Step:
         ${agentInput.currentStep}
`;

    // ============================================================
    // STEP 2
    // Qwen AI call karo
    // ============================================================
    const response = await callQwen([
      { role: 'system', content: ORCHESTRATOR_SYSTEM_PROMPT },

      { role: 'user', content: userPrompt },
    ]);

    // ============================================================
    // STEP 3
    // Raw AI response ko parse kro json me extar jo cheezn he remove
    // clean json retrun
    // ============================================================
    const parsed = parseOrchestratorResponse(response.content);

    // ============================================================
    // STEP 4
    // JSON structure validate karo
    // ============================================================
    const validatedResponse = validateOrchestratorOutput(parsed);

    // ============================================================
    // STEP 5
    // Safe validated output return karo
    // ============================================================

    return validatedResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Orchestrator Agent Failed: ${error.message}`);
    }

    throw new Error('Orchestrator Agent Failed: Unknown Error');
  }
};
