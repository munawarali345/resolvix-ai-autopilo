// ================================================================
// EXTRACT ERRORS LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Expose the Extract Errors service as a LangChain Tool.
//
// Flow:
//
// Qwen
//   ↓
// LangChain Tool
//   ↓
// Execute
//   ↓
// Extract Errors Service
//   ↓
// Return Result
//
// NOTE:
//
// This file contains ONLY the LangChain wrapper.
//
// Business logic lives inside:
//
// extractErrors.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { extractErrors } from './extractErrors.js';
import { LOG_SERVICES } from '../../types/index.js';
// ================================================================
// TOOL INPUT SCHEMA
// ================================================================
//
// Validates the input passed by the LLM before
// the tool is executed.
//
// ================================================================

const ExtractErrorsToolSchema = z.object({
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

  name: 'extract_errors',

  // ------------------------------------------------------------
  // Tool Description
  // ------------------------------------------------------------

  description: `
Extract all ERROR level log entries from the provided incident logs.

Use this tool whenever:

- ERROR logs need to be identified
- failure events must be isolated
- only ERROR severity logs are required

Returns:

- errorLogs

Do NOT use this tool for:

- grouping logs
- timeline generation
- dependency mapping
- affected service discovery
`,

  // ------------------------------------------------------------
  // Tool Input Schema
  // ------------------------------------------------------------

  schema: ExtractErrorsToolSchema,
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
// extractErrors()
//
// ================================================================

export const extractErrorsTool = tool(
  // ------------------------------------------------------------
  // Execute Tool
  // ------------------------------------------------------------

  async ({ logs }) => {
    return extractErrors(logs);
  },

  // ------------------------------------------------------------
  // Tool Metadata
  // ------------------------------------------------------------

  metadata,
);
