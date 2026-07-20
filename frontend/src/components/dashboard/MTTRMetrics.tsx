// ================================================================
// DASHBOARD MTTR METRICS
// ================================================================
//
// Purpose:
//
// Show Mean Time To Resolve metric.
//
// Responsibilities:
//
// 1. Display average incident resolution time.
//
// Data Source:
//
// Dashboard Aggregation API.
//
// ================================================================

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ================================================================
// TYPES
// ================================================================

interface MTTRMetricsProps {
  mttrMetrics: {
    // Average resolution time in minutes

    averageMTTR: number;
  };
}

// ================================================================
// COMPONENT
// ================================================================

export default function MTTRMetrics({ mttrMetrics }: MTTRMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average MTTR</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Mean Time To Resolve</p>

          <p className="mt-2 text-3xl font-bold">
            {mttrMetrics.averageMTTR}

            <span className="ml-2 text-base font-normal text-muted-foreground">
              min
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
