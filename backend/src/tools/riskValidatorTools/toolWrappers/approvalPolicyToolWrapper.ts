// ================================================================
// APPROVAL POLICY LANGCHAIN TOOL (PRODUCTION)
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { validateApprovalPolicy } from '../toolExecutors/approvalPolicy.function.js';
import { RiskToolInput } from '../../../types/riskAgentTools.type.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const ApprovalPolicyToolSchema = z.object({
  incident: z.object({
    title: z.string(),

    description: z.string(),

    severity: z.enum(['critical', 'high', 'medium', 'low']),
  }),

  recommendation: z.object({}).passthrough(), // FixAgentOutput full object

  artifacts: z.object({}).passthrough(), // FixAgentArtifacts full object
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'approval_policy',

  description: `
   Evaluates whether a remediation requires manual approval.

This tool checks:
- service-level restrictions
- severity-based policies
- environment constraints
- criticality rules
- maintenance window requirements

Use this tool only when:
- Fix recommendation is generated
- Affected services are known
- Incident severity is available

Returns:
- approvalRequired
- approvalReason
  `,

  schema: ApprovalPolicyToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const approvalPolicyTool = tool(
  async (input: RiskToolInput) => {
    return validateApprovalPolicy(input);
  },

  metadata,
);
