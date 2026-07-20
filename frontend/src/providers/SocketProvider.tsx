// Iska kaam hoga:

// App start hote hi socket connect karna.
// Saare listeners register karna.
// App band/unmount hone par listeners remove karna.
// Socket disconnect karna.

// ================================================================
// SOCKET PROVIDER
// ================================================================
//
// Purpose:
//
// Application level Socket.IO management.
//
// Responsibilities:
//
// 1. Socket connect karna.
// 2. Realtime listeners register karna.
// 3. Cleanup karna.
//
// Flow:
//
// App
//    ↓
// SocketProvider
//    ↓
// socket.ts
//    ↓
// Backend Socket.IO
//
// ================================================================

'use client';

import { useEffect, type ReactNode } from 'react';

import { socket } from '@/lib/socketClient/socket';

import {
  registerDashboardListener,
  removeDashboardListener,
} from '@/lib/listeners/dashboard.listener';

import {
  registerNotificationListener,
  removeNotificationListener,
} from '@/lib/listeners/notification.listener';

import {
  registerAgentStatusListener,
  removeAgentStatusListener,
} from '@/lib/listeners/agentStatus.listener';

import { useQueryClient } from '@tanstack/react-query';

// ================================================================
// PROVIDER TYPE
// ================================================================

interface SocketProviderProps {
  children: ReactNode;
}

// ================================================================
// SOCKET PROVIDER
// ================================================================

export function SocketProvider({ children }: SocketProviderProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // ------------------------------------------------
    // Socket connect
    // ------------------------------------------------

    socket.connect();

    // ------------------------------------------------
    // Register listeners
    // ------------------------------------------------

    registerDashboardListener(queryClient);

    registerNotificationListener();

    registerAgentStatusListener();

    // ------------------------------------------------
    // Cleanup
    // ------------------------------------------------

    return () => {
      removeDashboardListener();

      removeNotificationListener();

      removeAgentStatusListener();

      socket.disconnect();
    };
  }, []);

  return children;
}
