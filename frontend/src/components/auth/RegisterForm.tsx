'use client';

// ================================================================
// REGISTER FORM
// ================================================================
//
// Purpose:
//
// Handles new user registration.
//
// Responsibilities:
//
// 1. Collect user registration information.
// 2. Call auth register action.
// 3. Display loading and error states.
// 4. Redirect user to login after successful registration.
//
// Fields:
//
// - Name
// - Email
// - Password
//
// Flow:
//
// RegisterForm
//      ↓
// useAuth()
//      ↓
// Auth Store
//      ↓
// Auth Service
//      ↓
// Backend API
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



// ================================================================
// COMPONENT
// ================================================================

export default function RegisterForm() {
  const router = useRouter();

  // Authentication actions and states

  const {
    register,

    isLoading,

    error,

    clearError,
  } = useAuth();

  // Form states

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  // ==============================================================
  // HANDLE REGISTER SUBMIT
  // ==============================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Remove previous errors before new request

    clearError();

    await register({
      name,

      email,

      password,
    });

    // Registration does not create auth session.
    // User needs to login after account creation.

    router.push('/login');
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        description="Join Resolvix AI platform"
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChange={setName}
        />

        <AuthInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <PasswordInput
          label="Password"
          placeholder="Create your password"
          value={password}
          onChange={setPassword}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <AuthButton text="Create Account" loading={isLoading} />
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    </AuthCard>
  );
}
