// ================================================================
// DASHBOARD HOOK
// ================================================================
//
// Purpose:
//
// Dashboard server state manage karna.
//
// Responsibilities:
//
// 1. Dashboard API call.
// 2. Cache manage.
// 3. Loading/error state.
//
// Flow:
//
// Component
//      ↓
// useDashboard()
//      ↓
// React Query
//      ↓
// dashboard.service
//      ↓
// Backend API
//
// ================================================================

import { useQuery } from '@tanstack/react-query';

import { getDashboardOverview } from '@/services/dashboard.service';

// ================================================================
// QUERY KEY
// ================================================================

const dashboardKey = ['dashboard-overview'];

// ================================================================
// HOOK
// ================================================================

export function useDashboard() {
  const query = useQuery({
    // React Query cache identity

    queryKey: dashboardKey,

    // API call

    queryFn: getDashboardOverview,
  });

  // ================================================================
  // API RESPONSE UNWRAP
  // ================================================================
  //
  // query.data:
  // {
  //   success:true,
  //   data:{
  //      incidentOverview,
  //      healthMetrics,
  //      mttrMetrics,
  //      agentStatus,
  //      charts
  //   }
  // }
  //
  // query.data.data:
  // actual dashboard data
  //
  // ================================================================

  const response = query.data?.data;

  return {
    // Dashboard sections

    incidentOverview: response?.incidentOverview,

    healthMetrics: response?.healthMetrics,

    mttrMetrics: response?.mttrMetrics,

    agentStatus: response?.agentStatus,

    charts: response?.charts,

    // React Query states

    isLoading: query.isLoading,

    error: query.error,

    refetch: query.refetch,
  };
}
