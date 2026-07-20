//  Isme hum dashboard related events emit karenge.
// ================================================================
// DASHBOARD SOCKET EVENTS
// ================================================================
//
// Purpose:
// Dashboard realtime updates.
//
// Responsibilities:
// 1. Dashboard changes notify karna.
// 2. Frontend ko refresh trigger dena.
//
// ================================================================

import { getSocketServer } from './socket.server.js';

// ================================================================
// Emit Dashboard Update
// ================================================================
//
// Jab dashboard data change ho:
// - New incident
// - Incident resolved
//
// frontend ko notify karega.
//
// ================================================================

export const emitDashboardUpdate = () => {
  const io = getSocketServer();

  io.emit('dashboard:update');
};
