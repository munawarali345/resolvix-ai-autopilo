// ================================================================
// MISSING VALIDATION TOOL
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { findMissingValidation } from '../toolExecutors/missingValidation.function.js';

import { RiskToolInput } from '../../../types/index.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const ImpactAssessmentToolSchema = z.object({
  incident: z.object({
    title: z.string(),

    description: z.string(),

    severity: z.enum(['critical', 'high', 'medium', 'low']),
  }),

  // passthrough is object k under extar feilds ko b allow ker deta he
  recommendation: z.object({}).passthrough(), // FixAgentOutput full object

  artifacts: z.object({}).passthrough(), // FixAgentArtifacts full object
});

export const missingValidationTool = tool(
  async (input: RiskToolInput) => {
    return findMissingValidation(input);
  },

  {
    name: 'missing_validation',

    description: `
Identify validation evidence that is missing before execution.

Use this tool to determine whether important operational
validation information is unavailable.

Returns only missing validation checks.

This tool does not determine approval,
calculate risk,
or make execution decisions.
`,

    schema: ImpactAssessmentToolSchema,
  },
);
