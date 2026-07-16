
// ================================================================
// DASHBOARD OVERVIEW CONTROLLER
// ================================================================
//
// Purpose:
//
// Dashboard overview API.
//
// Responsibilities:
//
// 1. Call dashboard overview service
// 2. Return success response
// 3. Pass errors to global error middleware
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { dashboardOverviewService } from '../../services/dashboardServices/dashboardOverview.service.js';

// ================================================================
// Dashboard Overview Controller
// ================================================================

export const dashboardOverviewController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {
    // ------------------------------------------------
    // STEP 1
    // Fetch dashboard overview
    // ------------------------------------------------

    const dashboard = await dashboardOverviewService();

    // ------------------------------------------------
    // STEP 2
    // Return response
    // ------------------------------------------------

    res.status(200).json({
      success: true,
      message: 'Dashboard overview fetched successfully.',
      data: dashboard,
    });

  } catch (error) {

    next(error);
    
  }

};