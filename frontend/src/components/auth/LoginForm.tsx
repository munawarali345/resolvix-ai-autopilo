'use client';

// ================================================================
// LOGIN FORM
// ================================================================
//
// Purpose:
// Handles user authentication.
//
// Responsibilities:
// 1. Collect login credentials.
// 2. Call auth login action.
// 3. Handle loading and errors.
// 4. Redirect authenticated users.
//
// ================================================================

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import AuthCard from './AuthCard';
import AuthHeader from './AuthHeader';
import AuthInput from './AuthInput';
import PasswordInput from './PasswordInput';
import AuthButton from './AuthButton';
import AuthFooter from './AuthFooter';

import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const router = useRouter();

  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    clearError();

    const user = await login({
      email,

      password,
    });

    if (user) {
      router.push('/dashboard');
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back"
        description="Sign in to your Resolvix AI account"
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/forgot-password')}
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <AuthButton text="Sign In" loading={isLoading} />
      </form>

      <AuthFooter
        text="Don't have an account?"
        linkText="Create account"
        href="/register"
      />
    </AuthCard>
  );
}
