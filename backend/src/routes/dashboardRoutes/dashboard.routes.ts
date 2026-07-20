import { Router } from 'express';
import { apiRateLimit } from '../../middlewares/rate-limit.middleware.js';
import { dashboardOverviewController } from '../../controllers/dashboardOverview/dashboardOverview.controller.js';

const router: Router = Router();

// GET /api/dashboard/overview
router.get('/overview', apiRateLimit, dashboardOverviewController);

export default router;
