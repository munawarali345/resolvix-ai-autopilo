// ================================================================
// USER SERVICE
// ================================================================
//
// Purpose:
// Frontend user related API calls.
//
// Responsibilities:
// 1. Current logged in user fetch karna.
// 2. Admin ke liye users list fetch karna.
// 3. User role update karna.
// 4. User delete karna.
//
// NOTE:
// Ye file sirf backend communication handle karti hai.
// UI aur Zustand ko nahi janti.
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type { ApiResponse } from '@/types/api.types';

import type { User } from '@/types/auth.types';

// ================================================================
// GET CURRENT USER
// ================================================================
//
// Endpoint:
// GET /api/users/me
//
// Purpose:
// Login user ka profile fetch karna.
//
// AuthProvider me use hoga:
// refreshToken ke baad user restore karne ke liye.
//
// Response:
//
// {
//   success:true,
//   data:{
//      user:{}
//   }
// }
//
// ================================================================

export const getCurrentUser = async () => {
  return apiClient<ApiResponse<User>>(
    '/users/me',

    {
      method: 'GET',
    },
  );
};

// ================================================================
// GET ALL USERS
// ================================================================
//
// Endpoint:
// GET /api/users
//
// Access:
// Admin only
//
// Purpose:
// Admin panel me users list dikhana.
//
// ================================================================

export const getAllUsers = async () => {
  return apiClient<ApiResponse<User[]>>(
    '/users',

    {
      method: 'GET',
    },
  );
};

// ================================================================
// UPDATE USER ROLE
// ================================================================
//
// Endpoint:
// PATCH /api/users/:id/role
//
// Access:
// Admin only
//
// Body:
//
// {
//   role:"admin" | "viewer"
// }
//
// ================================================================

export const updateUserRole = async (
  userId: string,

  role: 'admin' | 'viewer',
) => {
  return apiClient<ApiResponse<User>>(
    `/users/${userId}/role`,

    {
      method: 'PATCH',

      body: { role },
    },
  );
};

// ================================================================
// DELETE USER
// ================================================================
//
// Endpoint:
// DELETE /api/users/:id
//
// Access:
// Admin only
//
// ================================================================

export const deleteUser = async (userId: string) => {
  return apiClient<ApiResponse<null>>(
    `/users/${userId}`,

    {
      method: 'DELETE',
    },
  );
};
