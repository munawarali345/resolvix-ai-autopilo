// ================================================================
// AGENT STATUS SOCKET LISTENER
// ================================================================
//
// Purpose:
//
// Agent execution realtime updates listen karna.
//
// Responsibilities:
//
// 1. agent-status:update event listen karna.
// 2. Zustand Agent Status Store update karna.
//
// Flow:
//
// Backend
//      ↓
// agent-status:update
//      ↓
// Agent Status Listener
//      ↓
// Agent Status Store
//      ↓
// Agent Timeline UI
//
// ================================================================

'use client';

import { socket } from '../socketClient/socket';

import { useAgentStatusStore } from '@/stores/agents.store';

import type { AgentStatus } from '@/types/agentStatus.types';

// ================================================================
// REGISTER AGENT STATUS LISTENER
// ================================================================

export const registerAgentStatusListener = () => {
  socket.on(
    'agent-status:update',

    (agentStatus: AgentStatus) => {
      useAgentStatusStore

        .getState()

        .addAgent(agentStatus);
    },
  );
};

// ================================================================
// REMOVE AGENT STATUS LISTENER
// ================================================================

export const removeAgentStatusListener = () => {
  socket.off('agent-status:update');
};
