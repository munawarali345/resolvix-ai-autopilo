// ================================================================
// INCIDENT SERVICE
// ================================================================
//
// Purpose:
// Frontend incident API communication.
//
// Responsibilities:
//
// 1. Fetch incidents list.
// 2. Fetch single incident details.
// 3. Approve incident.
// 4. Reject incident.
//
// NOTE:
// Ye file UI, Zustand aur React Query ko nahi janti.
//
// Flow:
//
// Hook
//   ↓
// Incident Service
//   ↓
// apiClient
//   ↓
// Backend API
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type { ApiResponse } from '@/types/api.types';

import type {
  IncidentFilter,
  IncidentListResponse,
  IncidentDetails,
} from '@/types/incident.types';

import type { PaginationParams } from '@/types/pagination.types';

// ================================================================
// GET ALL INCIDENTS
// ================================================================
//
// Endpoint:
//
// GET /api/incidents
//
// Query:
//
// severity
// status
// startDate
// endDate
// sort
// order
// page
// limit
//
// ================================================================
export const getIncidents = async (
  filters?: IncidentFilter,

  pagination?: PaginationParams,
) => {
  // Ye browser ka built-in helper hai jo query string banata hai.
  // new lagna zaroori he becouse ye ek class he
  const params = new URLSearchParams(); // starting me empty

  if (filters?.severity) {
    params.append('severity', filters.severity);
  }

  if (filters?.status) {
    params.append('status', filters.status);
  }

  if (filters?.startDate) {
    params.append('startDate', filters.startDate.toDateString());
  }

  if (filters?.endDate) {
    params.append('endDate', filters.endDate.toDateString());
  }

  if (filters?.sort) {
    params.append('sort', filters.sort);
  }

  if (filters?.order) {
    params.append('order', filters.order);
  }

  if (pagination?.page) {
    params.append(
      'page',

      pagination.page.toString(),
    );
  }

  if (pagination?.limit) {
    params.append(
      'limit',

      pagination.limit.toString(),
    );
  }

  const query = params.toString() ? `?${params.toString()}` : '';

  return apiClient<ApiResponse<IncidentListResponse>>(
    `/incidents${query}`,

    {
      method: 'GET',
    },
  );
};

// ================================================================
// GET INCIDENT DETAILS
// ================================================================
//
// Endpoint:
//
// GET /api/incidents/:incidentId
//
// Response:
//
// {
//   incident,
//   logs
// }
//
// ================================================================
export const getIncidentById = async (incidentId: string) => {
  return apiClient<ApiResponse<IncidentDetails>>(
    `/incidents/${incidentId}`,

    {
      method: 'GET',
    },
  );
};

// ================================================================
// APPROVE INCIDENT
// ================================================================
//
// Endpoint:
//
// PATCH /api/incidents/:incidentId/approve
//
// Purpose:
//
// Human approval ke baad
// LangGraph workflow resume hoga.
//
// ================================================================
export const approveIncident = async (incidentId: string) => {
  return apiClient<ApiResponse<null>>(
    `/incidents/${incidentId}/approve`,

    {
      method: 'PATCH',
    },
  );
};

// ================================================================
// REJECT INCIDENT
// ================================================================
//
// Endpoint:
//
// PATCH /api/incidents/:incidentId/reject
//
// ================================================================

export const rejectIncident = async (incidentId: string) => {
  return apiClient<ApiResponse<null>>(
    `/incidents/${incidentId}/reject`,

    {
      method: 'PATCH',
    },
  );
};
