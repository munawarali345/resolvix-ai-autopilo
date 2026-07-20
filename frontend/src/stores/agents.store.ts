// ================================================================
// AGENT STATUS STORE
// ================================================================
//
// Purpose:
// Socket se aane wale live agent execution updates store karna.
//
// Used by:
// Socket Listener + Agent Timeline UI
//
// ================================================================

import { create } from 'zustand';

import type { AgentStatus } from '@/types/agentStatus.types';

// ================================================================
// STORE TYPE
// ================================================================

interface AgentStatusStore {
  // Current incident ke agent executions

  agents: AgentStatus[];

  // Initial data set karna

  setAgents: (agents: AgentStatus[]) => void;

  // Socket se naya update add karna

  addAgent: (agent: AgentStatus) => void;

  // Store clear karna

  clearAgents: () => void;
}

// ================================================================
// ZUSTAND STORE
// ================================================================

export const useAgentStatusStore = create<AgentStatusStore>((set) => ({
  // Initial empty state

  agents: [],

  // React Query data store karna

  setAgents: (agents) =>
    set({
      agents,
    }),

  // Socket event par new agent add hoga

  addAgent: (agent) =>
    set((state) => ({
      agents: [...state.agents, agent],
    })),

  // Incident change par reset

  clearAgents: () =>
    set({
      agents: [],
    }),
}));
