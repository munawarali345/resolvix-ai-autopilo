// ================================
// Authentication Routes
// ================================

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authRateLimit, apiRateLimit } from "../middlewares/rate-limit.middleware.js";

const router: Router = Router();

// POST /api/auth/register - Strict rate limit
router.post("/register", authRateLimit, authController.register);

// POST /api/auth/login - Strict rate limit
router.post("/login", authRateLimit, authController.login);

// POST /api/auth/refresh - Standard rate limit
router.post("/refresh", apiRateLimit, authController.refresh);

// POST /api/auth/logout - Standard rate limit
router.post("/logout", apiRateLimit, authController.logout);

export default router;
