'use client';

// ================================================================
// AUTH CARD
// ================================================================
//
// Purpose:
//
// Authentication pages ka common premium wrapper.
//
// Used By:
//
// - LoginForm
// - RegisterForm
// - ForgotPasswordForm
// - ResetPasswordForm
//
// Responsibilities:
//
// 1. Common auth layout.
// 2. Card styling.
// 3. Children render karna.
//
// ================================================================

import type { ReactNode } from 'react';

import { Card, CardContent } from '@/components/ui/card';

// ================================================================
// PROPS
// ================================================================

interface AuthCardProps {
  children: ReactNode;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Card
      className="
        w-full
        max-w-md
        border
        bg-background/80
        shadow-xl
        backdrop-blur
      "
    >
      <CardContent
        className="
          p-6
          sm:p-8
        "
      >
        {children}
      </CardContent>
    </Card>
  );
}
