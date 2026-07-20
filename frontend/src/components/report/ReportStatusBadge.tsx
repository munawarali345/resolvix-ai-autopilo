'use client';

// ================================================================
// REPORT STATUS BADGE
// ================================================================
//
// Purpose:
//
// Display report incident status as a visual badge.
//
// Responsibilities:
//
// 1. Render report status.
// 2. Apply status specific styling.
// 3. Reusable across report module.
//
// Used By:
//
// - ReportTable
// - ReportDetail
//
// ================================================================

import { Badge } from '@/components/ui/badge';

import type { ReportIncidentStatus } from '@/types/report.types';

// ================================================================
// TYPES
// ================================================================

interface ReportStatusBadgeProps {
  status: ReportIncidentStatus;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const statusConfig = {
    RESOLVED: {
      label: 'Resolved',

      className: 'bg-green-100 text-green-700 border-green-200',
    },

    FAILED: {
      label: 'Failed',

      className: 'bg-red-100 text-red-700 border-red-200',
    },

    ROLLED_BACK: {
      label: 'Rolled Back',

      className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
  } satisfies Record<
    ReportIncidentStatus,
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
