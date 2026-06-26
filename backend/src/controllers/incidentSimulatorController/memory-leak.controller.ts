// ========================
// MEMORY LEAK CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateMemoryLeakService } from '../../services/incidentSimulatorServices/index.js';

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

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error) {
    next(error);
  }
};
