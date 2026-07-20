'use client';

// ================================================================
// AUTH FOOTER
// ================================================================
//
// Purpose:
//
// Authentication pages ka common footer section.
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
// 1. Show navigation links.
// 2. Maintain consistent auth footer styling.
//
// ================================================================

import Link from 'next/link';

// ================================================================
// PROPS
// ================================================================

interface AuthFooterProps {
  text: string;

  linkText: string;

  href: string;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AuthFooter({
  text,

  linkText,

  href,
}: AuthFooterProps) {
  return (
    <div
      className="
        mt-6
        text-center
        text-sm
        text-muted-foreground
      "
    >
      <span>{text}</span>{' '}
      <Link
        href={href}
        className="
          font-medium
          text-primary
          hover:underline
        "
      >
        {linkText}
      </Link>
    </div>
  );
}
