// ================================================================
// BUILD METRICS LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Build Metrics business logic as a LangChain Tool.
//
// Business logic lives in:
//
// buildMetrics.function.ts
//
// This wrapper is responsible for:
// - Input validation
// - Tool metadata
// - LangChain tool exposure
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { buildMetrics } from '../toolExecutors/calculateMetrics.function.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================
//
// Reporter Agent only needs the incidentId.
//
// The tool retrieves all execution history itself.
//
// ================================================================

const MetricsToolSchema = z.object({
  incidentId: z.string(),
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'metrics_tool',

  description: `

Build incident execution metrics.

Use this tool when:

- incident execution has completed
- workflow timing metrics are required
- execution statistics are required
- the final incident report is being generated

Returns:

- detection time
- diagnosis time
- execution time
- total workflow time
- MTTR

Do NOT use this tool for:

- timeline generation
- report formatting
- report exporting

The output of this tool is consumed by the Reporter Agent.

`,

  schema: MetricsToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const metricsTool = tool(
  async (input) => {
    return buildMetrics(input);
  },

  metadata,
);
