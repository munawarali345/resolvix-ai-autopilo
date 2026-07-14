import { Router } from 'express';
import { apiRateLimit } from '../../middlewares/rate-limit.middleware.js';
import { getAgentStatusController } from '../../controllers/agentStatusController/agentStatus.controller.js';

const router: Router = Router();

// GET /api/agents/status
router.get('/status/:incidentId', apiRateLimit, getAgentStatusController);

export default router;
