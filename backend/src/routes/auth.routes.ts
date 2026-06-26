// ================================
// Authentication Routes
// ================================

import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import {
  authRateLimit,
  apiRateLimit,
} from '../middlewares/rate-limit.middleware.js';

const router: Router = Router();

// POST /api/auth/register - Strict rate limit
router.post('/register', authRateLimit, authController.register);

// POST /api/auth/login - Strict rate limit
router.post('/login', authRateLimit, authController.login);

// POST /api/auth/refresh - Standard rate limit
router.post('/refresh', apiRateLimit, authController.refresh);

// POST /api/auth/logout - Standard rate limit
router.post('/logout', apiRateLimit, authController.logout);

// GET /api/auth/verify-email?token=...
// verification route hamehsa GET huta he
router.get('/verify-email', apiRateLimit, authController.verifyEmail);

// POST /api/auth/forgot-password - Strict rate limit
router.post('/forgot-password', authRateLimit, authController.forgotPassword);

// POST /api/auth/reset-password - Strict rate limit
router.post('/reset-password', authRateLimit, authController.resetPassword);

export default router;
