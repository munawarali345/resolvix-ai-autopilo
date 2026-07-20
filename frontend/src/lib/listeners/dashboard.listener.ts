// ================================================================
// DASHBOARD SOCKET LISTENER
// ================================================================
//
// Purpose:
//
// Dashboard realtime updates handle karna.
//
// Flow:
//
// Backend
//    ↓
// dashboard:update
//    ↓
// Socket Listener
//    ↓
// React Query invalidate
//    ↓
// Dashboard refetch
//    ↓
// UI update
//
// ================================================================

import { socket } from '../socketClient/socket';

import type { QueryClient } from '@tanstack/react-query';

// ================================================================
// REGISTER LISTENER
// ================================================================

export const registerDashboardListener = (queryClient: QueryClient) => {
  socket.on(
    'dashboard:update',

    () => {
      queryClient.invalidateQueries({
        queryKey: ['dashboard-overview'],
      });
    },
  );
};

// ================================================================
// REMOVE LISTENER
// ================================================================

export const removeDashboardListener = () => {
  socket.off('dashboard:update');
};
