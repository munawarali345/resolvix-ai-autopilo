// ================================================================
// AGENT STATUS SERVICE
// ================================================================
//
// Purpose:
// Frontend Agent Status API communication.
//
// Responsibilities:
//
// 1. Fetch agent execution status.
// 2. Backend se realtime execution data lana.
//
// NOTE:
// Ye file sirf backend communication handle karti hai.
// UI, React Query aur Socket ko nahi janti.
//
// Flow:
//
// Hook
//    ↓
// Agent Status Service
//    ↓
// apiClient
//    ↓
// Backend API
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type { ApiResponse } from '@/types/api.types';

import type { AgentStatusResponse } from '@/types/agentStatus.types';

// ================================================================
// GET AGENT STATUS
// ================================================================
//
// Endpoint:
//
// GET /api/agents/status/:incidentId
//
// Response:
//
// {
//   success:true,
//   message:"Agent status fetched successfully.",
//   data:[
//      {
//        agentName,
//        status,
//        executionTime,
//        startedAt,
//        completedAt,
//        error
//      }
//   ]
// }
//
// ================================================================

export const getAgentStatus = async (incidentId: string) => {
  return apiClient<ApiResponse<AgentStatusResponse>>(
    `/agents/status/${incidentId}`,

    {
      method: 'GET',
    },
  );
};
