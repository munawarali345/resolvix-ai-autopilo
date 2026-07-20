'use client';

// ================================================================
// INCIDENT STATUS BADGE
// ================================================================
//
// Purpose:
//
// Incident status ko visual badge ki form me show karna.
//
// Responsibilities:
//
// 1. Render status badge.
// 2. Apply status specific styling.
// 3. Reusable across incident module.
//
// Used By:
//
// - IncidentTable
// - IncidentDetail
//
// ================================================================

import { Badge } from '@/components/ui/badge';

import type { IncidentStatus } from '@/types/incident.types';

// ================================================================
// TYPES
// ================================================================

interface IncidentStatusBadgeProps {
  status: IncidentStatus;
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentStatusBadge({
  status,
}: IncidentStatusBadgeProps) {
  const statusConfig = {
    open: {
      label: 'Open',

      className: 'bg-red-100 text-red-700 border-red-200',
    },

    in_progress: {
      label: 'In Progress',

      className: 'bg-blue-100 text-blue-700 border-blue-200',
    },

    resolved: {
      label: 'Resolved',

      className: 'bg-green-100 text-green-700 border-green-200',
    },

    rejected: {
      label: 'Rejected',

      className: 'bg-gray-100 text-gray-700 border-gray-200',
    },
  } satisfies Record<
    IncidentStatus,
    {
      label: string;

      className: string;
    }
  >;

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
