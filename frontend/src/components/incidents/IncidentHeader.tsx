'use client';

// ================================================================
// INCIDENT HEADER
// ================================================================
//
// Purpose:
//
// Incident detail page ka header.
//
// Responsibilities:
//
// 1. Show incident title.
// 2. Show severity badge.
// 3. Show status badge.
// 4. Show detected date.
//
// NOTE:
//
// UI only.
// No API calls.
// No business logic.
//
// Used By:
//
// IncidentDetailView
//
// ================================================================

import { Card, CardContent } from '@/components/ui/card';

import IncidentSeverityBadge from '../incidents/IncidentSeverityBadge';
import IncidentStatusBadge from '../incidents/IncidentStatusBadge';

import type { Incident } from '@/types/incident.types';

// ================================================================
// TYPES
// ================================================================

interface IncidentHeaderProps {
  incident: Incident;
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentHeader({ incident }: IncidentHeaderProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-6">
        {/* ------------------------------------------------ */}
        {/* Title */}
        {/* ------------------------------------------------ */}

        <div>
          <h2 className="text-2xl font-bold">{incident.title}</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Detected on {new Date(incident.detectedAt).toLocaleString()}
          </p>
        </div>

        {/* ------------------------------------------------ */}
        {/* Badges */}
        {/* ------------------------------------------------ */}

        <div className="flex flex-wrap items-center gap-3">
          <IncidentSeverityBadge severity={incident.severity} />

          <IncidentStatusBadge status={incident.status} />
        </div>
      </CardContent>
    </Card>
  );
}
