// ================================================================
// DEPENDENCY MAPPER LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Expose the Dependency Mapper service as a LangChain Tool.
//
// Flow:
//
// Qwen
//   ↓
// LangChain Tool
//   ↓
// Execute
//   ↓
// Dependency Mapper Service
//   ↓
// Return Result
//
// NOTE:
//
// This file contains ONLY the LangChain wrapper.
//
// Business logic lives inside:
//
// dependencyMapper.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { dependencyMapper } from './dependencyMapper.js';
import { LOG_SERVICES } from '../../types/index.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================
//
// Validates the input passed by the LLM before
// the tool is executed.
//
// ================================================================

const DependencyMapperToolSchema = z.object({
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

  name: 'dependency_mapper',

  // ------------------------------------------------------------
  // Tool Description
  // ------------------------------------------------------------

  description: `
Analyze incident logs and identify service dependency relationships.

This tool infers dependencies only from log evidence.
It does NOT discover actual infrastructure topology.

Use this tool whenever:

- service dependencies need to be identified
- downstream impacted services are required
- dependency relationships must be mapped
- service interaction analysis is needed

Returns:

- dependencyMap

Each dependency entry contains:

- source
- affectedServices

Example:

{
  "source": "database",
  "affectedServices": [
    "payment-service",
    "user-service"
  ]
}

Do NOT use this tool for:

- extracting ERROR logs
- grouping logs
- timeline generation
- identifying affected services
`,

  // ------------------------------------------------------------
  // Tool Input Schema
  // ------------------------------------------------------------

  schema: DependencyMapperToolSchema,
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
// dependencyMapper()
//
// ================================================================

export const dependencyMapperTool = tool(
  // ------------------------------------------------------------
  // Execute Tool
  // ------------------------------------------------------------

  async ({ logs }) => {
    return dependencyMapper(logs);
  },

  // ------------------------------------------------------------
  // Tool Metadata
  // ------------------------------------------------------------

  metadata,
);
