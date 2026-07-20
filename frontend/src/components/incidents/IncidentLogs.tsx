'use client';

// ================================================================
// INCIDENT LOGS
// ================================================================
//
// Purpose:
//
// Incident ke related logs display karna.
//
// Responsibilities:
//
// 1. Render logs.
// 2. Show service.
// 3. Show log level.
// 4. Show message.
// 5. Show timestamp.
//
// NOTE:
//
// UI only.
// No hooks.
// No API.
//
// Used By:
//
// IncidentDetailView
//
// ================================================================

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { IncidentLog } from '@/types/incident.types';

// ================================================================
// TYPES
// ================================================================

interface IncidentLogsProps {
  logs: IncidentLog[];
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentLogs({ logs }: IncidentLogsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Logs</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {logs.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No logs available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="p-4 text-left text-sm font-medium">Service</th>

                  <th className="p-4 text-left text-sm font-medium">Level</th>

                  <th className="p-4 text-left text-sm font-medium">Message</th>

                  <th className="p-4 text-left text-sm font-medium">Time</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 text-sm">{log.service}</td>

                    <td className="p-4">
                      <span
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          log.level === 'ERROR'
                            ? 'bg-red-100 text-red-700'
                            : log.level === 'WARN'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {log.level}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-muted-foreground">
                      {log.message}
                    </td>

                    <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
