// ================================================================
// SEARCH FIX PLAYBOOK FUNCTION
// ================================================================
//
// Purpose:
// Searches the internal playbook knowledge base and returns
// the most relevant playbooks for the current incident.
//
// This function is completely READ ONLY.
//
// ================================================================

import { PLAYBOOKS } from '../../../data/playbookData/playbooks.data.js';

import {
  FixToolInput,
  SearchFixPlaybookOutput,
  Playbook,
  logService,
} from '../../../types/index.js';

// ================================================================
// Normalize Text
// ================================================================
//
// Converts text into a searchable format.
//
// ================================================================

function normalizeText(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

// ================================================================
// Root Cause Score
// ================================================================
//
// Returns:
//
// 60 = Match
// 0  = No Match
//
// ================================================================

function calculateRootCauseScore(
  rootCause: string,
  playbook: Playbook,
): number {
  const normalizedRootCause = normalizeText(rootCause);

  const matched = playbook.rootCauseKeywords.some((keyword) =>
    normalizedRootCause.includes(normalizeText(keyword)),
  );

  return matched ? 60 : 0;
}

// ================================================================
// Service Score
// ================================================================
//
// Maximum Score: 30
// ================================================================

function calculateServiceScore(
  affectedServices: logService[],
  playbook: Playbook,
): number {
  if (!affectedServices.length) {
    return 0;
  }

  const matches = affectedServices.filter((service) =>
    playbook.affectedServices.includes(service),
  ).length;

  if (!matches) {
    return 0;
  }

  return Math.min(matches * 15, 30);
}

// ================================================================
// Search Fix Playbook
// ================================================================

export function searchFixPlaybook(
  input: FixToolInput,
): SearchFixPlaybookOutput {
  // Empty root cause ( Guard Clause )

  if (!input.incident.rootCause) {
    return {
      playbooks: [],
    };
  }

  const results: { playbook: Playbook; score: number }[] = [];

  // ==============================================================
  // Search Every Playbook
  // ==============================================================

  for (const playbook of PLAYBOOKS) {
    // ------------------------------------------------------------
    // Calculate Root Cause Score
    // ------------------------------------------------------------

    const rootCauseScore = calculateRootCauseScore(
      input.incident.rootCause,

      playbook,
    );

    // ------------------------------------------------------------
    // Calculate Service Score
    // ------------------------------------------------------------

    const serviceScore = calculateServiceScore(
      input.affectedServices,

      playbook,
    );

    // ------------------------------------------------------------
    // Calculate Severity Score
    // ------------------------------------------------------------

    const severityScore = playbook.severity.includes(input.incident.severity)
      ? 10
      : 0;

    // ------------------------------------------------------------
    // Calculate Final Score
    // ------------------------------------------------------------

    const totalScore = rootCauseScore + serviceScore + severityScore;

    // ------------------------------------------------------------
    // Ignore Irrelevant Playbooks
    // ------------------------------------------------------------

    if (totalScore === 0) {
      continue;
    }

    // ------------------------------------------------------------
    // Store Matched Playbook
    // ------------------------------------------------------------

    results.push({ playbook, score: totalScore });
  }

  // ==============================================================
  // Sort Best Matches First
  // ==============================================================

  results.sort((a, b) => b.score - a.score);

  // ==============================================================
  // Return Matching Playbooks
  // ==============================================================

  return {
    playbooks: results.map(({ playbook, score }) => ({
      id: playbook.id,

      title: playbook.title,

      summary: playbook.summary,

      relevanceScore: score,
    })),
  };
}
