// ================================================================
// IMPACT ASSESSMENT LANGCHAIN TOOL
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { assessImpact } from '../toolExecutors/impactAssessment.function.js';

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

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'impact_assessment',

  description: `
Assess the operational impact of the proposed remediation.

Use this tool to determine:

- whether the remediation appears safe to execute
- potential operational impacts
- affected services

This tool provides operational evidence only.

It does not calculate risk score.
It does not determine approval.
It does not make the final execution decision.
`,

  schema: ImpactAssessmentToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const impactAssessmentTool = tool(
  async (input: RiskToolInput) => {
    return assessImpact(input);
  },

  metadata,
);
