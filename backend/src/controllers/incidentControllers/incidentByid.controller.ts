// ================================================================
// GET INCIDENT DETAILS CONTROLLER
// ================================================================
//
// Purpose:
//
// Returns complete details of a single incident.
//
// Flow:
//
// 1. Read incident id
// 2. Call service
// 3. If incident not found return 404
// 4. Return success response
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { getIncidentDetailsService } from '../../services/incidentServices/getIncidentById.service.js';

// ================================================================
// GET INCIDENT DETAILS
// GET /api/incidents/:incidentId
// ================================================================

export const getIncidentByIdController = async (
  req: Request,

  res: Response,

  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------
    // STEP 1
    // Read incident id
    // ------------------------------------------------

    const incidentId = req.params.incidentId;

    // ------------------------------------------------
    // STEP 2
    // Call service
    // ------------------------------------------------

    const incident = await getIncidentDetailsService(incidentId);

    // ------------------------------------------------
    // STEP 3
    // Incident not found
    // ------------------------------------------------

    if (!incident) {
      res.status(404).json({
        success: false,

        message: 'Incident not found.',
      });

      return;
    }

    // ------------------------------------------------
    // STEP 4
    // Return response
    // ------------------------------------------------

    res.status(200).json({
      success: true,

      message: 'Incident details fetched successfully.',

      data: incident,
    });
  } catch (error) {
    next(error);
  }
};
