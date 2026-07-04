// ================================================================
// SEARCH RUNBOOK FUNCTION
// ================================================================

import { RUNBOOKS } from "../../../data/playbookData/runbook.data.js";

import {
  FixToolInput,
  SearchRunbookOutput,
  Runbook,
  logService,
} from "../../../types/index.js";

// ================================================================
// Normalize Text
// ================================================================

function normalizeText(text: string): string {

  return text.trim().toLowerCase().replace(/\s+/g, " ");

}

// ================================================================
// Root Cause Score
// ================================================================

function calculateTriggerConditionScore(

  rootCause: string,

  runbook: Runbook,

): number {

  const normalizedRootCause = normalizeText(rootCause);

  const matched = runbook.triggerConditions.some(

    (condition) =>

      normalizedRootCause.includes(normalizeText(condition)),

  );

  return matched ? 60 : 0;

}

// ================================================================
// Service Score
// ================================================================

function calculateServiceScore(

  affectedServices: logService[],

  runbook: Runbook,

): number {

  if (!affectedServices.length) {

    return 0;

  }

  const matches = affectedServices.filter(

    (service) => runbook.service.includes(service),

  ).length;

  if (!matches) {

    return 0;

  }

  return Math.min(matches * 15, 30);

}

// ================================================================
// Search Runbook
// ================================================================

export function searchRunbook(

  input: FixToolInput,

): SearchRunbookOutput {

  if (!input.incident.rootCause) {

    return {

      runbooks: [],

    };

  }

  const results: {

    runbook: Runbook;

    score: number;

  }[] = [];

  // Search matching runbooks.

  for (const runbook of RUNBOOKS) {

    const rootCauseScore = calculateTriggerConditionScore( input.incident.rootCause, runbook, );


    const serviceScore = calculateServiceScore( input.affectedServices, runbook, );


    const severityScore = runbook.severity === input.incident.severity ? 10 : 0;


    const totalScore =

      rootCauseScore +

      serviceScore +

      severityScore;


    if (totalScore === 0) {

      continue;

    }


    results.push({ runbook, score: totalScore, });

  }

  // Sort highest score first.

  results.sort( (a, b) => b.score - a.score, );

  // Return matching runbooks.

  return {

    runbooks: results.map(

      ({ runbook, score }) => ({

        id: runbook.id,

        title: runbook.title,

        service: runbook.service,

        severity: runbook.severity,

        estimatedTime: runbook.estimatedTime,

        automationLevel: runbook.automationLevel,

        steps: runbook.steps,

        relevanceScore: score,

      }),

    ),

  };

}
