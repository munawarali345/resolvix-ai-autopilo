// =====================================================
// APP.TS - Main Express Application Setup
// =====================================================

import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/error.middleware.js';
import { authRoutes, incidentSimulationRoutes } from './routes/index.js';

const app: Express = express();

// Middleware configuration
app.use(
  cors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Resolvix AI Backend is running' });
});

// Routes
app.use('/api/auth', authRoutes); // auth routes

app.use('/api/simulate', incidentSimulationRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
