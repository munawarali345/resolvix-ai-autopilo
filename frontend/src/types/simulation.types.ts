// ================================================================
// SIMULATION TYPES
// ================================================================
//
// Purpose:
// Incident simulation API response types.
//
// Backend:
// POST /api/simulate/*
//
// ================================================================

import type { Incident } from './incident.types';

// ================================================================
// Scenario Types
// ================================================================

export type SimulationScenario =
  | 'db-failure'
  | 'memory-leak'
  | 'api-500-error'
  | 'deployment-failure'
  | 'cpu-spike';

// ================================================================
// Simulation Logs Response
// ================================================================

export interface SimulationLogsResult {
  logsCreated: number;

  message: string;

  simulatedAt: string;
}

// ================================================================
// Detection Result
// ================================================================

export interface SimulationDetectionResult {
  isIncident: boolean;

  incident: Incident | null;

  confidence: number;

  signals: string[];
}

// ================================================================
// Final Simulation Response
// ================================================================

export interface SimulationResponse {
  success: boolean;

  logs: SimulationLogsResult;

  detection: SimulationDetectionResult;
}
