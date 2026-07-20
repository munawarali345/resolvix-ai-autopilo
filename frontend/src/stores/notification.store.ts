// ================================================================
// NOTIFICATION STORE
// ================================================================
//
// Purpose:
//
// Socket.IO realtime notifications.
//
// Responsibilities:
//
// 1. Store notifications in memory.
// 2. Replace notifications after API fetch.
// 3. Append new realtime notification.
//
// NOTE:
//
// CRUD operations React Query hooks handle karenge.
//
// ================================================================

import { create } from 'zustand';

import type { Notification } from '@/types/notification.types';

// ================================================================
// STORE STATE
// ================================================================

interface NotificationStore {
  // All notifications

  notifications: Notification[];

  // Replace entire list (initial fetch)

  setNotifications: (notifications: Notification[]) => void;

  // Add one realtime notification

  addNotification: (notification: Notification) => void;
}

// ================================================================
// STORE
// ================================================================

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  // ============================================================
  // Replace notifications
  // ============================================================

  setNotifications: (notifications) =>
    set({
      notifications,
    }),

  // ============================================================
  // Add realtime notification
  // ============================================================

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
}));
