// ========================
// AI TYPES
// ========================
// Purpose:
// Shared types for AI communication.
// They are NOT related to API responses.
// ========================

// ========================
// Allowed AI message roles
// ========================
export type AIMessageRole = 'system' | 'user' | 'assistant';

// ========================
// Single chat message
// ========================
export type AIMessage = {
  role: AIMessageRole;
  content: string;
};

// ========================
// AI response returned
// from Qwen Client
// ========================
export type AIResponse = {
  content: string;
};
