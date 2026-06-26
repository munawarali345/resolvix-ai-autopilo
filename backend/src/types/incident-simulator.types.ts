// src/types/incident-simulator.types.ts
// ========================
// Incident Simulator Types
// ========================
import { Log } from '../types/log.type.js';

// Scenario enum - kaun si scenario trigger karna hai
export type IncidentScenario =
  | 'db-failure' // Database connection pool exhausted
  | 'memory-leak' // High memory usage
  | 'api-500-error' // High error rate in API
  | 'deployment-failure' // Bad code deployment
  | 'cpu-spike'; // High CPU usage

// Request type - admin request
export type SimulatorRequest = {
  scenario: IncidentScenario; // Kaunsi scenario trigger karo
};

// Response type - simulator response
export type SimulatorResponse = {
  logs: Log[];
  logsCreated: number; // Kitne logs banaye
  message: string; // Message
  simulatedAt: Date; // Kab simulate kiya
};
