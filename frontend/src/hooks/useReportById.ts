// ================================================================
// REPORT BY ID HOOK (Server State)
// ================================================================
//
// Purpose:
//
// Single report details fetch karna.
//
// Responsibilities:
//
// 1. Report detail fetch karna.
// 2. Timeline fetch karna.
// 3. Metrics fetch karna.
// 4. Loading state dena.
// 5. Error state dena.
// 6. React Query cache manage karna.
//
// Flow:
//
// Component
//      ↓
// useReportById()
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

import { getReportById } from '@/services/reports.service';

import type { ReportDetails } from '@/types/report.types';

// ================================================================
// QUERY KEY
// ================================================================
//
// Har report ki apni cache hogi.
//
// Example:
//
// [
//   "report",
//   "687e123abc"
// ]
//
// Agar reportId change hogi
// to React Query naya data fetch karega.
//
// ================================================================

const reportByIdKey = (reportId: string) => ['report', reportId];

// ================================================================
// useReportById Hook
// ================================================================

export function useReportById(reportId?: string) {
  const query = useQuery({
    // Cache identity

    queryKey: reportId ? reportByIdKey(reportId) : ['report'],

    // Service call

    queryFn: () => getReportById(reportId!),

    // Agar id nahi hai
    // to API call nahi hogi

    enabled: !!reportId,
  });

  return {
    // Report detail response

    data: query.data?.data as ReportDetails | undefined,

    // Loading

    isLoading: query.isLoading,

    // Error

    error: query.error,

    // Manual refresh

    refetch: query.refetch,
  };
}
