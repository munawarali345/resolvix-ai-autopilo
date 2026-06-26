// ================================================================
// EXTRACT AFFECTED SERVICES LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Expose the Extract Affected Services service as a
// LangChain Tool.
//
// Flow:
//
// Qwen
//   ↓
// LangChain Tool
//   ↓
// Execute
//   ↓
// Extract Affected Services
//   ↓
// Return Result
//
// NOTE:
//
// This file contains ONLY the LangChain wrapper.
//
// Business logic lives inside:
//
// extractAffectedServices.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { extractAffectedServices } from './extractAffectedServices.js';
import { LOG_SERVICES } from '../../types/index.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================
//
// Validates the input passed by the LLM before
// the tool is executed.
//
// ================================================================

const ExtractAffectedServicesToolSchema = z.object({
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

  name: 'extract_affected_services',

  // ------------------------------------------------------------
  // Tool Description
  // ------------------------------------------------------------

  description: `
Identify all unique services involved in the incident.

Use this tool whenever:

- affected services need to be identified
- impacted microservices are required
- service inventory is needed for analysis
- incident scope must be determined

Returns:

- affectedServices

Each service is returned only once.

Do NOT use this tool for:

- extracting ERROR logs
- grouping logs
- timeline generation
- dependency mapping
`,

  // ------------------------------------------------------------
  // Tool Input Schema
  // ------------------------------------------------------------

  schema: ExtractAffectedServicesToolSchema,
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
// extractAffectedServices()
//
// ================================================================

export const extractAffectedServicesTool = tool(
  // ------------------------------------------------------------
  // Execute Tool
  // ------------------------------------------------------------

  async ({ logs }) => {
    return extractAffectedServices(logs);
  },

  // ------------------------------------------------------------
  // Tool Metadata
  // ------------------------------------------------------------

  metadata,
);
