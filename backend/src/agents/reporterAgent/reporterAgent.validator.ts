// ================================================================
// REPORTER OUTPUT VALIDATOR
// ================================================================
//
// Purpose:
// Ensures the Reporter Agent returns the expected report structure.
//
// ================================================================

import { ReporterOutput } from '../../types/reporterAgent.types.js';

// ================================================================
// Validate Reporter Output
// ================================================================

export const validateReporterOutput = (data: unknown): ReporterOutput => {
  // ------------------------------------------------
  // STEP 1
  // Response must be an object
  // ------------------------------------------------

  if (!data || typeof data !== 'object') {
    throw new Error('Reporter: Response is not a valid object');
  }

  const output = data as ReporterOutput;

  // ------------------------------------------------
  // STEP 2
  // Title
  // ------------------------------------------------

  if (typeof output.title !== 'string' || output.title.trim() === '') {
    throw new Error('Reporter: Invalid title');
  }

  // ------------------------------------------------
  // STEP 3
  // Summary
  // ------------------------------------------------

  if (typeof output.summary !== 'string' || output.summary.trim() === '') {
    throw new Error('Reporter: Invalid summary');
  }

  // ------------------------------------------------
  // STEP 4
  // Executive Summary
  // ------------------------------------------------

  if (
    typeof output.executiveSummary !== 'string' ||
    output.executiveSummary.trim() === ''
  ) {
    throw new Error('Reporter: Invalid executiveSummary');
  }

  // ------------------------------------------------
  // STEP 5
  // Technical Summary
  // ------------------------------------------------

  if (
    typeof output.technicalSummary !== 'string' ||
    output.technicalSummary.trim() === ''
  ) {
    throw new Error('Reporter: Invalid technicalSummary');
  }

  // ------------------------------------------------
  // STEP 6
  // Incident Status
  // ------------------------------------------------

  const allowedStatuses = ['RESOLVED', 'FAILED', 'ROLLED_BACK'] as const;

  if (
    typeof output.incidentStatus !== 'string' ||
    !allowedStatuses.includes(
      output.incidentStatus as (typeof allowedStatuses)[number],
    )
  ) {
    throw new Error('Reporter: Invalid incidentStatus');
  }

  // ------------------------------------------------
  // STEP 7
  // Confidence
  // ------------------------------------------------

  if (
    typeof output.confidence !== 'number' ||
    output.confidence < 0 ||
    output.confidence > 100
  ) {
    throw new Error('Reporter: Invalid confidence');
  }

  // ------------------------------------------------
  // STEP 8
  // Timeline
  // ------------------------------------------------

  if (!Array.isArray(output.timeline)) {
    throw new Error('Reporter: Invalid timeline');
  }

  for (const item of output.timeline) {
    if (!item || typeof item !== 'object') {
      throw new Error('Reporter: Invalid timeline item');
    }

    const date = new Date(item.timestamp);

    if (isNaN(date.getTime())) {
      throw new Error('Reporter: Invalid timeline timestamp');
    }

    if (typeof item.event !== 'string' || item.event.trim() === '') {
      throw new Error('Reporter: Invalid timeline event');
    }

    if (typeof item.agent !== 'string' || item.agent.trim() === '') {
      throw new Error('Reporter: Invalid timeline agent');
    }
  }

  // ------------------------------------------------
  // STEP 9
  // Metrics
  // ------------------------------------------------

  if (!output.metrics || typeof output.metrics !== 'object') {
    throw new Error('Reporter: Invalid metrics');
  }

  if (typeof output.metrics.detectionTime !== 'number') {
    throw new Error('Reporter: Invalid detectionTime');
  }

  if (typeof output.metrics.diagnosisTime !== 'number') {
    throw new Error('Reporter: Invalid diagnosisTime');
  }

  if (typeof output.metrics.executionTime !== 'number') {
    throw new Error('Reporter: Invalid executionTime');
  }

  if (typeof output.metrics.totalTime !== 'number') {
    throw new Error('Reporter: Invalid totalTime');
  }

  if (typeof output.metrics.mttr !== 'number') {
    throw new Error('Reporter: Invalid mttr');
  }

  // ------------------------------------------------
  // STEP 10
  // Validation Passed
  // ------------------------------------------------

  return output;
};
