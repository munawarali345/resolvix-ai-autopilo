// ================================================================
// INCIDENTS HOOK (server state hook)
// ================================================================
//
// Purpose:
//
// Ye React Query ka server state hook hai. Iska kaam backend se incidents lana, cache karna,    loading/error manage karna hai.
// Responsibilities:
//
// 1. Incidents fetch karna.
// 2. Filters pass karna.
// 3. Loading state dena.
// 4. Error state dena.
// 5. Cache manage karna.
//
// Flow:
//
// Component
//      ↓
// useIncidents()
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

import { getIncidents } from '@/services/incident.service';

import type { IncidentFilter } from '@/types/incident.types';

import type { PaginationParams } from '@/types/pagination.types';

// ================================================================
// QUERY KEY
// ================================================================
//
// React Query cache key.
//
// Agar filter change hoga
// to naya cache banega.
//
// Example:
//
// [
//  "incidents",
//  {severity:"critical"}
// ]
// Ye React Query ki cache identity hai.
// ================================================================

const incidentsKey = (
  filters?: IncidentFilter,

  pagination?: PaginationParams,
) => ['incidents', filters, pagination];

// ================================================================
// useIncidents Hook
// ================================================================

export function useIncidents(
  filters?: IncidentFilter,
  pagination?: PaginationParams,
) {
  const query = useQuery({
    // Cache identity
    queryKey: incidentsKey(filters),

    // API call
    queryFn: () =>
      getIncidents(
        filters,

        pagination,
      ),

    // Page 1 se Page 2 jaate waqt:
    // pehle blank nahi hoga.
    // Purana data dikhega jab tak naya data nahi ata.
    placeholderData: (previousData) => previousData,
  });

  const response = query.data?.data;

  return {
    // response data
    incidents: response?.incidents ?? [],

    // pagination
    pagination: response?.pagination,

    // loading state

    isLoading: query.isLoading,

    // error

    error: query.error,

    // refetch manually

    refetch: query.refetch,
  };
}

// query.data -> ye react query ka data he
// Isme pura API response hai:

// {
//  success:true,
//  message:"",
//  data:{}
// }

// Dusra data

// Ye backend ka data field hai:

// query.data.data

// Isme:

// {
//  incidents:[],
//  pagination:{}
// }
