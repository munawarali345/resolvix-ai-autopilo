'use client';

// ================================================================
// INCIDENT INFO
// ================================================================
//
// Purpose:
//
// Incident ki detailed information display karna.
//
// Responsibilities:
//
// 1. Description
// 2. Root Cause
// 3. Fix Summary
// 4. Execution Status
// 5. MTTR
// 6. Resolved Date
//
// NOTE:
//
// UI only.
// No API.
// No hooks.
//
// Used By:
//
// IncidentDetailView
//
// ================================================================

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { Incident } from '@/types/incident.types';

// ================================================================
// TYPES
// ================================================================

interface IncidentInfoProps {
  incident: Incident;
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentInfo({ incident }: IncidentInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ------------------------------------------------ */}
        {/* Description */}
        {/* ------------------------------------------------ */}

        <div>
          <h4 className="text-sm font-semibold">Description</h4>

          <p className="mt-1 text-sm text-muted-foreground">
            {incident.description}
          </p>
        </div>

        {/* ------------------------------------------------ */}
        {/* Root Cause */}
        {/* ------------------------------------------------ */}

        <div>
          <h4 className="text-sm font-semibold">Root Cause</h4>

          <p className="mt-1 text-sm text-muted-foreground">
            {incident.rootCause ?? 'Not available'}
          </p>
        </div>

        {/* ------------------------------------------------ */}
        {/* Fix Summary */}
        {/* ------------------------------------------------ */}

        <div>
          <h4 className="text-sm font-semibold">Fix Summary</h4>

          <p className="mt-1 text-sm text-muted-foreground">
            {incident.fixSummary ?? 'Not available'}
          </p>
        </div>

        {/* ------------------------------------------------ */}
        {/* Metadata */}
        {/* ------------------------------------------------ */}

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold">Execution Status</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              {incident.executionStatus ?? 'Pending'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">MTTR</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              {incident.mttr != null ? `${incident.mttr} min` : 'N/A'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resolved At</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              {incident.resolvedAt
                ? new Date(incident.resolvedAt).toLocaleString()
                : 'Not resolved'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
