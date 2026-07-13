// ================================================================
// REPORT FORMATTER LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Report Formatter business logic as a LangChain Tool.
//
// Business logic lives in:
//
// reportFormatter.function.ts
//
// Responsibilities:
// - Validate tool input
// - Define tool metadata
// - Expose LangChain tool
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { formatReport } from '../toolExecutors/reportFormatter.function.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const ReportFormatterToolSchema = z.object({
  incident: z
    .object({
      title: z.string(),

      description: z.string(),

      severity: z.enum(['critical', 'high', 'medium', 'low']),

      status: z.enum(['open', 'in_progress', 'resolved', 'rejected']),

      detectedAt: z.date(),
    })
    .passthrough(),

  summary: z.string(),

  timeline: z.array(
    z.object({
      timestamp: z.date(),

      event: z.string(),

      agent: z.string(),
    }),
  ),

  metrics: z.object({
    detectionTime: z.number(),

    diagnosisTime: z.number(),

    executionTime: z.number(),

    totalTime: z.number(),

    mttr: z.number().nullable(),
  }),
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'report_formatter_tool',

  description: `

Format the final incident report.

Use this tool after:

- timeline generation
- metrics calculation
- report summary generation

Returns:

- Markdown report
- HTML report
- JSON report

Do NOT use this tool for:

- timeline generation
- metrics calculation
- report exporting

The formatted report is consumed by the export tool.

`,

  schema: ReportFormatterToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const reportFormatterTool = tool(
  async (input) => {
    return formatReport(input);
  },

  metadata,
);
