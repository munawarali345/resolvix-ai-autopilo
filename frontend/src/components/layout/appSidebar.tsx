'use client';

// ================================================================
// APP SIDEBAR
// ================================================================
//
// Purpose:
//
// Main application navigation.
//
// Responsibilities:
//
// 1. Show navigation links.
// 2. Highlight active page.
// 3. Navigate between modules.
//
// Used by:
//
// AppShell.
//
// ================================================================

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { sidebarNavigation } from '@/constants/navigation';

import { cn } from '@/lib/utils';

// ================================================================
// COMPONENT
// ================================================================

export default function AppSidebar() {
  // ------------------------------------------------
  // Current active route
  // ------------------------------------------------

  const pathname = usePathname(); // Next.js hook that returns current URL path

  return (
    <aside className="w-64 border-r bg-background">
      {/* Logo */}

      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-bold">Resolvix AI</h2>
      </div>

      {/* Navigation */}

      <nav className="p-3">
        <ul className="space-y-2">
          {sidebarNavigation.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',

                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted',
                  )}
                >
                  <Icon className="h-4 w-4" />

                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

// const pathname = usePathname();
// Next.js hook that returns the current URL path.
// Example:
// If the URL is:
// /dashboard
// then pathname = "/dashboard"
// If:
// /incidents
// then pathname = "/incidents"
// It returns only the current URL path.

// First return
// return (
//    <aside>
//       ...
//    </aside>
// )
// This is the full Sidebar component return.
// React components always return JSX.
// Example:
// AppSidebar()
//         │
//         ▼
// return JSX
// This is the first return.

// Second return
// This is your confusion.
// return (
// <li>
// ....
// </li>
// )
// This is NOT the React component return.
// This is only the
// map()
// callback return.
// Example:
// map()
//    │
// One item received
//    │
// return <li>
// Then next item.
// Then:
// return <li>
// Then next item.
// Example:
// Dashboard
// ↓
// return <li>
// ----------------
// Incident
// ↓
// return <li>
// ----------------
// Reports
// ↓
// return <li>
// These three <li> are created.
// Then map converts them to array.
// [
//  <li/>,
//  <li/>,
//  <li/>
// ]
// This array goes inside
// <ul>
