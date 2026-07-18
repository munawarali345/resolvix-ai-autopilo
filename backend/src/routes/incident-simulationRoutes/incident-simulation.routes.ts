// ========================
// INCIDENT SIMULATOR ROUTES
// ========================

import { Router } from 'express';

// Controllers import
import {
  simulateDBFailureController,
  simulateMemoryLeakController,
  simulateApi500ErrorController,
  simulateDeploymentFailureController,
  simulateCpuSpikeController,
} from '../../controllers/incidentSimulatorController/index.js';

import { apiRateLimit } from '../../middlewares/rate-limit.middleware.js';

const router: Router = Router();

// ========================
// SCENARIO ROUTES
// ========================

// DB Failure simulation
router.post('/db-failure', apiRateLimit, simulateDBFailureController);

// Memory leak simulation
router.post('/memory-leak', apiRateLimit, simulateMemoryLeakController);

// API 500 error simulation
router.post('/api-500-error', apiRateLimit, simulateApi500ErrorController);

// Deployment failure simulation
router.post('/deployment-failure',apiRateLimit,simulateDeploymentFailureController,
);

// CPU spike simulation
router.post('/cpu-spike', apiRateLimit, simulateCpuSpikeController);

export default router;
