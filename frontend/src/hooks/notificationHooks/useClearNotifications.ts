// ================================================================
// CLEAR NOTIFICATIONS HOOK (Server State)
// ================================================================
//
// Purpose:
//
// Clears all notifications.
//
// Responsibilities:
//
// 1. Call clear notifications API.
// 2. Refresh notification cache.
// 3. Expose mutation state.
//
// Flow:
//
// Component
//      ↓
// useClearNotifications()
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

import { clearNotifications } from '@/services/notification.service';

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

export function useClearNotifications() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // Service call

    mutationFn: () => clearNotifications(),

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

    clearNotifications: mutation.mutate,

    // Async version

    clearNotificationsAsync: mutation.mutateAsync,

    // Loading

    isPending: mutation.isPending,

    // Error

    error: mutation.error,

    // Response

    data: mutation.data?.data,
  };
}
