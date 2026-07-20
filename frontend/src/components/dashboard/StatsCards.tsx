// ================================================================
// DASHBOARD STATS CARDS
// ================================================================
//
// Purpose:
//
// Show incident overview summary.
//
// Responsibilities:
//
// 1. Display total incidents.
// 2. Display open incidents.
// 3. Display in progress incidents.
// 4. Display resolved incidents.
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

interface StatsCardsProps {
  incidentOverview: {
    // Total incidents count

    totalIncidents: number;

    // Currently open incidents

    openIncidents: number;

    // Currently processing incidents

    inProgressIncidents: number;

    // Resolved incidents

    resolvedIncidents: number;
  };
}

// ================================================================
// COMPONENT
// ================================================================

export default function StatsCards({ incidentOverview }: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Incidents',

      value: incidentOverview.totalIncidents,
    },

    {
      title: 'Open Incidents',

      value: incidentOverview.openIncidents,
    },

    {
      title: 'In Progress',

      value: incidentOverview.inProgressIncidents,
    },

    {
      title: 'Resolved Incidents',

      value: incidentOverview.resolvedIncidents,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
