// ================================================================
// GROUP LOGS LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Expose the Group Logs service as a LangChain Tool.
//
// Flow:
//
// Qwen
//   ↓
// LangChain Tool
//   ↓
// Execute
//   ↓
// Group Logs Service
//   ↓
// Return Result
//
// NOTE:
//
// This file contains ONLY the LangChain wrapper.
//
// Business logic lives inside:
//
// groupLogs.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { groupLogs } from './groupLogs.js';
import { LOG_SERVICES } from '../../types/index.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================
//
// Validates the input passed by the LLM before
// the tool is executed.
//
// ================================================================

const GroupLogsToolSchema = z.object({
  logs: z.array(
    z.object({
      timestamp: z.coerce.date(),

      service: z.enum(LOG_SERVICES),

      level: z.enum(['ERROR', 'WARN', 'INFO']),

      message: z.string(),
    }),
  ),
});

// ================================================================
// TOOL METADATA
// ================================================================
//
// The LLM reads this metadata to decide:
//
// • When to call this tool
// • What this tool does
// • What input it requires
//
// ================================================================

const metadata = {
  // ------------------------------------------------------------
  // Tool Name
  // ------------------------------------------------------------

  name: 'group_logs',

  // ------------------------------------------------------------
  // Tool Description
  // ------------------------------------------------------------

  description: `
Group repeated log messages and count their occurrences.

Use this tool whenever:

- repeated log entries need grouping
- duplicate log messages must be summarized
- log frequency analysis is required
- noisy logs need aggregation

Returns:

- groupedLogs

Each grouped log contains:

- message
- count

Do NOT use this tool for:

- extracting ERROR logs
- timeline generation
- dependency mapping
- affected service discovery
`,

  // ------------------------------------------------------------
  // Tool Input Schema
  // ------------------------------------------------------------

  schema: GroupLogsToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================
//
// This wrapper exposes the business logic
// as a LangChain Tool.
//
// The actual work is delegated to:
//
// groupLogs()
//
// ================================================================

export const groupLogsTool = tool(
  // ------------------------------------------------------------
  // Execute Tool
  // ------------------------------------------------------------

  async ({ logs }) => {
    return groupLogs(logs);
  },

  // ------------------------------------------------------------
  // Tool Metadata
  // ------------------------------------------------------------

  metadata,
);
