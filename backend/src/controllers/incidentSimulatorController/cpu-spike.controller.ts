// ========================
// MEMORY LEAK CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateCPUSpikeService } from '../../services/incidentSimulatorServices/index.js';

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

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error) {
    next(error);
  }
};
