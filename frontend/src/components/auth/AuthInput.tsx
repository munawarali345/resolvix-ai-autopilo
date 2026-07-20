'use client';

// ================================================================
// AUTH INPUT
// ================================================================
//
// Purpose:
//
// Authentication forms ke common input fields.
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
// 1. Label render karna.
// 2. Input value handle karna.
// 3. Error message show karna.
// 4. Consistent styling maintain karna.
//
// ================================================================

import { Input } from '@/components/ui/input';

// ================================================================
// PROPS
// ================================================================

interface AuthInputProps {
  label: string;

  placeholder: string;

  type?: string;

  value: string;

  onChange: (value: string) => void;

  error?: string;

  disabled?: boolean;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AuthInput({
  label,

  placeholder,

  type = 'text',

  value,

  onChange,

  error,

  disabled,
}: AuthInputProps) {
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

      {/* Input */}

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-11
          rounded-lg
        "
      />

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
