'use client';

// ================================================================
// REPORT DETAILS VIEW
// ================================================================
//
// Purpose:
//
// Main report details container.
//
// Responsibilities:
//
// 1. Fetch report details.
// 2. Handle loading/error.
// 3. Combine report components.
//
// Flow:
//
// page.tsx
//    ↓
// ReportDetailsView
//    ↓
// useReportById()
//    ↓
// Report Components
//
// ================================================================

import { useReportById } from '@/hooks/useReportById';

import ReportHeader from '@/components/report/ReportHeader';

import ReportSummary from '@/components/report/ReportSummary';

import ReportTechnical from '@/components/report/ReportTechnical';

import ReportTimeline from '@/components/report/ReportTimeline';

import ReportMetrics from '@/components/report/ReportMetrics';

// ================================================================
// TYPES
// ================================================================

interface ReportDetailsViewProps {
  reportId: string;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportDetailsView({
  reportId,
}: ReportDetailsViewProps) {
  const {
    data,

    isLoading,

    error,
  } = useReportById(reportId);

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (isLoading) {
    return <div className="p-6">Loading report...</div>;
  }

  // ------------------------------------------------
  // Error
  // ------------------------------------------------

  if (error || !data) {
    return <div className="p-6">Failed to load report.</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}

      <ReportHeader report={data} />

      {/* Summary */}

      <ReportSummary report={data} />

      {/* Technical */}

      <ReportTechnical report={data} />

      {/* Metrics */}

      <ReportMetrics metrics={data.metrics} />

      {/* Timeline */}

      <ReportTimeline timeline={data.timeline} />
    </div>
  );
}
