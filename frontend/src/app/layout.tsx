// Import Next.js metadata type for page head configuration
import type { Metadata } from 'next';
import React from 'react';

// Import global CSS styles including Tailwind and shadcn variables
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
