// ================================================================
// AUTH HOOK
// ================================================================
//
// Purpose:
// Components ko authentication access provide karna.
//
// Responsibilities:
// 1. Auth store se data lena.
// 2. Common auth actions expose karna.
// 3. Components ko Zustand se directly connect hone se bachana.
//
// Flow:
//
// Component
//     ↓
// useAuth()
//     ↓
// auth.store
//     ↓
// Zustand
//
// ================================================================

import { useAuthStore } from '@/stores/auth.store';

// ================================================================
// useAuth Hook
// ================================================================
//
// Components is hook ke through:
// - current user
// - login status
// - loading state
// - auth actions
// access karenge.
//
// ================================================================

export function useAuth() {
  // Current logged in user
  const user = useAuthStore((state) => state.user);

  // Authentication status
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // API loading state
  const isLoading = useAuthStore((state) => state.isLoading);

  // API error
  const error = useAuthStore((state) => state.error);

  // Auth actions

  const login = useAuthStore((state) => state.login);

  const register = useAuthStore((state) => state.register);

  const logout = useAuthStore((state) => state.logout);

  const clearError = useAuthStore((state) => state.clearError);

  return {
    user,

    isAuthenticated,

    isLoading,

    error,

    login,

    register,

    logout,

    clearError,
  };
}
