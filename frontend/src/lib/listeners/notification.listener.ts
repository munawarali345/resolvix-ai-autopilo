// ================================================================
// NOTIFICATION SOCKET LISTENER
// ================================================================
//
// Purpose:
//
// Notification realtime updates listen karna.
//
// Responsibilities:
//
// 1. notification:new event listen karna.
// 2. Zustand Notification Store update karna.
//
// Flow:
//
// Backend
//      ↓
// notification:new
//      ↓
// Notification Listener
//      ↓
// Notification Store
//      ↓
// UI Re-render
//
// ================================================================

'use client';

import { socket } from '../socketClient/socket';

import { useNotificationStore } from '@/stores/notification.store';

import type { Notification } from '@/types/notification.types';

// ================================================================
// REGISTER NOTIFICATION LISTENER
// ================================================================

export const registerNotificationListener = () => {
  socket.on(
    'notification:new', // event name jo backend me he same huna chaiye

    // callback function he is me backend me jo savedNotification ara he
    // wo is me notification me ajaiga ye variable backend ak wai object recive ker raha he
    (notification: Notification) => {
      useNotificationStore // zustand store

        .getState() // Ye store ka current object return karta hai.

        .addNotification(notification);
    },
  );
};

// ================================================================
// REMOVE NOTIFICATION LISTENER
// ================================================================

export const removeNotificationListener = () => {
  socket.off('notification:new');
};

// Backend

// ↓

// savedNotification

// ↓

// Socket

// ↓

// notification.listener

// ↓

// notification variable

// ↓

// addNotification()

// ↓

// Store

// ↓

// UI rerender
