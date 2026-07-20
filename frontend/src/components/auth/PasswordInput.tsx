'use client';

// ================================================================
// PASSWORD INPUT
// ================================================================
//
// Purpose:
//
// Authentication password fields ka reusable component.
//
// Used By:
//
// - LoginForm
// - RegisterForm
// - ResetPasswordForm
//
// Responsibilities:
//
// 1. Password input render karna.
// 2. Show / hide password.
// 3. Common styling maintain karna.
//
// ================================================================

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';

// ================================================================
// PROPS
// ================================================================

interface PasswordInputProps {
  label: string;

  placeholder?: string;

  value: string;

  onChange: (value: string) => void;

  error?: string;

  disabled?: boolean;
}

// ================================================================
// COMPONENT
// ================================================================

export default function PasswordInput({
  label,

  placeholder = 'Enter password',

  value,

  onChange,

  error,

  disabled,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {/* Label */}

      <label
        className="
          text-sm
          font-medium
        "
      >
        {label}
      </label>

      {/* Input Wrapper */}

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-11
            rounded-lg
            pr-11
          "
        />

        {/* Toggle Button */}

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-muted-foreground
            hover:text-foreground
          "
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Error */}

      {error && (
        <p
          className="
            text-sm
            text-destructive
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}
