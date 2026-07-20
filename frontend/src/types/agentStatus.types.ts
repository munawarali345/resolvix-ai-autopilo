// ================================================================
// AGENT STATUS TYPES
// ================================================================
//
// Purpose:
// Frontend Agent Status module types.
//
// Backend:
//
// GET /api/agents/status/:incidentId
//
// Used by:
// - Agent Status Service
// - React Query Hook
// - Agent Timeline UI
//
// ================================================================

// ================================================================
// AGENT NAME
// ================================================================

export type AgentName =
  | 'orchestrator'
  | 'detection'
  | 'log-analysis'
  | 'root-cause'
  | 'fix'
  | 'risk-validator'
  | 'executor'
  | 'reporter';

// ================================================================
// AGENT EXECUTION STATUS
// ================================================================

export type AgentExecutionStatus = 'running' | 'success' | 'failed';

// ================================================================
// AGENT STATUS
// ================================================================
//
// Backend map() exactly ye fields return karta hai.
//
// ================================================================

export interface AgentStatus {
  id: string;

  incidentId: string;

  agentName: AgentName;

  status: AgentExecutionStatus;

  executionTime: number;

  startedAt: Date;

  completedAt?: Date;

  error?: string;
}

// ================================================================
// AGENT STATUS RESPONSE
// ================================================================
//
// GET /api/agents/status/:incidentId
//
// Backend:
//
// [
//   {
//     agentName,
//     status,
//     executionTime,
//     startedAt,
//     completedAt,
//     error,
//   }
// ]
//
// ================================================================

export type AgentStatusResponse = AgentStatus[];
