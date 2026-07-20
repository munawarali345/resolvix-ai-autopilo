// ================================================================
// DASHBOARD PAGE
// ================================================================
//
// Purpose:
//
// Dashboard route entry point.
//
// Responsibilities:
//
// 1. Render dashboard view.
// 2. Keep route layer separate from UI logic.
//
// Flow:
//
// URL
//   ↓
// page.tsx
//   ↓
// DashboardView
//   ↓
// Hooks
//   ↓
// Services
//   ↓
// Backend API
//
// ================================================================

import DashboardView from '@/features/dashboard/DashboardView';

// ================================================================
// PAGE COMPONENT
// ================================================================

export default function DashboardPage() {
  return <DashboardView />;
}
