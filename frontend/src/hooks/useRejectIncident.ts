// ================================================================
// REJECT INCIDENT HOOK
// ================================================================
//
// Purpose:
//
// Incident reject action handle karna.
//
// Responsibilities:
//
// 1. Reject API call trigger karna.
// 2. Loading state provide karna.
// 3. Error handle karna.
// 4. Success ke baad incident caches refresh karna.
//
// Flow:
//
// Component
//      ↓
// useRejectIncident()
//      ↓
// React Query Mutation
//      ↓
// incident.service
//      ↓
// apiClient
//      ↓
// Backend API
//
// ================================================================

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { rejectIncident } from '@/services/incident.service';

// ================================================================
// HOOK
// ================================================================

export function useRejectIncident() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // ============================================================
    // API CALL
    // ============================================================

    mutationFn: (incidentId: string) => rejectIncident(incidentId),

    // ============================================================
    // SUCCESS
    // ============================================================

    onSuccess: (_, incidentId) => {
      // Refresh incident list

      queryClient.invalidateQueries({
        queryKey: ['incidents'],
      });

      // Refresh selected incident details

      queryClient.invalidateQueries({
        queryKey: ['incident', incidentId],
      });
    },
  });

  return {
    // Trigger reject

    reject: mutation.mutate,

    // Loading state

    isLoading: mutation.isPending,

    // Error

    error: mutation.error,

    // Reset mutation state

    reset: mutation.reset,
  };
}
