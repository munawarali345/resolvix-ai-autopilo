import LoginForm from '@/components/auth/LoginForm';

// ================================================================
// LOGIN PAGE
// ================================================================
//
// Purpose:
//
// Authentication entry page.
//
// Responsibilities:
//
// 1. Render login form.
// 2. Allow user authentication.
//
// ================================================================

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <LoginForm />
    </main>
  );
}
