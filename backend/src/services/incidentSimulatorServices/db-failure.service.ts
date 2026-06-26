// ========================
// DB FAILURE SIMULATION SERVICE
// ========================

import { LogModel } from '../../models/log.model.js';
import { Log as LogType } from '../../types/index.js';
import { SimulatorResponse } from '../../types/incident-simulator.types.js';

// ========================
// DB FAILURE SIMULATION
// ========================
export const simulateDBFailureService =
  async (): Promise<SimulatorResponse> => {
    try {
      // 1. Fake logs array banao - DB failure ke liye
      const fakeLogs: LogType[] = [
        {
          service: 'database', // Kaunsi service
          level: 'ERROR', // Log level
          message: 'Connection timeout after 30s', // Error message
          timestamp: new Date(), // Current time
        },

        {
          service: 'database',
          level: 'ERROR',
          message: 'Pool exhausted: 50/50 connections', // All connections busy
          timestamp: new Date(),
        },

        {
          service: 'user-service', // Different service affected
          level: 'ERROR',
          message: 'Failed to connect to database',
          timestamp: new Date(),
        },

        {
          service: 'order-service',
          level: 'ERROR',
          message: 'Database connection unavailable',
          timestamp: new Date(),
        },

        {
          service: 'database',
          level: 'ERROR',
          message: 'Error: ECONNREFUSED', // Connection refused
          timestamp: new Date(),
        },

        {
          service: 'payment-service',
          level: 'ERROR',
          message: 'Unable to query user data',
          timestamp: new Date(),
        },

        {
          service: 'database',
          level: 'WARN',
          message: 'Requests queued: 234', // Waiting requests
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Response timeout after 45s',
          timestamp: new Date(),
        },

        {
          service: 'database',
          level: 'ERROR',
          message: 'Query execution failed: timeout',
          timestamp: new Date(),
        },

        {
          service: 'authentication',
          level: 'ERROR',
          message: 'Auth service unable to validate tokens',
          timestamp: new Date(),
        },

        {
          service: 'database',
          level: 'ERROR',
          message: 'Connection reset by peer',
          timestamp: new Date(),
        },

        {
          service: 'health-check',
          level: 'WARN',
          message: 'Health check failed: database down',
          timestamp: new Date(),
        },

        {
          service: 'database',
          level: 'ERROR',
          message: 'Max connection pool size reached',
          timestamp: new Date(),
        },

        {
          service: 'monitoring',
          level: 'ERROR',
          message: 'Critical alert: Database unavailable',
          timestamp: new Date(),
        },
      ];

      const savedLogs = await LogModel.insertMany(fakeLogs);

      return {
        logs: savedLogs,
        logsCreated: savedLogs.length,
        message: 'DB failure scenario simulated successfully',
        simulatedAt: new Date(),
      };
    } catch (error: any) {
      throw new Error(`DB Failure simulation failed: ${error.message}`);
    }
  };
