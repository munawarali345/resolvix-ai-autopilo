'use client';

// ================================================================
// AUTH BUTTON
// ================================================================
//
// Purpose:
//
// Authentication forms ka reusable submit button.
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
// 1. Button styling.
// 2. Loading state.
// 3. Disabled state.
//
// ================================================================

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

// ================================================================
// PROPS
// ================================================================

interface AuthButtonProps {
  text: string;

  loading?: boolean;

  disabled?: boolean;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AuthButton({
  text,

  loading = false,

  disabled = false,
}: AuthButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading || disabled}
      className="
        h-11
        w-full
        rounded-lg
        text-sm
        font-semibold
      "
    >
      {loading ? (
        <>
          <Loader2
            className="
                mr-2
                h-4
                w-4
                animate-spin
              "
          />
          Processing...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
