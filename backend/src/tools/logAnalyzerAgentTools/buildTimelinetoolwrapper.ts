// ================================================================
// Build Timeline LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Expose the Build Timeline service as a LangChain Tool.
//
// Flow:
//
// Qwen
//   ↓
// LangChain Tool
//   ↓
// Execute
//   ↓
// Extract Build Timeline
//   ↓
// Return Result
//
// NOTE:
//
// This file contains ONLY the LangChain wrapper.
//
// Business logic lives inside:
//
// buildTimeline.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { buildTimeline } from './buildTimeline.js';
import { LOG_SERVICES } from '../../types/index.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================
//
// Validates the input passed by the LLM before
// the tool is executed.
//
// ================================================================

const BuildTimelineToolSchema = z.object({
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

  name: 'build_timeline',

  // ------------------------------------------------------------
  // Tool Description
  // ------------------------------------------------------------

  description: `
Build a chronological incident timeline from the provided logs.

Use this tool whenever:

- incident events must be ordered
- execution sequence needs reconstruction
- chronological timeline is required

Returns:

- timeline

Do NOT use this tool for:

- extracting errors
- grouping logs
- dependency mapping
- affected service discovery
`,

  // ------------------------------------------------------------
  // Tool Input Schema
  // ------------------------------------------------------------

  schema: BuildTimelineToolSchema,
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
// buildTimeline()
//
// ================================================================

export const buildTimelineTool = tool(
  // ------------------------------------------------------------
  // Execute Tool
  // ------------------------------------------------------------

  async ({ logs }) => {
    return buildTimeline(logs);
  },

  // ------------------------------------------------------------
  // Tool Metadata
  // ------------------------------------------------------------

  metadata,
);
