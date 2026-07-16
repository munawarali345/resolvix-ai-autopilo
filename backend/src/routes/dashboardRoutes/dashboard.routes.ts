import { Router } from 'express';
import { apiRateLimit } from '../../middlewares/rate-limit.middleware.js';
// import { getDashboardOverviewController } from "../controllers/dashboard.controller.js";

const router: Router = Router();

// GET /api/dashboard/overview
router.get('/overview', apiRateLimit);

export default router;
