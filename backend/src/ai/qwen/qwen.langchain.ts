// ================================================================
// QWEN LANGCHAIN MODEL
// ================================================================
//
// Purpose:
// Creates a reusable LangChain Chat Model configured for
// Qwen Cloud.
//
// NOTE:
// This file ONLY creates the model.
//
// It does NOT:
//
// - bind tools
// - build prompts
// - parse responses
// - validate outputs
//
// Every Tool Calling Agent will import this model and bind
// its own tools.
//
// ================================================================

import { ChatOpenAI } from '@langchain/openai';

import { QWEN_CONFIG } from './qwen.config.js';

// ================================================================
// Create Qwen LangChain Chat Model
// ================================================================
export const createQwenLangChainModel = (): ChatOpenAI => {
  return new ChatOpenAI({
    model: QWEN_CONFIG.model,

    apiKey: QWEN_CONFIG.apiKey,

    configuration: {
      baseURL: QWEN_CONFIG.baseUrl,
    },

    temperature: QWEN_CONFIG.temperature,

    maxTokens: QWEN_CONFIG.maxTokens,
  });
};
