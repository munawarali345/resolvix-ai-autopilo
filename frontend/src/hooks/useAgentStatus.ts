// ================================================================
// AGENT STATUS HOOK (Server State)
// ================================================================
//
// Purpose:
//
// React Query hook for fetching agent execution status.
//
// Responsibilities:
//
// 1. Fetch agent status.
// 2. Cache response.
// 3. Loading state.
// 4. Error state.
// 5. Manual refetch.
//
// Flow:
//
// Component
//      ↓
// useAgentStatus()
//      ↓
// React Query
//      ↓
// Agent Status Service
//      ↓
// apiClient
//      ↓
// Backend API
//
// ================================================================

import { useQuery } from '@tanstack/react-query';

import { getAgentStatus } from '@/services/agentStatus.service';

// ================================================================
// QUERY KEY
// ================================================================
//
// Har incident ka apna cache hoga.
//
// Example:
//
// ["agent-status","abc123"]
//
// ================================================================

const agentStatusKey = (incidentId: string) => ['agent-status', incidentId];

// ================================================================
// useAgentStatus Hook
// ================================================================

export function useAgentStatus(incidentId: string) {
  const query = useQuery({
    // Cache key

    queryKey: agentStatusKey(incidentId),

    // API call

    queryFn: () => getAgentStatus(incidentId!),

    // Incident id na ho to API call mat karo

    enabled: !!incidentId,

    // Previous data retain

    placeholderData: (previousData) => previousData,
  });

  return {
    // Response

    data: query.data?.data,

    // Loading

    isLoading: query.isLoading,

    // Error

    error: query.error,

    // Manual refresh

    refetch: query.refetch,
  };
}
