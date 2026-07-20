// Import Next.js metadata type for page head configuration
import type { Metadata } from 'next';
import React from 'react';

// Import global CSS styles including Tailwind and shadcn variables
import './globals.css';

// Auth Provider
import { AuthProvider } from '@/providers/AuthProvider';

// socket provider
import { SocketProvider } from '@/providers/SocketProvider';

// query provider
import { QueryProvider } from '@/providers/QueryClientProvider';

// Export metadata for SEO and browser tab configuration
export const metadata: Metadata = {
  title: 'Resolvix AI',
  description: 'Self-Healing Deployment & Incident Response System',
};

// Root layout component - wraps all pages in the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // React nodes to render inside the layout
}) {
  return (
    <html lang="en">
      {/* Body contains all child pages/components */}
      <body
        className="
          min-h-screen
          bg-[var(--background)]
          text-[var(--text)]
          antialiased
        "
      >
        <AuthProvider>
          <QueryProvider>
            <SocketProvider>{children}</SocketProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
