// ================================================================
// NOTIFICATIONS HOOK (Server State)
// ================================================================
//
// Purpose:
//
// React Query hook for fetching notifications.
//
// Responsibilities:
//
// 1. Fetch notifications.
// 2. Cache notifications.
// 3. Loading state.
// 4. Error state.
// 5. Manual refetch.
//
// Flow:
//
// Component
//      ↓
// useNotifications()
//      ↓
// React Query
//      ↓
// Notification Service
//      ↓
// apiClient
//      ↓
// Backend API
//
// ================================================================

import { useQuery } from '@tanstack/react-query';

import { getNotifications } from '@/services/notification.service';

import type { Notification } from '@/types/notification.types';

// ================================================================
// QUERY KEY
// ================================================================
//
// Notifications ki ek shared cache hogi.
//
// Example:
//
// [
//   "notifications"
// ]
//
// ================================================================

const notificationsKey = () => ['notifications'];

// ================================================================
// HOOK
// ================================================================

export function useNotifications() {
  const query = useQuery({
    // Cache identity

    queryKey: notificationsKey(),

    // Service call

    queryFn: () => getNotifications(),

    // Previous data retain

    placeholderData: (previousData) => previousData,
  });

  return {
    // Notifications response

    data: query.data?.data as Notification[] | undefined,

    // Loading

    isLoading: query.isLoading,

    // Error

    error: query.error,

    // Manual refresh

    refetch: query.refetch,
  };
}
