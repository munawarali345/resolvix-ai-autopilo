/**
 * Resolvix AI Backend Server Entry Point
 */

import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initializeWorkflow } from "./langGraph/graph/workflow.graph.js";

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

    // Step 3: Start Express server AFTER DB connection
    app.listen(Port, () => {

      console.log(`server is Running on Port ${Port}`);

    });

  } catch (error) {

    console.error('Failed to start server:', error);

    process.exit(1);

  }

};

// Run server
startServer();
