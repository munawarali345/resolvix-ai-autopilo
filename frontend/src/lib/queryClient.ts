// ================================================================
// QUERY CLIENT
// ================================================================
//
// Purpose:
//
// Global React Query client.
//
// Used by:
// Socket listeners for cache invalidation.
//
// ================================================================

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();
