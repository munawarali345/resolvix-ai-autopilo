// ================================================================
// DASHBOARD CHARTS
// ================================================================
//
// Purpose:
//
// Dashboard analytics visualization.
//
// Responsibilities:
//
// 1. Incident trend.
// 2. Severity distribution.
// 3. MTTR trend.
// 4. Agent execution status.
//
// Data Source:
//
// Dashboard Aggregation API.
//
// ================================================================

// This component is the dashboard's visual analytics part. It converts backend numbers into charts.

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ================================================================
// TYPES
// ================================================================

interface DashboardChartsProps {
  charts: {
    incidentTrend: {
      date: string;

      incidents: number;
    }[];

    severityDistribution: {
      severity: string;

      count: number;
    }[];

    mttrTrend: {
      date: string;

      averageMttr: number;
    }[];

    agentStatus: {
      agent: string;

      success: number;

      failed: number;

      running: number;
    }[];
  };
}

// ================================================================
// COMPONENT
// ================================================================

export default function DashboardCharts({ charts }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ======================================================
    INCIDENT TREND
====================================================== */}

      <Card>
        <CardHeader>
          <CardTitle>Incident Trend</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={charts.incidentTrend}>
              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="incidents" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ======================================================
    SEVERITY DISTRIBUTION
====================================================== */}

      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={charts.severityDistribution}
                dataKey="count"
                nameKey="severity"
              >
                {charts.severityDistribution.map((item) => (
                  <Cell key={item.severity} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ======================================================
    MTTR TREND
====================================================== */}

      <Card>
        <CardHeader>
          <CardTitle>MTTR Trend</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={charts.mttrTrend}>
              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="averageMttr" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ======================================================
    AGENT STATUS
====================================================== */}

      <Card>
        <CardHeader>
          <CardTitle>Agent Status</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.agentStatus}>
              <XAxis dataKey="agent" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="success" />

              <Bar dataKey="failed" />

              <Bar dataKey="running" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
