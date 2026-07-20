// ================================================================
// APPROVE INCIDENT HOOK
// ================================================================
//
// Purpose:
//
// Incident approve action handle karna.
//
// Responsibilities:
//
// 1. Approve API call trigger karna.
// 2. Loading state dena.
// 3. Error handle karna.
// 4. Successful approval ke baad cache refresh karna.
//
// Flow:
//
// Component
//      ↓
// useApproveIncident()
//      ↓
// React Query Mutation
//      ↓
// incident.service
//      ↓
// apiClient
//      ↓
// Backend
//
// ================================================================

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { approveIncident } from '@/services/incident.service';

// ================================================================
// HOOK
// ================================================================

export function useApproveIncident() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // ============================================================
    // API CALL
    // ============================================================

    mutationFn: (incidentId: string) => approveIncident(incidentId),

    // ============================================================
    // SUCCESS
    // ============================================================
    //
    // Approval ke baad:
    // Ye mutation complete hone ke baad chalne wala callback hai.
    // 1. incidents list update
    // 2. detail page update
    //
    // ============================================================

    onSuccess: (_, incidentId) => {
      // _ means k first perameter ni chaiye hume

      // list refresh

      queryClient.invalidateQueries({
        queryKey: ['incidents'],
      });

      // detail refresh

      queryClient.invalidateQueries({
        queryKey: ['incident', incidentId],
      });
    },
  });

  return {
    // button se call hoga

    approve: mutation.mutate,

    // loading

    isLoading: mutation.isPending,

    // error

    error: mutation.error,

    // reset

    reset: mutation.reset,
  };
}

// queryClient.invalidateQueries({

//  queryKey:["incidents"]

// });

// React Query ko bolta hai:

// "jitni bhi incidents list wali cache hai sab stale kar do."

// Phir next render/refetch me:

// GET /api/incidents

// dobara chalega.

// Incident Detail Cache

// Tumhara:

// useIncidentById(id)

// cache:

// [
//  "incident",
//  "123"
// ]

// Example:

// Detail page:

// Incident #123

// Before:

// status: open
// executionStatus: undefined

// Approve ke baad backend:

// status: resolved
// executionStatus: SUCCESS
// mttr:25

// Lekin page me purana data hai.

// Isliye:

// queryClient.invalidateQueries({

//  queryKey:[
//    "incident",
//    incidentId
//  ]

// });

// Ye sirf us incident detail ko refresh karega.
