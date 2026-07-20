// ================================================================
// NOTIFICATION SERVICE
// ================================================================
//
// Purpose:
// Frontend Notification API communication.
//
// Responsibilities:
//
// 1. Fetch notifications.
// 2. Mark notification as read.
// 3. Delete notification.
// 4. Clear all notifications.
//
// NOTE:
//
// Ye file sirf backend communication handle karti hai.
//
// React Query,
// Zustand,
// Components
//
// ko nahi janti.
//
// Flow:
//
// Hook
//      ↓
// Notification Service
//      ↓
// apiClient
//      ↓
// Backend API
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type { ApiResponse } from '@/types/api.types';

import type { Notification } from '@/types/notification.types';

// ================================================================
// GET ALL NOTIFICATIONS
// ================================================================
//
// Endpoint:
//
// GET /api/notification
//
// Response:
//
// {
//   success:true,
//   message:"Notifications fetched successfully.",
//   data:[...]
// }
//
// ================================================================

export const getNotifications = async () => {
  return apiClient<ApiResponse<Notification[]>>(
    '/notification',

    {
      method: 'GET',
    },
  );
};

// ================================================================
// MARK NOTIFICATION AS READ
// ================================================================
//
// Endpoint:
//
// PATCH /api/notification/:id/read
//
// ================================================================

export const markNotificationAsRead = async (notificationId: string) => {
  return apiClient<ApiResponse<Notification>>(
    `/notification/${notificationId}/read`,

    {
      method: 'PATCH',
    },
  );
};

// ================================================================
// DELETE NOTIFICATION
// ================================================================
//
// Endpoint:
//
// DELETE /api/notification/:id
//
// ================================================================

export const deleteNotification = async (notificationId: string) => {
  return apiClient<ApiResponse<null>>(
    `/notification/${notificationId}`,

    {
      method: 'DELETE',
    },
  );
};

// ================================================================
// CLEAR ALL NOTIFICATIONS
// ================================================================
//
// Endpoint:
//
// DELETE /api/notification
//
// Response:
//
// {
//   success:true,
//   deletedCount:number
// }
//
// ================================================================

export const clearNotifications = async () => {
  return apiClient<ApiResponse<{ deletedCount: number }>>(
    '/notification',

    {
      method: 'DELETE',
    },
  );
};
