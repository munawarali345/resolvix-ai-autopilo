'use client';

// ================================================================
// INCIDENT TABLE
// ================================================================
//
// Purpose:
//
// Incident list display karna.
//
// Responsibilities:
//
// 1. Show incident records.
// 2. Show severity.
// 3. Show status.
// 4. Navigate to incident details.
//
// Data Source:
//
// useIncidents hook se data ayega.
//
// ================================================================

import { useRouter } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import type { Incident } from '@/types/incident.types';

import IncidentSeverityBadge from './IncidentSeverityBadge';
import IncidentStatusBadge from './IncidentStatusBadge';

// ================================================================
// TYPES
// ================================================================

interface IncidentTableProps {
  incidents: Incident[];
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentTable({ incidents }: IncidentTableProps) {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left text-sm font-medium">Title</th>

                <th className="p-4 text-left text-sm font-medium">Severity</th>

                <th className="p-4 text-left text-sm font-medium">Status</th>

                <th className="p-4 text-left text-sm font-medium">Detected</th>

                <th className="p-4 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="cursor-pointer border-b hover:bg-muted/50"
                  onClick={() => router.push(`/incidents/${incident.id}`)}
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{incident.title}</p>

                      <p className="text-sm text-muted-foreground">
                        {incident.description}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <IncidentSeverityBadge severity={incident.severity} />
                  </td>

                  <td className="p-4">
                    <IncidentStatusBadge status={incident.status} />
                  </td>

                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(incident.detectedAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();

                        router.push(`/incidents/${incident.id}`);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {incidents.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No incidents found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
