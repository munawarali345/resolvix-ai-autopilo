
// ================================================================
// GET REPORTS CONTROLLER
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { getReportsService } from '../../services/reportServices/getReports.service.js';

// ================================================================
// GET ALL REPORTS
// GET /api/reports
// ================================================================

export const getReportsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {

  try {

    // ------------------------------------------------
    // STEP 1
    // Get pagination from middleware
    // ------------------------------------------------

    const pagination = req.pagination;

    // ------------------------------------------------
    // STEP 2
    // Service call
    // ------------------------------------------------

    const reports = await getReportsService(pagination);

    // ------------------------------------------------
    // STEP 3
    // Send response
    // ------------------------------------------------

    res.status(200).json({

      success: true,

      message: 'Reports fetched successfully.',

      data: reports,

    });

  } catch (error) {

    next(error);

  }

};