/**
 * Resolvix AI Backend Server Entry Point
 * Express.js server for incident response API
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors()); // Enable CORS for frontend access
app.use(express.json()); // Parse JSON request bodies

// Basic health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Resolvix AI Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
