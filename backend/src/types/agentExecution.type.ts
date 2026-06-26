// src/types/agentExecution.types.ts
// ========================
// Agent Execution Type Definition
// ========================

// Agent names - kaun se agents hain system mein
export type AgentName =
  | 'orchestrator' // ← Main coordinator - saari agents ko manage karta hai
  | 'detection' // ← Incident detect karta hai (monitoring se alerts)
  | 'log-analysis' // ← Logs parse karta hai - error messages nikalta hai
  | 'root-cause' // ← Root cause find karta hai - KYA problem tha
  | 'fix' // ← Fix recommend karta hai - KAISE solve kare
  | 'risk-validator' // ← Risk check karta hai - ye fix safe hai?
  | 'executor' // ← Fix apply karta hai - production mein deploy
  | 'reporter'; // ← Report generate karta hai - final summary

// Agent execution status
export type AgentExecutionStatus = 'running' | 'success' | 'failed';

// Agent execution type
export type AgentExecution = {
  _id?: string;

  // Kis incident ke liye execution hua
  incidentId: string;

  // Kaunsa agent chala
  agentName: AgentName;

  // running | success | failed
  status: AgentExecutionStatus;

  // Agent ko kya input mila
  input: Record<string, unknown>;

  // Agent ka output
  output?: Record<string, unknown>;

  // Error message agar fail hua
  error?: string;

  // Milliseconds
  executionTime: number;

  // Timing fields
  startedAt: Date;

  completedAt?: Date;

  // Mongoose timestamps
  createdAt?: Date;

  updatedAt?: Date;
};
