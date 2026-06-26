// ========================
// deployment failure SIMULATION SERVICE
// ========================

import { LogModel } from '../../models/log.model.js';
import { Log as LogType } from '../../types/index.js';
import { SimulatorResponse } from '../../types/incident-simulator.types.js';

export const simulateDeploymentFailureService =
  async (): Promise<SimulatorResponse> => {
    try {
      // 1. Fake logs array
      const fakeLogs: LogType[] = [
        {
          service: 'deployment',
          level: 'INFO',
          message: 'Deployment started: v2.5.0', // Deployment begins
          timestamp: new Date(),
        },

        {
          service: 'deployment',
          level: 'INFO',
          message: 'Rolling out 25% of traffic', // Canary deployment
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Error in critical path: null pointer', // Code error
          timestamp: new Date(),
        },

        {
          service: 'database',
          level: 'ERROR',
          message: 'Database migration failed', // DB schema issue
          timestamp: new Date(),
        },

        {
          service: 'deployment',
          level: 'WARN',
          message: 'Errors detected in new version',
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Breaking API change detected', // Incompatibility
          timestamp: new Date(),
        },

        {
          service: 'api-gateway',
          level: 'ERROR',
          message: 'Client receiving 400 errors',
          timestamp: new Date(),
        },

        {
          service: 'deployment',
          level: 'INFO',
          message: 'Rollback initiated', // Auto rollback
          timestamp: new Date(),
        },

        {
          service: 'deployment',
          level: 'INFO',
          message: 'Rolling back to v2.4.5', // Previous version
          timestamp: new Date(),
        },

        {
          service: 'deployment',
          level: 'ERROR',
          message: 'Health check failed during rollback',
          timestamp: new Date(),
        },

        {
          service: 'deployment',
          level: 'WARN',
          message: 'Manual intervention required', // Alert
          timestamp: new Date(),
        },

        {
          service: 'monitoring',
          level: 'ERROR',
          message: 'Critical alert: Deployment failure',
          timestamp: new Date(),
        },

        {
          service: 'logging',
          level: 'ERROR',
          message: 'Deployment v2.5.0 failed - rollback completed',
          timestamp: new Date(),
        },
      ];

      // 2. Save karo
      const savedLogs = await LogModel.insertMany(fakeLogs);

      // 3. Response
      return {
        logsCreated: savedLogs.length, // 14 logs
        message:
          'Deployment failure scenario simulated. Bad deployment detected.',
        simulatedAt: new Date(),
      };
    } catch (error: any) {
      throw new Error(`deployment failure Simulation failed: ${error.message}`);
    }
  };
