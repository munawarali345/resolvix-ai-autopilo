'use client';

// ================================================================
// APP HEADER
// ================================================================
//
// Purpose:
//
// Top navigation bar.
//
// Responsibilities:
//
// 1. Display current page title.
// 2. Display notification button.
// 3. Display user menu.
//
// Used by:
//
// AppShell.
//
// ================================================================

import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';

// ================================================================
// COMPONENT
// ================================================================

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* ------------------------------------------------ */}
      {/* Left Section */}
      {/* ------------------------------------------------ */}

      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      {/* ------------------------------------------------ */}
      {/* Right Section */}
      {/* ------------------------------------------------ */}

      <div className="flex items-center gap-3">
        {/* Notification */}

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* User */}

        <Button variant="outline">Munawar Ali</Button>
      </div>
    </header>
  );
}
