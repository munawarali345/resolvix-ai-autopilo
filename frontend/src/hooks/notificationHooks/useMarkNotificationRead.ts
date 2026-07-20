// ================================================================
// MARK NOTIFICATION AS READ HOOK (Server State)
// ================================================================
//
// Purpose:
//
// Marks notification as read.
//
// Responsibilities:
//
// 1. Call mark notification API.
// 2. Refresh notification cache.
// 3. Expose mutation state.
//
// Flow:
//
// Component
//      ↓
// useMarkNotificationAsRead()
//      ↓
// React Query Mutation
//      ↓
// Notification Service
//      ↓
// apiClient
//      ↓
// Backend API
//
// ================================================================

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markNotificationAsRead } from '@/services/notification.service';

// ================================================================
// QUERY KEY
// ================================================================
//
// Notification list cache.
//
// ================================================================

const notificationsKey = () => ['notifications'];

// ================================================================
// HOOK
// ================================================================

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // Service call

    mutationFn: (notificationId: string) =>
      markNotificationAsRead(notificationId),

    // Success

    onSuccess: () => {
      // Refresh notification list

      queryClient.invalidateQueries({
        queryKey: notificationsKey(),
      });
    },
  });

  return {
    // Trigger mutation

    markAsRead: mutation.mutate,

    // Async version

    markAsReadAsync: mutation.mutateAsync,

    // Loading

    isPending: mutation.isPending,

    // Error

    error: mutation.error,

    // Response

    data: mutation.data?.data,
  };
}
