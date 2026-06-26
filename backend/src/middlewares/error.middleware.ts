// ================================================================================
// Error Handling Middleware - Global Error Handler
// ================================================================================

import { Request, Response } from 'express';
import logger from '../lib/logger.js';

// Custom error type for application errors
export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// ================================================================================
// Main Error Handler
// ================================================================================
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error with Winston
  logger.error('Application error', {
    error: err.name,

    message,

    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,

    message,

    // Development me stack bhi bhejo
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// ================================================================================
// 404 Not Found Handler
// ================================================================================
export const notFound = (_req: Request, res: Response): void => {
  logger.warn('Route not found - 404');

  res.status(404).json({
    success: false,

    message: 'Route not found',
  });
};
