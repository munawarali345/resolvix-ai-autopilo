'use client';

// ================================================================
// REPORT TIMELINE
// ================================================================
//
// Purpose:
//
// Completed incident execution history display.
//
// Responsibilities:
//
// 1. Show timeline events.
// 2. Show executing agent.
// 3. Show event timestamp.
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

interface ReportTimelineProps {
  timeline: ReportDetails['timeline'];
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportTimeline({ timeline }: ReportTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Timeline</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="border-l-2 pl-4">
              <p className="font-medium">{item.event}</p>

              <p className="text-sm text-muted-foreground">
                Agent: {item.agent}
              </p>

              <p className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}

          {timeline.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No timeline available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
