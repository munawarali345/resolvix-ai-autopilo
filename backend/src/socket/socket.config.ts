// ================================================================
// SOCKET CONFIGURATION
// ================================================================
//
// Purpose:
// Creates the HTTP server,
// initializes Socket.IO,
// stores the Socket.IO instance,
// and returns the HTTP server.
//
// ================================================================
import { createServer } from 'node:http'; // Ye Node.js ka native HTTP server hai.

import { Server } from 'socket.io'; // Ye Socket.IO server class hai.

import { Express } from 'express';

import { setSocketServer } from './socket.server.js';

// ================================================================
// CREATE HTTP SERVER
// ================================================================
export function createHttpServer(app: Express) {
  // Create HTTP Server
  // REST bhi isi se chalegi or Socket b
  const httpServer = createServer(app);

  // Initialize Socket.IO
  // Socket.IO ko isi HTTP Server ke upar mount kar do
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',

      credentials: true,
    },
  });

  // Store global socket instance
  // iske bad hum kahi b emitNotification(...) ker sakte he
  setSocketServer(io);

  // Connection events ye callback he
  io.on('connection', (socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket Disconnected: ${socket.id}`);
    });
  });

  return httpServer;
}

// server.ts
//       │
//       ▼
// createHttpServer(app)
//       │
//       ├── Express App ko HTTP Server me wrap karta hai
//       │
//       ├── Socket.IO us HTTP Server ke upar attach hota hai
//       │
//       ├── io instance globally save hota hai
//       │
//       └── HTTP Server wapas return hota hai
//                   │
//                   ▼
//          httpServer.listen(PORT)

//  then

// Frontend
//       │
//       ├── REST API
//       │       │
//       │       ▼
//       │   Express Routes
//       │
//       └── WebSocket
//               │
//               ▼
//           Socket.IO

// the both running on sam port

// CORS

// Tumne poocha

// app.ts me bhi cors hai phir yaha kyun?

// Because

// Express aur Socket do alag middleware systems hain.

// Express wala sirf

// REST Request

// ke liye.

// Example

// GET /api/incidents

// Socket wala

// ws://localhost

// connection ke liye.

// Browser websocket connect karte waqt bhi origin check karta hai.

// Isliye

// Socket.IO ko bhi alag cors chahiye.

// Ye Express wala reuse nahi hota.
