// ========================
// DB FAILURE CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateDBFailureService } from '../../services/incidentSimulatorServices/index.js';

import { detectionService } from '../../services/agentsServices/detectionAgentService/detection.service.js';

// ========================
// Simulate DB Failure
// ========================
export const simulateDBFailureController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // STEP 1: db failue logs generated
    const result = await simulateDBFailureService();

    // ========================================================
    // STEP 2: Detection Service CALL (IMPORTANT ADDITION)
    // ========================================================
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
