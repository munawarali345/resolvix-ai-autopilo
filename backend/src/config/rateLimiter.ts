
// ================================================================
// MongoDB Rate Limiter Configuration
// ================================================================
// Purpose: Protect APIs from abuse using MongoDB storage
// Library: rate-limiter-flexible

import { Connection } from "mongoose";
import { RateLimiterMongo } from "rate-limiter-flexible";

// ================================================================
// Rate Limiter Instances
// ================================================================

export let strictRateLimiter: RateLimiterMongo | null = null;

export let standardRateLimiter: RateLimiterMongo | null = null;

export let lenientRateLimiter: RateLimiterMongo | null = null;

// ================================================================
// Initialize All Rate Limiters
// ================================================================
// Call after MongoDB connection is established

export const initRateLimiters = (
  mongooseConnection: Connection
): void => {

  // ============================================================
  // Strict Limiter
  // Auth Routes
  // login / register / refresh token
  // ============================================================

  strictRateLimiter = new RateLimiterMongo({

    storeClient: mongooseConnection,

    points: 5,

    duration: 15 * 60,

  });

  // ============================================================
  // Standard Limiter
  // Protected APIs
  // ============================================================

  standardRateLimiter = new RateLimiterMongo({

    storeClient: mongooseConnection,

    points: 100,

    duration: 60,

  });

  // ============================================================
  // Lenient Limiter
  // Public APIs / Health Checks
  // ============================================================

  lenientRateLimiter = new RateLimiterMongo({

    storeClient: mongooseConnection,

    points: 300,

    duration: 60,

  });

};