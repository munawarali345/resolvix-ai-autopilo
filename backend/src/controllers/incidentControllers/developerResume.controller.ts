// ================================================================
// DEVELOPER RESUME CONTROLLER
// ================================================================
//
// PATCH /api/workflow/:threadId/resume
//
// Purpose:
//
// 1. Read Thread Id
// 2. Call Developer Resume Service
// 3. Return response
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { developerResumeService } from '../../services/incidentServices/developerResume.service.js';

export const developerResumeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------
    // STEP 1
    // Read Thread Id
    // ------------------------------------------------

    const threadId = req.params.threadId;

    // ------------------------------------------------
    // STEP 2
    // Resume Workflow
    // ------------------------------------------------

    await developerResumeService(threadId);

    // ------------------------------------------------
    // STEP 3
    // Response
    // ------------------------------------------------

    res.status(200).json({
      success: true,

      message: 'Workflow resumed successfully.',
    });
  } catch (error) {
    next(error);
  }
};
