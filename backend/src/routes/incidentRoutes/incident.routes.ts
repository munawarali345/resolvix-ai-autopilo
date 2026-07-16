
import { Router } from 'express';
import { apiRateLimit } from '../../middlewares/rate-limit.middleware.js';
import PaginationMiddleware from '../../middlewares/pagination.middleware.js';
import { getIncidentsController, getIncidentByIdController } from '../../controllers/index.js';

// ================================================================
// GET ALL INCIDENTS
// GET /api/incidents
//
// Middleware:
// Pagination calculate karegi
//
// Controller:
// Request handle karega
//
// Service:
// Database se incidents layegi
// ================================================================

const router: Router = Router();

// GET /api/incidents
router.get('/',  apiRateLimit, PaginationMiddleware, getIncidentsController);

// GET /api/incidents/:id
router.get('/:incidentId', apiRateLimit, getIncidentByIdController);

// PATCH /api/incidents/:id/approve
router.patch('/:incidentId/approve', apiRateLimit);

// PATCH /api/incidents/:id/reject
router.patch('/:incidentId/reject', apiRateLimit);

export default router;
