// ================================================================
// VERIFICATION LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the verification function as a LangChain Tool.
//
// Business logic lives in:
//
// verifyExecution.function.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { verifyExecution } from '../toolExecutors/verifyExecution.function.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const VerificationToolSchema = z.object({
  execution: z.object({
    success: z.boolean(),

    duration: z.number(),

    results: z.array(
      z.object({
        command: z.string(),

        success: z.boolean(),

        exitCode: z.number(),

        stdout: z.string(),

        stderr: z.string(),

        duration: z.number(),
      }),
    ),
  }),
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'verification_Tool',

  description: `

Verify the execution results produced by executeCommandTool.

Use this tool immediately after command execution.

Purpose:

- Verify remediation completed successfully
- Identify passed verification checks
- Identify failed verification checks
- Produce verification evidence

Rules:

- Never execute infrastructure.
- Never modify execution results.
- Use only the execution results provided.
- Base verification entirely on execution evidence.

Returns:

- verification status
- passed checks
- failed checks
- verification evidence

`,

  schema: VerificationToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const verificationTool = tool(
  async ({ execution }) => {
    return verifyExecution(execution);
  },

  metadata,
);
