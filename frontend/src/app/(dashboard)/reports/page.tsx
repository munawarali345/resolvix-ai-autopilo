// ================================================================
// REPORT PAGE
// ================================================================
//
// Purpose:
//
// Report route entry point.
//
// Responsibilities:
//
// 1. Render report list view.
// 2. Keep route layer separate from UI logic.
//
// Flow:
//
// URL
//   ↓
// page.tsx
//   ↓
// ReportListView
//   ↓
// Hooks
//   ↓
// Services
//   ↓
// Backend API
//
// ================================================================

import ReportListView from '@/features/reports/ReportListView';

// ================================================================
// PAGE COMPONENT
// ================================================================

export default function ReportPage() {
  return <ReportListView />;
}
