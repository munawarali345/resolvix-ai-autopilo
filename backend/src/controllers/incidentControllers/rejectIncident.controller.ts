// ================================================================
// REJECT INCIDENT CONTROLLER
// ================================================================
//
// PATCH /api/incidents/:incidentId/reject
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { rejectIncidentService } from '../../services/incidentServices/rejectIncident.service.js';

export const rejectIncidentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------
    // STEP 1
    // Read Incident Id
    // ------------------------------------------------

    const incidentId = req.params.incidentId;

    // ------------------------------------------------
    // STEP 2
    // Call Service
    // ------------------------------------------------

    await rejectIncidentService(incidentId);

    // ------------------------------------------------
    // STEP 3
    // Response
    // ------------------------------------------------

    res.status(200).json({
      success: true,

      message: 'Incident rejected successfully.',
    });
  } catch (error) {
    next(error);
  }
};
