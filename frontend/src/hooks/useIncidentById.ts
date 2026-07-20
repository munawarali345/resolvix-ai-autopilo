// ================================================================
// INCIDENT BY ID HOOK
// ================================================================
//
// Purpose:
//
// Single incident details fetch karna.
//
// Responsibilities:
//
// 1. Incident detail fetch karna.
// 2. Related logs fetch karna.
// 3. Loading state dena.
// 4. Error state dena.
// 5. React Query cache manage karna.
//
// Flow:
//
// Component
//      ↓
// useIncidentById()
//      ↓
// React Query
//      ↓
// incident.service
//      ↓
// apiClient
//      ↓
// Backend API
//
// ================================================================

import { useQuery } from '@tanstack/react-query';

import { getIncidentById } from '@/services/incident.service';

import type { IncidentDetails } from '@/types/incident.types';

// ================================================================
// QUERY KEY
// ================================================================
//
// Har incident ki apni cache hogi.
//
// Example:
//
// [
//   "incident",
//   "687e123abc"
// ]
//
// Agar id change hogi to React Query
// naya data fetch karega.
//
// ================================================================

const incidentByIdKey = (incidentId: string) => ['incident', incidentId];

// ================================================================
// HOOK
// ================================================================

export function useIncidentById(incidentId: string) {
  const query = useQuery({
    // Cache identity
    queryKey: incidentByIdKey(incidentId),

    // Service call
    queryFn: () => getIncidentById(incidentId),

    // Agar id nahi hai to API call mat karo
    enabled: !!incidentId,
  });

  return {
    // Incident + logs response

    data: query.data?.data as IncidentDetails | undefined,

    // Loading

    isLoading: query.isLoading,

    // Error

    error: query.error,

    // Manual refresh

    refetch: query.refetch,
  };
}
