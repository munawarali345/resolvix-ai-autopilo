// ========================
// MEMORY LEAK CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateAPI500ErrorService } from '../../services/incidentSimulatorServices/index.js';

import { detectionService } from '../../services/agentsServices/detectionAgentService/detection.service.js';

// ========================
// Simulate Api 500 Error
// ========================
export const simulateApi500ErrorController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await simulateAPI500ErrorService();

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
