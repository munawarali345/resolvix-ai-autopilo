'use client';

// ================================================================
// REPORT TECHNICAL SUMMARY
// ================================================================
//
// Purpose:
//
// Technical incident analysis display.
//
// Responsibilities:
//
// 1. Show technical summary.
// 2. Display AI generated technical analysis.
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

interface ReportTechnicalProps {
  report: ReportDetails;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportTechnical({ report }: ReportTechnicalProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Analysis</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {report.technicalSummary}
        </p>
      </CardContent>
    </Card>
  );
}
