'use client';

// ================================================================
// RESET PASSWORD FORM
// ================================================================
//
// Purpose:
//
// Allows user to create a new password using reset token.
//
// Responsibilities:
//
// 1. Read token from URL.
// 2. Collect new password.
// 3. Call reset password API.
// 4. Redirect user to login after success.
//
// Flow:
//
// ResetPasswordForm
//        ↓
// Auth Service
//        ↓
// Backend API
//        ↓
// Password Updated
//
// ================================================================

import { useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import AuthCard from './AuthCard';

import AuthHeader from './AuthHeader';

import PasswordInput from './PasswordInput';

import AuthButton from './AuthButton';

import AuthFooter from './AuthFooter';

import { resetPassword } from '@/services/auth.service';

// ================================================================
// COMPONENT
// ================================================================

export default function ResetPasswordForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  // ==============================================================
  // HANDLE SUBMIT
  // ==============================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    setSuccess(null);

    if (!token) {
      setError('Invalid reset token.');

      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        token,

        password,
      });

      setSuccess('Password updated successfully.');

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to reset password.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create new password"
        description="Enter your new account password"
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={password}
          onChange={setPassword}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        {success && <p className="text-sm text-green-600">{success}</p>}

        <AuthButton text="Reset Password" loading={loading} />
      </form>

      <AuthFooter
        text="Remember your password?"
        linkText="Sign in"
        href="/login"
      />
    </AuthCard>
  );
}
