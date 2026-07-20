// ================================================================
// Environment Variables Validation using Zod
// ================================================================
// Purpose: Check that all required environment variables exist
// When: Runs when app starts, before any database or API calls

// is me hum .env file ko check kar rahe hain k
// MONGO_URI exist karta he k ni
// PORT configured he k ni
// LOG_LEVEL configured he k ni
// required values empty to ni hain

// Import Zod library for validation
import { z } from 'zod';

// Import logger for structured logging
import logger from '../lib/logger.js';

// Define what environment variables we need
const envSchema = z.object({
  // NODE_ENV for environment detection (development/production)
  NODE_ENV: z.enum(['development', 'production']),

  // MONGO_URI must be a non-empty string
  MONGO_URI: z.string().nonempty('MONGO_URI is required'),

  JWT_SECRET: z.string().nonempty('JWT_SECRET is required'),

  // PORT is optional
  PORT: z.string().optional(),

  // LOG_LEVEL is optional
  LOG_LEVEL: z.string().optional(),

  ACCESS_TOKEN_EXPIRY: z.string().default('1h'),

  REFRESH_TOKEN_EXPIRY: z.string().default('7d'),

  EMAIL_USER: z.string().email().optional(),

  EMAIL_PASS: z.string().optional(),

  CLIENT_URL: z.string().url().optional(),

  // ========================
  // Qwen Cloud
  // ========================
  DASHSCOPE_API_KEY: z.string().startsWith('sk-', 'Invalid DashScope API Key'),

  QWEN_MODEL: z.string().nonempty('QWEN_MODEL is required'),
});

// Validate all environment variables at once
// process.env contains all environment variables from Node.js
const parsedEnv = envSchema.safeParse(process.env);

// If validation failed, print error and stop server
if (!parsedEnv.success) {
  // Print main error message
  logger.error('Environment validation failed:');

  // Print detailed error (Zod formats it automatically)
  logger.error(parsedEnv.error.format());

  // Stop the server - don't start with invalid config
  process.exit(1);
}

// If validation passed, export the validated data
// Now we know required environment variables exist
export const env = parsedEnv.data;

// Simple function to get validated environment
export function validateEnv() {
  return env;
}
