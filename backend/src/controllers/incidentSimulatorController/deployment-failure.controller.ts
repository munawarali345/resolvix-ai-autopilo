// ========================
// DEPLOYMENT FAILURE CONTROLLER
// ========================

import { Request, Response, NextFunction } from 'express';

import { simulateDeploymentFailureService } from '../../services/incidentSimulatorServices/index.js';

// ========================
// Simulate deployment failure
// ========================
export const simulateDeploymentFailureController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await simulateDeploymentFailureService();

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error) {
    next(error);
  }
};
