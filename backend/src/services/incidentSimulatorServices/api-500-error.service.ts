// ========================
// Api 500 error SIMULATION SERVICE
// ========================

import { LogModel } from '../../models/log.model.js';
import { Log as LogType } from '../../types/index.js';
import { SimulatorResponse } from '../../types/incident-simulator.types.js';

export const simulateAPI500ErrorService =
  async (): Promise<SimulatorResponse> => {
    try {
      // 1. Fake logs array
      const fakeLogs: LogType[] = [
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: '500 Internal Server Error', // First error
          timestamp: new Date(),
        },
        {
          service: 'user-service',
          level: 'ERROR',
          message: 'Dependency timeout: payment-service', // Cascading failure
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: '500 Internal Server Error',
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Error rate: 5.2%', // Threshold breached
          timestamp: new Date(),
        },
        {
          service: 'order-service',
          level: 'ERROR',
          message: 'Failed to connect: inventory-service', // Service dependency
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: '500 Internal Server Error',
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Circuit breaker opened', // Protective measure
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: '500 Internal Server Error',
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Error rate: 8.5% - CRITICAL', // Critical threshold
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Cascading failure detected',
          timestamp: new Date(),
        },
        {
          service: 'payment-service',
          level: 'ERROR',
          message: 'Service unavailable', // Dependent service down
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: '500 Internal Server Error',
          timestamp: new Date(),
        },
        {
          service: 'user-service',
          level: 'ERROR',
          message: 'Request timeout after 30s',
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'WARN',
          message: 'Fallback mechanism activated',
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: '500 Internal Server Error',
          timestamp: new Date(),
        },
        {
          service: 'monitoring',
          level: 'ERROR',
          message: 'Critical alert: High error rate',
          timestamp: new Date(),
        },
        {
          service: 'api-gateway',
          level: 'ERROR',
          message: '500 Internal Server Error',
          timestamp: new Date(),
        },
        {
          service: 'logging',
          level: 'ERROR',
          message: 'Error threshold breached: 8.5%',
          timestamp: new Date(),
        },
      ];

      // 2. Save karo
      const savedLogs = await LogModel.insertMany(fakeLogs);

      // 3. Response
      return {
        logsCreated: savedLogs.length, // 18 logs
        message: 'API 500 error scenario simulated. High error rate detected.',
        simulatedAt: new Date(),
        logs: savedLogs,
      };
    } catch (error: any) {
      throw new Error(`Api 500 Error simulation failed: ${error.message}`);
    }
  };
