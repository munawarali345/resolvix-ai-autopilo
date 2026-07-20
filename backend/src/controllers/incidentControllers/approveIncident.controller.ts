// ================================================================
// APPROVE INCIDENT CONTROLLER
// ================================================================
//
// PATCH /api/incidents/:incidentId/approve
//
// Purpose:
//
// 1. Read Incident ID
// 2. Call approval service
// 3. Return response
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { approveIncidentService } from '../../services/incidentServices/approveIncident.service.js';

export const approveIncidentController = async (
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

    await approveIncidentService(incidentId);

    // ------------------------------------------------
    // STEP 3
    // Response
    // ------------------------------------------------

    res.status(200).json({
      success: true,

      message: 'Incident approved successfully.',
    });
  } catch (error) {
    next(error);
  }
};
