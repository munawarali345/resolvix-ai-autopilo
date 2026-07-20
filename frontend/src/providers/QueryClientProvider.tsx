'use client';

// ================================================================
// QUERY PROVIDER
// ================================================================
//
// Purpose:
//
// React Query global setup.
//
// Responsibilities:
//
// 1. QueryClient create karna.
// 2. React Query cache provide karna.
// 3. Sare hooks ko query access dena.
//
// Flow:
//
// Component
//      ↓
// useQuery()
//      ↓
// QueryProvider
//      ↓
// QueryClient
//
// ================================================================

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useState, type ReactNode } from 'react';

// ================================================================
// TYPES
// ================================================================

interface QueryProviderProps {
  children: ReactNode;
}

// ================================================================
// PROVIDER
// ================================================================

export function QueryProvider({ children }: QueryProviderProps) {
  // ------------------------------------------------
  // Single QueryClient instance
  // ------------------------------------------------
  //
  // useState isliye use kar rahe hain:
  //
  // Har render pe naya QueryClient create na ho.
  //
  // ------------------------------------------------

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data kitni der fresh rahega

            staleTime: 1000 * 30,

            // Error par retry

            retry: 2,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
