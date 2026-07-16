
import { Router } from 'express';

import { apiRateLimit } from '../../middlewares/rate-limit.middleware.js';
import PaginationMiddleware from '../../middlewares/pagination.middleware.js';

import { getReportsController } from '../../controllers/reporterControllers/reports.controller.js';

import { getReportByIdController } from '../../controllers/reporterControllers/getReportById.controller.js';

const router: Router = Router();

// ================================================================
// GET ALL REPORTS
// GET /api/reports
// ================================================================

router.get(
  '/',
  apiRateLimit,
  PaginationMiddleware,
  getReportsController,
);

// ================================================================
// GET REPORT DETAILS
// GET /api/reports/:reportId
// ================================================================

router.get(
  '/:reportId',
  apiRateLimit,getReportByIdController
);

export default router;