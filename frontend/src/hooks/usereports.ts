// ================================================================
// REPORTS HOOK (Server State)
// ================================================================
//
// Purpose:
//
// React Query hook for fetching report list.
//
// Responsibilities:
//
// 1. Reports fetch karna.
// 2. Pagination pass karna.
// 3. Loading state dena.
// 4. Error state dena.
// 5. Cache manage karna.
//
// Flow:
//
// Component
//      ↓
// useReports()
//      ↓
// React Query
//      ↓
// report.service
//      ↓
// apiClient
//      ↓
// Backend API
//
// ================================================================

import { useQuery } from '@tanstack/react-query';

import { getReports } from '@/services/reports.service';

import type { PaginationParams } from '@/types/pagination.types';

// ================================================================
// QUERY KEY
// ================================================================
//
// React Query cache identity.
//
// Example:
//
// [
//   "reports",
//   {
//      page:1,
//      limit:10
//   }
// ]
//
// Agar page change hoga
// to naya cache banega.
//
// ================================================================

const reportsKey = (pagination: PaginationParams) => ['reports', pagination];

// ================================================================
// useReports Hook
// ================================================================

export function useReports(pagination: PaginationParams) {
  const query = useQuery({
    // Cache key

    queryKey: reportsKey(pagination),

    // Service call

    queryFn: () => getReports(pagination),

    // Page change ke time
    // purana data remove nahi hoga

    placeholderData: (previousData) => previousData,
  });

  const response = query.data?.data;

  return {
    // Report list + pagination

    reports: response?.reports ?? [],

    pagination: response?.pagination,

    // Loading

    isLoading: query.isLoading,

    // Error

    error: query.error,

    // Manual refresh

    refetch: query.refetch,
  };
}
