// ================================================================
// DELETE NOTIFICATION HOOK (Server State)
// ================================================================
//
// Purpose:
//
// Deletes a single notification.
//
// Responsibilities:
//
// 1. Call delete notification API.
// 2. Refresh notification cache.
// 3. Expose mutation state.
//
// Flow:
//
// Component
//      ↓
// useDeleteNotification()
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

import { deleteNotification } from '@/services/notification.service';

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

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // Service call

    mutationFn: (notificationId: string) => deleteNotification(notificationId),

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

    deleteNotification: mutation.mutate,

    // Async version

    deleteNotificationAsync: mutation.mutateAsync,

    // Loading

    isPending: mutation.isPending,

    // Error

    error: mutation.error,

    // Response

    data: mutation.data,
  };
}
