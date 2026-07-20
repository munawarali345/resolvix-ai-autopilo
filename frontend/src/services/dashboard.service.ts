// ================================================================
// DASHBOARD SERVICE
// ================================================================
//
// Purpose:
// Frontend dashboard related API communication.
//
// Responsibilities:
// 1. Dashboard overview data fetch karna.
// 2. Backend dashboard API call karna.
//
// NOTE:
// Ye file sirf backend communication handle karti hai.
// UI, Store aur React Query ko nahi janti.
//
// Flow:
//
// Dashboard Hook
//       ↓
// Dashboard Service
//       ↓
// apiClient
//       ↓
// Backend API
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type { ApiResponse } from '@/types/api.types';

import type { DashboardOverview } from '@/types/dashboard.types';

// ================================================================
// GET DASHBOARD OVERVIEW
// ================================================================
//
// Endpoint:
//
// GET /api/dashboard/overview
//
//
// Purpose:
//
// Dashboard ke liye complete overview data lana.
//
// Response:
//
// {
//   success:true,
//   message:"Dashboard overview fetched successfully",
//   data:{
//      incidentOverview,
//      healthMetrics,
//      mttrMetrics,
//      agentStatus,
//      charts
//   }
// }
//
// ================================================================

export const getDashboardOverview = async () => {
  return apiClient<ApiResponse<DashboardOverview>>(
    '/dashboard/overview',

    {
      method: 'GET',
    },
  );
};
