// ================================================================
// REPORT DETAILS PAGE
// ================================================================
//
// Purpose:
//
// Report details route entry point.
//
// Responsibilities:
//
// 1. Read reportId from URL.
// 2. Pass it to ReportDetailsView.
//
// Flow:
//
// URL
//   ↓
// page.tsx
//   ↓
// ReportDetailsView
//   ↓
// Hooks
//   ↓
// Backend API
//
// ================================================================

import ReportDetailsView from '@/features/reports/ReportDetailsView';

// ================================================================
// TYPES
// ================================================================

interface ReportDetailsPageProps {
  params: {
    reportId: string;
  };
}

// ================================================================
// PAGE COMPONENT
// ================================================================

export default async function ReportDetailsPage({
  params,
}: ReportDetailsPageProps) {
  const { reportId } = await params;

  return <ReportDetailsView reportId={reportId} />;
}
