// ================================================================
// BUILD TIMELINE LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Build Timeline business logic as a LangChain Tool.
//
// Business logic lives in:
//
// buildTimeline.function.ts
//
// This wrapper is only responsible for:
// - Tool schema validation
// - Tool metadata
// - LangChain tool exposure
//
// ================================================================

import { tool } from '@langchain/core/tools';

import { z } from 'zod';

import { buildTimeline } from '../toolExecutors/buildTimeline.function.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================
//
// Validates the minimum required input fields
// required by the timeline generator.
//
// Extra fields from agent outputs are allowed.
//
// ================================================================

const TimelineToolSchema = z.object({
  // ------------------------------------------------
  // Incident Context
  // ------------------------------------------------

  incident: z
    .object({
      title: z.string(),

      description: z.string(),

      severity: z.enum(['critical', 'high', 'medium', 'low']),

      status: z.enum(['open', 'in_progress', 'resolved', 'rejected']),

      detectedAt: z.date(),
    })
    .passthrough(),

  // ------------------------------------------------
  // Detection Agent Output
  // ------------------------------------------------

  detection: z
    .object({
      isIncident: z.boolean(),

      confidence: z.number(),

      signals: z.array(z.string()),
    })
    .passthrough(),

  // ------------------------------------------------
  // Log Analyzer Agent Output
  // ------------------------------------------------

  logAnalysis: z
    .object({
      affectedServices: z.array(z.string()),

      findings: z.array(z.string()),
    })
    .passthrough(),

  // ------------------------------------------------
  // Root Cause Agent Output
  // ------------------------------------------------

  rootCause: z
    .object({
      rootCause: z.string(),
    })
    .passthrough(),

  // ------------------------------------------------
  // Fix Recommendation Output
  // ------------------------------------------------

  fixRecommendation: z
    .object({
      recommendedAction: z.string(),
    })
    .passthrough(),

  // ------------------------------------------------
  // Risk Validator Output
  // ------------------------------------------------

  riskValidation: z
    .object({
      decision: z.string(),
    })
    .passthrough(),

  // ------------------------------------------------
  // Executor Output
  // ------------------------------------------------

  execution: z
    .object({
      executionStatus: z.string(),
    })
    .passthrough(),
});

// ================================================================
// TOOL METADATA
// ================================================================
//
// Metadata helps the LLM understand:
// - when to use this tool
// - what this tool returns
//
// ================================================================

const metadata = {
  // Tool name.

  name: 'timeline_tool',

  // Tool description.

  description: `

Generate the incident response timeline.

Use this tool when:

- incident investigation workflow is completed
- detection results are available
- log analysis results are available
- root cause analysis is available
- remediation recommendation is available
- risk validation result is available
- execution result is available
- final incident report timeline is required


Returns:

- chronological incident events
- event timestamps
- responsible agents


Do NOT use this tool for:

- calculating incident metrics
- calculating MTTR
- formatting reports
- exporting reports


The output of this tool will be used by the Reporter Agent
to create the final incident report.

`,

  // Input validation schema.

  schema: TimelineToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================
//
// Exposes deterministic timeline generation logic
// as an AI callable tool.
//
// ================================================================

export const timelineTool = tool(
  async (input) => {
    return buildTimeline(input);
  },

  metadata,
);
