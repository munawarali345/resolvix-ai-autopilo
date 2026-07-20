// ================================================================
// AGENT STATUS SOCKET PAYLOAD
// ================================================================
//
// Purpose:
// Frontend realtime timeline update.
//
// Ye database document nahi hai.
// Sirf socket event ke liye hai.
//
// ================================================================

import type { AgentName, AgentExecutionStatus } from './index.js';

export type AgentStatusEvent = {
  incidentId: string;

  agentName: AgentName;

  status: AgentExecutionStatus;

  executionTime: number;

  startedAt: Date;

  completedAt?: Date;

  error?: string;
};
