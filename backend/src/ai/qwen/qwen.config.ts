import { env } from '../../config/validateEnv.js';
// ========================
// QWEN CONFIGURATION
// ========================

/**
 * Qwen AI configuration
 * Saari AI related settings ek hi jagah rakho.
 */
export const QWEN_CONFIG = {
  // API Base URL
  baseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',

  // API Key
  apiKey: env.DASHSCOPE_API_KEY,

  // AI Model
  model: env.QWEN_MODEL,

  // AI Generation Settings
  temperature: 0,

  topP: 0.8,

  maxTokens: 1000,

  // Request timeout (milliseconds)
  timeout: 30000,
} as const;
