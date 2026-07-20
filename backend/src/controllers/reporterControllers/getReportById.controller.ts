// ================================================================
// GET REPORT DETAILS CONTROLLER
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { getReportByIdService } from '../../services/reportServices/getReportById.service.js';

// ================================================================
// GET REPORT DETAILS
// GET /api/reports/:reportId
// ================================================================

export const getReportByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------
    // STEP 1
    // Get report id from route params
    // ------------------------------------------------

    const reportId = req.params.reportId;

    // ------------------------------------------------
    // STEP 2
    // Service call
    // ------------------------------------------------

    const report = await getReportByIdService(reportId);

    // ------------------------------------------------
    // STEP 3
    // Report not found
    // ------------------------------------------------

    if (!report) {
      res.status(404).json({
        success: false,

        message: 'Report not found.',
      });

      return;
    }

    // ------------------------------------------------
    // STEP 4
    // Success response
    // ------------------------------------------------

    res.status(200).json({
      success: true,

      message: 'Report fetched successfully.',

      data: report,
    });
  } catch (error) {
    next(error);
  }
};

export default getReportByIdController;
