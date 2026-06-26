// =====================================================
// QWEN CLIENT
// =====================================================
// Purpose:
// Single reusable client for communicating
// with Qwen Cloud.
// Simple AI calls
// No tools
// No bindTools()
// No AgentExecutor
// Every AI Agent will use this client.
// =====================================================

import OpenAI from 'openai';

import { QWEN_CONFIG } from '../../ai/qwen/qwen.config.js';

import { AIMessage, AIResponse } from '../../types/ai.type.js';

// =====================================================
// Create one reusable OpenAI client
// =====================================================
const client = new OpenAI({
  apiKey: QWEN_CONFIG.apiKey,

  baseURL: QWEN_CONFIG.baseUrl,
});

// =====================================================
// Send messages to Qwen
// =====================================================

export const callQwen = async (messages: AIMessage[]): Promise<AIResponse> => {
  try {
    const response = await client.chat.completions.create({
      model: QWEN_CONFIG.model,

      messages,

      temperature: QWEN_CONFIG.temperature,

      top_p: QWEN_CONFIG.topP,

      max_tokens: QWEN_CONFIG.maxTokens,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response received from Qwen.');
    }

    return {
      content,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Qwen Client Error: ${error.message}`);
    }

    throw new Error('Unknown Qwen Client Error');
  }
};
