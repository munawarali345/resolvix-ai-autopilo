// ================================================================
// ROLLBACK LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the rollback function as a LangChain Tool.
//
// Business logic lives in:
//
// rollbackExecution.function.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { executeRollback } from '../toolExecutors/rollback.function.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const RollbackToolSchema = z.object({
  rollbackPlan: z.array(z.string()).min(1, 'Rollback plan is required.'),
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'rollback_Tool',

  description: `

Execute the approved rollback plan.

Use this tool ONLY when execution or verification has failed.

Purpose:

- Restore the previous operational state
- Execute approved rollback commands
- Record rollback steps
- Report rollback results

Rules:

- Execute ONLY approved rollback commands.
- Never invent rollback commands.
- Never modify rollback commands.
- Never perform rollback unless requested.

Returns:

- rollback performed
- rollback successful
- executed rollback steps

`,

  schema: RollbackToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const rollbackTool = tool(
  async ({ rollbackPlan }) => {
    return executeRollback(rollbackPlan);
  },

  metadata,
);
