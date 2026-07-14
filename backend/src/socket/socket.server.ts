// ================================================================
// SOCKET SERVER
// ================================================================
//
// Purpose:
// Central Socket.IO instance.
//
// Used by:
//
// - Notification Provider
// - Dashboard
//
// ================================================================

import { Server } from 'socket.io';

let io: Server | null = null;

// ================================================================
// SET SOCKET INSTANCE
// ================================================================
export function setSocketServer(socketServer: Server): void {
  io = socketServer;
}

// ================================================================
// GET SOCKET INSTANCE
// ================================================================
export function getSocketServer(): Server {
  if (!io) {
    throw new Error('Socket.IO has not been initialized.');
  }

  return io;
}
