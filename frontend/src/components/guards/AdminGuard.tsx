// ================================================================
// ADMIN GUARD
// ================================================================
//
// Purpose:
// Admin only pages ko protect karna.
//
// Responsibilities:
// 1. User authenticated hai ya nahi check karna.
// 2. User ka role admin hai ya nahi check karna.
// 3. Unauthorized user ko access deny karna.
//
// Flow:
//
// Admin Page
//     ↓
// AdminGuard
//     ↓
// useAuth()
//     ↓
// auth.store
//     ↓
// Role Check
//     ↓
// Access / Redirect
//
// ================================================================

'use client';

import { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

// ================================================================
// Props
// ================================================================

interface AdminGuardProps {
  children: ReactNode;
}

// ================================================================
// Admin Guard Component
// ================================================================

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Auth restore complete hone ka wait

  if (isLoading) {
    return null;
  }

  // User login nahi hai

  if (!isAuthenticated) {
    redirect('/login');
  }

  // User admin nahi hai

  if (user?.role !== 'admin') {
    redirect('/');
  }

  // Admin user allowed

  return children;
}
