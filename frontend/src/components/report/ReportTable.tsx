'use client';

// ================================================================
// REPORT TABLE
// ================================================================
//
// Purpose:
//
// Report list display karna.
//
// Responsibilities:
//
// 1. Show report records.
// 2. Show incident status.
// 3. Show confidence.
// 4. Navigate to report details.
//
// Data Source:
//
// useReports hook se data ayega.
//
// ================================================================

import { useRouter } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import type { Report } from '@/types/report.types';

import ReportStatusBadge from './ReportStatusBadge';

// ================================================================
// TYPES
// ================================================================

interface ReportTableProps {
  reports: Report[];
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportTable({ reports }: ReportTableProps) {
  const router = useRouter();

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left text-sm font-medium">Title</th>

                <th className="p-4 text-left text-sm font-medium">Summary</th>

                <th className="p-4 text-left text-sm font-medium">Status</th>

                <th className="p-4 text-left text-sm font-medium">
                  Confidence
                </th>

                <th className="p-4 text-left text-sm font-medium">Created</th>

                <th className="p-4 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-muted/50">
                  {/* Title */}

                  <td className="p-4">
                    <div>
                      <p className="font-medium">{report.title}</p>

                      <p className="text-sm text-muted-foreground">
                        Incident ID: {report.incidentId}
                      </p>
                    </div>
                  </td>

                  {/* Summary */}

                  <td className="p-4">
                    <p className="text-sm text-muted-foreground max-w-md">
                      {report.summary}
                    </p>
                  </td>

                  {/* Status */}

                  <td className="p-4">
                    <ReportStatusBadge status={report.incidentStatus} />
                  </td>

                  {/* Confidence */}

                  <td className="p-4">
                    <p className="text-sm">{report.confidence}%</p>
                  </td>

                  {/* Created */}

                  <td className="p-4 text-sm text-muted-foreground">
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString()
                      : '-'}
                  </td>

                  {/* Action */}

                  <td className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/reports/${report.id}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reports.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No reports found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
