'use client';

// ================================================================
// APP SHELL
// ================================================================
//
// Purpose:
//
// Main dashboard application layout.
//
// Responsibilities:
//
// 1. Render sidebar.
// 2. Render header.
// 3. Render page content.
//
// Used by:
//
// Dashboard
// Incidents
// Reports
//
// ================================================================

import type { ReactNode } from 'react';

import AppSidebar from './appSidebar';

import AppHeader from './app-header';

// ================================================================
// PROPS
// ================================================================

interface AppShellProps {
  children: ReactNode;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <aside>
        <AppSidebar />
      </aside>

      {/* Main Area */}

      <div className="flex flex-1 flex-col">
        {/* Header */}

        <header>
          <AppHeader />
        </header>

        {/* Page Content */}

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

// AppShell
//      │
//      ▼
// <AppSidebar />
//      │
//      ▼
// usePathname()
//      │
//      ▼
// Current URL
//      │
//      ▼
// sidebarNavigation
//      │
//      ▼
// map()
//      │
//      ▼
// Har route ka Link banao
//      │
//      ▼
// Sidebar Render
