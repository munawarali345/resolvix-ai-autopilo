// ================================================================
// EXECUTE COMMAND LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Fake Execution Provider as a LangChain Tool.
//
// Business logic lives in:
//
// fakeExecutionProvider.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { fakeExecutionProvider } from '../executecommandtoolshelpers/fakeExecutionProvider.js';

import {
  ExecuteCommandOutput,
  FakeExecutionResult,
} from '../../../types/executorTools.type.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const ExecuteCommandToolSchema = z.object({
  commands: z.array(z.string()).min(1, 'At least one command is required.'),
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'execute_Command',

  description: `

Execute approved remediation commands.

Use this tool ONLY after remediation has been approved.

Purpose:

- Execute approved infrastructure commands
- Collect execution evidence
- Record executed commands
- Measure execution duration

Rules:

- Execute ONLY approved commands.
- Never invent commands.
- Never modify commands.
- Never execute unsupported commands.

Returns:

- execution success
- executed commands
- execution evidence
- execution duration

`,

  schema: ExecuteCommandToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const executeCommandTool = tool(
  // --------------------------------------------------------------
  // Execute approved remediation commands.
  //
  // The Fake Execution Provider executes ONE command at a time,
  // therefore each approved command is forwarded individually.
  //
  // The tool is responsible only for:
  //
  // - iterating over approved commands
  // - collecting execution evidence
  // - calculating total execution duration
  // - shaping the final tool output
  //
  // Infrastructure execution itself is handled entirely by
  // fakeExecutionProvider().
  // --------------------------------------------------------------

  async ({ commands }): Promise<ExecuteCommandOutput> => {
    const results: FakeExecutionResult[] = [];

    let totalDuration = 0;

    let success = true;

    // ------------------------------------------------------------
    // Execute every approved command.
    // ------------------------------------------------------------

    for (const command of commands) {
      const result = await fakeExecutionProvider(command);

      results.push(result);

      totalDuration += result.duration;

      if (!result.success) {
        success = false;
      }
    }

    // ------------------------------------------------------------
    // Return execution summary.
    // ------------------------------------------------------------

    return {
      success,

      results,

      duration: totalDuration,
    };
  },

  metadata,
);
