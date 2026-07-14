/**
 * Resolvix AI Backend Server Entry Point
 */

import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initializeWorkflow } from './langGraph/graph/workflow.graph.js';

import { createHttpServer } from './socket/socket.config.js';

// server listening port
const Port = process.env.PORT || 5000;

// =====================================================
// START SERVER FUNCTION
// =====================================================
const startServer = async () => {
  try {
    // Step 1: Connect Database
    await connectDB();

    // Step 2: Initialize LangGraph
    await initializeWorkflow();

    // Step 3: create server
    const httpServer = createHttpServer(app);

    // Step 4: Start server AFTER create server
    httpServer.listen(Port, () => {
      console.log(`Server is running on Port ${Port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);

    process.exit(1);
  }
};

// Run server
startServer();

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

// Express ignore to nahi hogi?

// Bilkul nahi.

// Actually

// HTTP Server

// ek hi hota hai.

// Uske andar

//              HTTP SERVER
//                   │
//       ┌───────────┴────────────┐
//       │                        │
//  REST Requests            WebSocket
//       │                        │
//       ▼                        ▼
//  Express                  Socket.IO

// REST request

// GET /api/dashboard

// Express handle karega.

// Socket request

// io.connect(...)

// Socket.IO handle karega.

// Ek dusre ko touch bhi nahi karte.
