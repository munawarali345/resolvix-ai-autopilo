import { Router } from 'express';
import { apiRateLimit } from '../middlewares/rate-limit.middleware.js';

// import {
//   getIncidentsController,
//   getIncidentByIdController,
//   approveIncidentController,
// } from "../controllers/incident.controller.js";

const router: Router = Router();

// GET /api/incidents
router.get('/', apiRateLimit);

// GET /api/incidents/:id
router.get('/:id', apiRateLimit);

// PATCH /api/incidents/:id/approve
router.patch('/:id/approve', apiRateLimit);

export default router;
