// ================================================================
// RUNBOOK TYPES
// ================================================================
//
// Purpose:
// Shared contracts for Runbook system used by Fix Agent.
//
// Runbooks define STEP-BY-STEP operational procedures
// for resolving incidents based on known scenarios.
//
// These are READ-ONLY operational guides.
//
// ================================================================

import { logService } from './log.type.js';

// ================================================================
// RUNBOOK STEP
// ================================================================

export interface RunbookStep {
  // Step execution order
  order: number;

  // Human readable action
  action: string;

  // Optional system command (kubectl, sql, cli etc)
  command?: string;

  // Expected result after execution
  expectedResult: string;
}

// ================================================================
// RUNBOOK ESTIMATED TIME
// ================================================================

export type RunbookEstimatedTime =
  | '5-10 minutes'
  | '10-15 minutes'
  | '15-30 minutes'
  | '20-40 minutes';

// ================================================================
// MAIN RUNBOOK TYPE
// ================================================================

export type Runbook = {
  // Unique runbook ID
  id: string;

  // Title of runbook
  title: string;

  // Scenario mapping (VERY IMPORTANT)
  scenario:
    | 'db-failure'
    | 'memory-leak'
    | 'api-500-error'
    | 'deployment-failure'
    | 'cpu-spike';

  // Category grouping
  category: 'Database' | 'API' | 'Performance' | 'Deployment' | 'System';

  // Services impacted
  service: logService[];

  // Conditions that trigger this runbook
  triggerConditions: string[];

  // Step-by-step execution plan
  steps: RunbookStep[];

  // Execution type
  automationLevel: 'manual' | 'semi-automated' | 'automated';

  // Severity applicability
  severity: 'critical' | 'high' | 'medium' | 'low';

  // Estimated remediation time
  estimatedTime: RunbookEstimatedTime;
};
