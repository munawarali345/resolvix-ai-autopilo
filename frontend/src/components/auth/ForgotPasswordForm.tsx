'use client';

// ================================================================
// FORGOT PASSWORD FORM
// ================================================================
//
// Purpose:
//
// Allows users to request a password reset.
//
// Responsibilities:
//
// 1. Collect user email.
// 2. Call forgot password API.
// 3. Show loading state.
// 4. Show success and error messages.
//
// Flow:
//
// ForgotPasswordForm
//        ↓
// Auth Service
//        ↓
// Backend API
//        ↓
// Password Reset Request
//
// ================================================================

import { useState } from 'react';

import AuthCard from './AuthCard';

import AuthHeader from './AuthHeader';

import AuthInput from './AuthInput';

import AuthButton from './AuthButton';

import AuthFooter from './AuthFooter';

import { forgotPassword } from '@/services/auth.service';

// ================================================================
// COMPONENT
// ================================================================

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

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

    try {
      setLoading(true);

      await forgotPassword(email);

      setSuccess('Password reset request sent successfully.');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to send reset request.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot password?"
        description="Enter your email to reset your password"
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={setEmail}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        {success && <p className="text-sm text-green-600">{success}</p>}

        <AuthButton text="Send Reset Link" loading={loading} />
      </form>

      <AuthFooter
        text="Remember your password?"
        linkText="Sign in"
        href="/login"
      />
    </AuthCard>
  );
}
