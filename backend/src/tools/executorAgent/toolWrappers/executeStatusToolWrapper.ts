// ================================================================
// EXECUTION STATUS LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the execution status function as a LangChain Tool.
//
// Business logic lives in:
//
// determineExecutionStatus.function.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { determineExecutionStatus } from '../toolExecutors/executionStatus.function.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const ExecutionStatusToolSchema = z.object({
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

  verification: z.object({
    verified: z.boolean(),

    passedChecks: z.array(z.string()),

    failedChecks: z.array(z.string()),

    verificationEvidence: z.array(
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

  rollback: z.object({
    rollbackPerformed: z.boolean(),

    rollbackSuccessful: z.boolean(),

    rollbackSteps: z.array(z.string()),
  }),
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'execution_Status',

  description: `

Determine the final execution status.

Use this tool after:

- executeCommandTool
- verificationTool
- rollbackTool

Purpose:

- Determine overall execution status
- Combine execution, verification and rollback results
- Produce the final execution state

Rules:

- Never execute infrastructure.
- Never modify tool outputs.
- Use only the provided execution results.

Returns:

- execution status

`,

  schema: ExecutionStatusToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const executionStatusTool = tool(
  async ({
    execution,

    verification,

    rollback,
  }) => {
    return determineExecutionStatus(
      execution,

      verification,

      rollback,
    );
  },

  metadata,
);
