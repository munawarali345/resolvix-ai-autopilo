'use client';

// ================================================================
// AUTH HEADER
// ================================================================
//
// Purpose:
//
// Authentication pages ka common heading section.
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
// 1. Show title.
// 2. Show description.
// 3. Maintain consistent auth branding.
//
// ================================================================

// ================================================================
// PROPS
// ================================================================

interface AuthHeaderProps {
  title: string;

  description: string;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AuthHeader({
  title,

  description,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 space-y-2 text-center">
      <h1
        className="
          text-3xl
          font-bold
          tracking-tight
        "
      >
        {title}
      </h1>

      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {description}
      </p>
    </div>
  );
}
