// ================================================================
// AGENT STATUS SOCKET EVENTS
// ================================================================
//
// Purpose:
// Agent execution realtime updates.
//
// Responsibilities:
// 1. Frontend ko agent execution changes notify karna.
// 2. Specific incident ki agent timeline refresh trigger karna.
//
// ================================================================

import { getSocketServer } from './socket.server.js';

import type { AgentStatusEvent } from '../types/agentStatusEvent.type.js';

// ================================================================
// Emit Agent Status Update
// ================================================================
//
// Jab agent execution change ho:
//
// - Agent started
// - Agent completed
// - Agent failed
//
// Frontend ko notify karega.
//
// ================================================================

export const emitAgentStatusUpdate = (data: AgentStatusEvent) => {
  const io = getSocketServer();

  io.emit('agent-status:update', data);
};

// socket ko agentName, incidentId, status ye sab kyun de rahe hain?
// Reason ye hai ke frontend ko pata hona chahiye kis incident ka kaunsa agent update hua hai.
