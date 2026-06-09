// ================================================================
// MongoDB Rate Limiting Middleware
// ================================================================

import { Request, Response, NextFunction } from "express";
import { RateLimiterMongo } from "rate-limiter-flexible";
import logger from "../lib/logger.js";
import { env } from "../config/validateEnv.js";
import {
  strictRateLimiter,
  standardRateLimiter,
  lenientRateLimiter,
} from "../config/rateLimiter.js";

// ================================================================
// Generic Rate Limit Handler
// ================================================================
const createRateLimiter = (getLimiter: () => RateLimiterMongo | null) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    // Skip rate limiting in development
    if (env.NODE_ENV !== "production") {
      next();
      return;
    }

    try {
      const limiter = getLimiter();

      if (!limiter) {
        next();
        return;
      }

      await limiter.consume(req.ip || "unknown", 1);

      next();

    } catch {

      logger.warn("Rate limit exceeded", { ip: req.ip });

      res.status(429).json({

        success: false,
        
        message: "Too many requests. Please try again later.",

      });
    }
  };
};


// ================================================================
// Export Ready-to-use Middlewares
// ================================================================

export const authRateLimit =
  createRateLimiter(() => strictRateLimiter);

export const apiRateLimit =
  createRateLimiter(() => standardRateLimiter);

export const publicRateLimit =
  createRateLimiter(() => lenientRateLimiter);