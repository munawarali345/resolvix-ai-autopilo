import RegisterForm from '@/components/auth/RegisterForm';

// ================================================================
// REGISTER PAGE
// ================================================================
//
// Purpose:
//
// New user account creation page.
//
// Responsibilities:
//
// 1. Render registration form.
// 2. Allow new users to create account.
//
// ================================================================

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <RegisterForm />
    </main>
  );
}
