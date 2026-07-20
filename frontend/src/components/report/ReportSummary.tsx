'use client';

// ================================================================
// REPORT SUMMARY
// ================================================================
//
// Purpose:
//
// Report summary information display.
//
// Responsibilities:
//
// 1. Show report summary.
// 2. Show executive summary.
//
// Used By:
//
// ReportDetailsView
//
// ================================================================

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { ReportDetails } from '@/types/report.types';

// ================================================================
// TYPES
// ================================================================

interface ReportSummaryProps {
  report: ReportDetails;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportSummary({ report }: ReportSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ------------------------------------------------ */}
        {/* Basic Summary */}
        {/* ------------------------------------------------ */}

        <div>
          <h3 className="mb-2 text-sm font-semibold">Incident Summary</h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {report.summary}
          </p>
        </div>

        {/* ------------------------------------------------ */}
        {/* Executive Summary */}
        {/* ------------------------------------------------ */}

        <div>
          <h3 className="mb-2 text-sm font-semibold">Executive Summary</h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {report.executiveSummary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
