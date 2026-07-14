// ========================
// cpu spike SIMULATION SERVICE
// ========================

import { LogModel } from '../../models/log.model.js';
import { Log as LogType } from '../../types/index.js';
import { SimulatorResponse } from '../../types/incident-simulator.types.js';

export const simulateCPUSpikeService = async (): Promise<SimulatorResponse> => {
  try {
    // 1. Fake logs array
    const fakeLogs: LogType[] = [
      {
        service: 'system',
        level: 'WARN',
        message: 'CPU usage: 45%', // Normal
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'WARN',
        message: 'CPU usage: 65%', // Rising
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'WARN',
        message: 'CPU usage: 75%',
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'ERROR',
        message: 'CPU usage: 85% - CRITICAL', // Critical
        timestamp: new Date(),
      },

      {
        service: 'analytics-engine',
        level: 'WARN',
        message: 'Heavy query detected', // Source of spike
        timestamp: new Date(),
      },

      {
        service: 'analytics-engine',
        level: 'WARN',
        message: 'Query execution time: 45s (expected: 2s)', // Slow query
        timestamp: new Date(),
      },

      {
        service: 'api-gateway',
        level: 'ERROR',
        message: 'Response time degraded: 8500ms', // Impact on performance
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'ERROR',
        message: 'CPU usage sustained at 82%',
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'WARN',
        message: 'Active queries: 234', // High concurrency
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'ERROR',
        message: 'Inefficient loop detected', // Code issue
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'ERROR',
        message: 'Service becoming unresponsive',
        timestamp: new Date(),
      },

      {
        service: 'cache',
        level: 'WARN',
        message: 'Cache miss rate: 45%',
        timestamp: new Date(),
      },

      {
        service: 'api-gateway',
        level: 'ERROR',
        message: 'Request queue building up',
        timestamp: new Date(),
      },

      {
        service: 'system',
        level: 'WARN',
        message: 'Thread count: 256', // High threads
        timestamp: new Date(),
      },

      {
        service: 'monitoring',
        level: 'ERROR',
        message: 'Critical alert: High CPU usage',
        timestamp: new Date(),
      },

      {
        service: 'logging',
        level: 'ERROR',
        message: 'CPU spike detected: sustained at 85%',
        timestamp: new Date(),
      },
    ];

    // 2. Save karo
    const savedLogs = await LogModel.insertMany(fakeLogs);

    // 3. Response
    return {
      logsCreated: savedLogs.length, // 16 logs
      message: 'CPU spike scenario simulated. High CPU usage detected.',
      simulatedAt: new Date(),
      logs: savedLogs,
    };
  } catch (error: any) {
    throw new Error(`Cpu Spike Simulation failed: ${error.message}`);
  }
};
