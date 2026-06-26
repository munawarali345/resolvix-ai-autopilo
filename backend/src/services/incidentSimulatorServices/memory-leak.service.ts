// ========================
// Memory Leak SIMULATION SERVICE
// ========================

import { LogModel } from '../../models/log.model.js';
import { Log as LogType } from '../../types/index.js';
import { SimulatorResponse } from '../../types/incident-simulator.types.js';

export const simulateMemoryLeakService =
  async (): Promise<SimulatorResponse> => {
    try {
      // 1. Fake logs array
      const fakeLogs: LogType[] = [
        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Memory usage: 65%', // Starting level
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Memory usage: 72%', // Increasing
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Memory usage: 81%',
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Memory usage: 92% - CRITICAL', // Critical level
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'GC overhead limit exceeded', // Garbage collection issue
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Heap size increasing: 512MB → 768MB', // Heap growing
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'OutOfMemoryError in cache layer', // Memory error
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Active sessions: 5432', // Many sessions
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Cache not being cleaned properly', // Root cause hint
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Memory pressure detected',
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Service becoming unresponsive', // Impact
          timestamp: new Date(),
        },

        {
          service: 'monitoring',
          level: 'ERROR',
          message: 'Critical alert: Memory exhaustion',
          timestamp: new Date(),
        },
      ];

      // 2. Save karo
      const savedLogs = await LogModel.insertMany(fakeLogs);

      // 3. Response return karo
      return {
        logsCreated: savedLogs.length, // 12 logs
        message: 'Memory leak scenario simulated. Logs created for analysis.',
        simulatedAt: new Date(),
      };
    } catch (error: any) {
      throw new Error(`Memory Leak Simulation failed: ${error.message}`);
    }
  };
