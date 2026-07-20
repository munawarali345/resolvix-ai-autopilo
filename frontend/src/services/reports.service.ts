// ================================================================
// REPORT SERVICE
// ================================================================
//
// Purpose:
// Frontend report API communication.
//
// Responsibilities:
//
// 1. Fetch report list.
// 2. Fetch single report details.
//
// NOTE:
// Ye file sirf backend communication handle karti hai.
// UI, React Query aur Socket ko nahi janti.
//
// Flow:
//
// Hook
//   ↓
// Report Service
//   ↓
// apiClient
//   ↓
// Backend API
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type { ApiResponse } from '@/types/api.types';

import type { Report, ReportDetails } from '@/types/report.types';

import type { PaginationParams, Pagination } from '@/types/pagination.types';

// ================================================================
// REPORT LIST RESPONSE
// ================================================================
//
// Backend:
//
// {
//    reports:[],
//    pagination:{}
// }
//
// ================================================================

export type ReportListResponse = {
  reports: Report[];

  pagination: Pagination;
};

// ================================================================
// GET ALL REPORTS
// ================================================================
//
// Endpoint:
//
// GET /api/reports
//
// Query:
//
// page
// limit
//
// Backend:
// PaginationMiddleware handle karega.
//
// ================================================================

export const getReports = async (pagination: PaginationParams) => {
  const params = new URLSearchParams();

  if (pagination.page) {
    params.append('page', pagination.page.toString());
  }

  if (pagination.limit) {
    params.append('limit', pagination.limit.toString());
  }

  const query = params.toString() ? `?${params.toString()}` : '';

  return apiClient<ApiResponse<ReportListResponse>>(
    `/reports${query}`,

    {
      method: 'GET',
    },
  );
};

// ================================================================
// GET REPORT DETAILS
// ================================================================
//
// Endpoint:
//
// GET /api/reports/:reportId
//
// Response:
//
// {
//    id,
//    incidentId,
//    title,
//    summary,
//    executiveSummary,
//    technicalSummary,
//    timeline,
//    metrics
// }
//
// ================================================================

export const getReportById = async (reportId: string) => {
  return apiClient<ApiResponse<ReportDetails>>(
    `/reports/${reportId}`,

    {
      method: 'GET',
    },
  );
};
