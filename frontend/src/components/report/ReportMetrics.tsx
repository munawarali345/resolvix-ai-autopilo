'use client';

// ================================================================
// REPORT METRICS
// ================================================================
//
// Purpose:
//
// Incident execution metrics display.
//
// Responsibilities:
//
// 1. Detection time.
// 2. Diagnosis time.
// 3. Execution time.
// 4. Total resolution time.
// 5. MTTR.
//
// Used By:
//
// ReportDetailsView
//
// ================================================================

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { ReportMetrics as ReportMetricsType } from '@/types/report.types';

// ================================================================
// TYPES
// ================================================================

interface ReportMetricsProps {
  metrics: ReportMetricsType;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportMetrics({ metrics }: ReportMetricsProps) {
  const metricCards = [
    {
      label: 'Detection Time',

      value: metrics.detectionTime,
    },

    {
      label: 'Diagnosis Time',

      value: metrics.diagnosisTime,
    },

    {
      label: 'Execution Time',

      value: metrics.executionTime,
    },

    {
      label: 'Total Time',

      value: metrics.totalTime,
    },

    {
      label: 'MTTR',

      value: metrics.mttr,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-5">
          {metricCards.map((metric) => (
            <div key={metric.label} className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">{metric.label}</p>

              <p className="mt-2 text-xl font-bold">
                {metric.value ?? 'N/A'}{' '}
                <span className="text-sm font-normal">sec</span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
