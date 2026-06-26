// ========================
// MEMORY LEAK CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateAPI500ErrorService } from '../../services/incidentSimulatorServices/index.js';

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

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error) {
    next(error);
  }
};
