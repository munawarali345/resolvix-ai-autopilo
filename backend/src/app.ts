// =====================================================
// APP.TS - Main Express Application Setup
// This file sets up the basic Express server structure
// =====================================================

import express, { Express } from 'express';
import cors from 'cors';

// Express app initialize
const app: Express = express();

// Middleware configuration
// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Basic health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Resolvix AI Backend is running' });
});

// Export app to be used in server.ts
export default app;
