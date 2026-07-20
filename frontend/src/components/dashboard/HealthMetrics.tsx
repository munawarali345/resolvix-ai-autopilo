// ================================================================
// DASHBOARD HEALTH METRICS
// ================================================================
//
// Purpose:
//
// Show system health overview.
//
// Responsibilities:
//
// 1. Display overall system health score.
// 2. Display incident resolution rate.
//
// Data Source:
//
// Dashboard Aggregation API.
//
// ================================================================
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// ================================================================
// TYPES
// ================================================================

interface HealthMetricsProps {
  healthMetrics: {
    // Overall system health score

    systemHealth: number;

    // Resolved incidents percentage

    resolvedRate: number;
  };
}

// ================================================================
// COMPONENT
// ================================================================

export default function HealthMetrics({ healthMetrics }: HealthMetricsProps) {
  const metrics = [
    {
      title: 'System Health',

      value: healthMetrics.systemHealth,

      badgeVariant: 'secondary' as const,
    },

    {
      title: 'Resolution Rate',

      value: healthMetrics.resolvedRate,

      badgeVariant: 'default' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {metrics.map((metric) => (
            <div key={metric.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {metric.title}
                </span>

                <Badge variant={metric.badgeVariant}>{metric.value}%</Badge>
              </div>

              <Progress value={metric.value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
