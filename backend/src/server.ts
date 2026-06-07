/**
 * Resolvix AI Backend Server Entry Point
 */

import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js"; // or correct path

// server listening port
const Port = process.env.PORT || 5000;

// =====================================================
// START SERVER FUNCTION
// =====================================================
const startServer = async () => {
  try {
    // Step 1: Connect Database FIRST
    await connectDB();

    // Step 2: Start Express server AFTER DB connection
    app.listen(Port, () => {
      console.log(`server is Running on Port ${Port}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Run server
startServer();