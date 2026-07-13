// ========================
// MEMORY LEAK CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateCPUSpikeService } from '../../services/incidentSimulatorServices/index.js';

import { detectionService } from '../../services/agentsServices/detectionAgentService/detection.service.js';

// ========================
// Simulate cpu spike
// ========================
export const simulateCpuSpikeController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await simulateCPUSpikeService();

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
