// ========================
// MEMORY LEAK CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateMemoryLeakService } from '../../services/incidentSimulatorServices/index.js';

import { detectionService } from '../../services/agentsServices/detectionAgentService/detection.service.js';

// ========================
// Simulate Memory Leak
// ========================
export const simulateMemoryLeakController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await simulateMemoryLeakService();

    const detectionResult = await detectionService(result.logs);

    res.status(200).json({
      success: true,
      logs: result,
      detection: detectionResult,
    });
  } catch (error) {
    next(error);
  }
};
