// ================================================================
// GET AGENT STATUS CONTROLLER
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { getExecutionsByIncidentIdService } from '../../services/agentExecutionServices/getExecutionByIncidentId.service.js';

// ================================================================
// GET AGENT STATUS
// GET /api/agents/status/:incidentId
// ================================================================

export const getAgentStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------
    // STEP 1
    // Get incident id from params
    // ------------------------------------------------

    const incidentId = req.params.incidentId;

    // ------------------------------------------------
    // STEP 2
    // Validate incident id
    // ------------------------------------------------

    if (!incidentId) {
      res.status(400).json({
        success: false,

        message: 'Incident ID is required.',
      });

      return;
    }

    // ------------------------------------------------
    // STEP 3
    // Call service
    // ------------------------------------------------

    const agentStatus = await getExecutionsByIncidentIdService(incidentId);

    // ------------------------------------------------
    // STEP 4
    // Return response
    // ------------------------------------------------

    res.status(200).json({
      success: true,

      message: 'Agent status fetched successfully.',

      data: agentStatus,
    });
  } catch (error) {
    next(error);
  }
};
