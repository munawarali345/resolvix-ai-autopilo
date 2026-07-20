'use client';

// ================================================================
// REPORT HEADER
// ================================================================
//
// Purpose:
//
// Report basic information display.
//
// Responsibilities:
//
// 1. Show report title.
// 2. Show incident status.
// 3. Show confidence.
// 4. Show created date.
//
// Used By:
//
// ReportDetailsView
//
// ================================================================

import { Card, CardContent } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import type { ReportDetails } from '@/types/report.types';

// ================================================================
// TYPES
// ================================================================

interface ReportHeaderProps {
  report: ReportDetails;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportHeader({ report }: ReportHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{report.title}</h1>

              <p className="text-sm text-muted-foreground">
                Incident ID: {report.incidentId}
              </p>
            </div>

            <Badge variant="outline">{report.incidentStatus}</Badge>
          </div>

          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">Confidence:</span>

            <span className="font-medium">{report.confidence}%</span>
          </div>

          {report.createdAt && (
            <p className="text-sm text-muted-foreground">
              Created: {new Date(report.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
