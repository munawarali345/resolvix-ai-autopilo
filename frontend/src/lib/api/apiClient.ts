// ================================================================
// API CLIENT
// ================================================================
//
// Purpose:
// Central HTTP client used by the entire frontend.
//
// Responsibilities:
// 1. Send requests to the backend.
// 2. Automatically include authentication cookies.
// 3. Handle common request configuration.
// 4. Parse JSON responses.
// 5. Throw consistent errors.
//
// NOTE:
// This file DOES NOT know anything about incidents,
// authentication, dashboard, reports, or agents.
//
// It only performs HTTP communication.
//
// ================================================================

// ================================================================
// Backend Base URL
// ================================================================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

// ================================================================
// Request Options Type
// ================================================================

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

// ================================================================
// Generic API Client
// ================================================================

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,

    // Always send cookies (accessToken + refreshToken)
    credentials: 'include',

    headers: {
      'Content-Type': 'application/json',

      ...options.headers,
    },

    // Object ko JSON string me convert karega
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? 'Something went wrong.');
  }

  return data as T;
}

// <T>

// Ye generic hai.

// Abhi nahi pata return kya aayega.

// Baad me pata chalega.

// Example

// Login

// ApiResponse<LoginResponse>

// Dashboard

// ApiResponse<DashboardResponse>

// Incident

// ApiResponse<Incident[]>

// options: RequestInit = {}
// Ye fetch ki sari settings hain.

// Example

// method

// headers

// body

// signal

// mode

// cache

// credentials

// Sab isi object me aata hai.

// src/lib/api/apiClient.ts

// bana liya hai.

// Iska kaam sirf HTTP communication hai:

// Frontend
//    |
//    |
// apiClient()
//    |
//    |
// Backend API
