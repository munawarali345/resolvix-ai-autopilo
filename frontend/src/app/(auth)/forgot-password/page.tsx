import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

// ================================================================
// FORGOT PASSWORD PAGE
// ================================================================
//
// Purpose:
//
// Password reset request page.
//
// Responsibilities:
//
// 1. Render forgot password form.
// 2. Allow user to request reset link.
//
// ================================================================

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <ForgotPasswordForm />
    </main>
  );
}
