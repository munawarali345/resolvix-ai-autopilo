// ================================================================
// Orchestrator Agent Output Validator
// ================================================================
// Purpose:
// Parser sirf JSON parse karta hai.
// Ye validator check karega ke AI ne sahi workflow decision diya hai.
// ================================================================

import { OrchestratorAgentOutput } from '../../types/orchestrationAgent.type.js';

// ================================================================
// Allowed Workflow Steps
// ================================================================
const allowedSteps = [
  'log-analysis',

  'root-cause',

  'fix',

  'risk-validation',

  'execution',

  'reporting',
] as const;

// ================================================================
// Validate Orchestrator Agent Output
// ================================================================
export const validateOrchestratorOutput = (
  data: unknown,
): OrchestratorAgentOutput => {
  // ------------------------------------------------
  // Step 1
  // Response object hona chahiye
  // ------------------------------------------------
  if (!data || typeof data !== 'object') {
    throw new Error('Orchestrator Agent: Response is not a valid object');
  }

  const output = data as OrchestratorAgentOutput;

  // ------------------------------------------------
  // Step 2
  // nextStep required hai
  // ------------------------------------------------
  if (typeof output.nextStep !== 'string') {
    throw new Error('Orchestrator Agent: Invalid nextStep');
  }

  // ------------------------------------------------
  // Step 3
  // nextStep valid workflow step hona chahiye
  // ------------------------------------------------
  if (!allowedSteps.includes(output.nextStep)) {
    throw new Error('Orchestrator Agent: Unknown workflow step');
  }

  // ------------------------------------------------
  // Step 4
  // runParallel boolean hona chahiye
  // ------------------------------------------------
  if (typeof output.runParallel !== 'boolean') {
    throw new Error('Orchestrator Agent: Invalid runParallel');
  }

  // ------------------------------------------------
  // Step 5
  // continueWorkflow boolean hona chahiye
  // ------------------------------------------------
  if (typeof output.continueWorkflow !== 'boolean') {
    throw new Error('Orchestrator Agent: Invalid continueWorkflow');
  }

  // ------------------------------------------------
  // Step 6
  // reasoning required hai
  // ------------------------------------------------
  if (typeof output.reasoning !== 'string' || output.reasoning.trim() === '') {
    throw new Error('Orchestrator Agent: Invalid reasoning');
  }

  // ------------------------------------------------
  // Step 7
  // Safe validated object return karo
  // ------------------------------------------------
  return output;
};
