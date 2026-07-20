// ================================================================
// AUTH GUARD
// ================================================================
//
// Purpose:
// Secure protected pages.
//
// Responsibilities:
// 1. Check if user is authenticated.
// 2. Redirect unauthorized users to login page.
// 3. Allow authorized users page access.
//
// Flow:
//
// Page
//   ↓
// AuthGuard
//   ↓
// useAuth()
//   ↓
// auth.store
//   ↓
// Access / Redirect
//
// ================================================================

// ReactNode is the type for any renderable React content.
import { ReactNode } from 'react';

// Next.js navigation function for server/client routing.
import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

// ================================================================
// Props
// ================================================================

interface AuthGuardProps {
  // Protected page passed to AuthGuard.
  children: ReactNode; // Protected page component.
}

// ================================================================
// Auth Guard Component
// ================================================================

export default function AuthGuard({
  children, // Protected page.
}: AuthGuardProps) {
  // Get auth state from hook.
  const { isAuthenticated, isLoading } = useAuth();

  // Authentication check in progress.
  // Wait for it to complete first.

  if (isLoading) {
    return null;
  }

  // User is not logged in.

  if (!isAuthenticated) {
    redirect('/login');
  }

  // User is authenticated.
  // Allow page access.

  return children;
}
