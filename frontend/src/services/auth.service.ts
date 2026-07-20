// ================================================================
// AUTH SERVICE
// ================================================================
//
// Purpose:
// Frontend authentication API calls handle karna.
//
// Responsibilities:
// 1. Register API call
// 2. Login API call
// 3. Refresh token API call
// 4. Logout API call
// 5. Forgot password API call
// 6. Reset password API call
//
// NOTE:
// Ye file UI ya Zustand store nahi janti.
// Ye sirf backend communication karti hai.
//
// Flow:
//
// Component
//    ↓
// Auth Store
//    ↓
// Auth Service
//    ↓
// apiClient
//    ↓
// Backend API
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type { ApiResponse } from '@/types/api.types';

// ================================================================
// AUTH TYPES
// ================================================================

import type { AuthResponseData, RegisterResponse } from '@/types/auth.types';

// ================================================================
// REGISTER USER
// ================================================================
//
// Endpoint:
// POST /api/auth/register
//
// Body:
// {
//   email,
//   password,
//   name
// }
//
// Response:
// {
//   success,
//   message,
//   data:user
// }
//
// ================================================================
export const registerUser = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  return apiClient<ApiResponse<RegisterResponse>>(
    '/auth/register',

    {
      method: 'POST',

      body: payload,
    },
  );
};

// ================================================================
// LOGIN USER
// ================================================================
//
// Endpoint:
// POST /api/auth/login
//
// Backend cookies me:
// accessToken
// refreshToken
//
// save karega.
//
// ================================================================
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return apiClient<ApiResponse<AuthResponseData>>(
    '/auth/login',

    {
      method: 'POST',

      body: payload,
    },
  );
};

// ================================================================
// REFRESH TOKEN
// ================================================================
//
// Endpoint:
// POST /api/auth/refresh
//
// Cookie se refreshToken jayega.
//
// ================================================================
export const refreshToken = async () => {
  return apiClient<ApiResponse<null>>(
    '/auth/refresh',

    {
      method: 'POST',
    },
  );
};

// ================================================================
// LOGOUT USER
// ================================================================
//
// Endpoint:
// POST /api/auth/logout
//
// Cookies clear hongi backend par.
//
// ================================================================
export const logoutUser = async () => {
  return apiClient<ApiResponse<null>>(
    '/auth/logout',

    {
      method: 'POST',
    },
  );
};

// ================================================================
// FORGOT PASSWORD
// ================================================================

export const forgotPassword = async (email: string) => {
  return apiClient<ApiResponse<null>>(
    '/auth/forgot-password',

    {
      method: 'POST',

      body: { email },
    },
  );
};

// ================================================================
// RESET PASSWORD
// ================================================================

export const resetPassword = async (payload: {
  token: string;
  password: string;
}) => {
  return apiClient<ApiResponse<null>>(
    '/auth/reset-password',

    {
      method: 'POST',

      body: payload,
    },
  );
};
