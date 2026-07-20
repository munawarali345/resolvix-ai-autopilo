'use client';

// ================================================================
// INCIDENT SEVERITY BADGE
// ================================================================
//
// Purpose:
//
// Incident severity ko color-coded badge ki form me show karna.
//
// Responsibilities:
//
// 1. Render severity badge.
// 2. Apply severity specific variant/styles.
// 3. Reusable across Incident module.
//
// Used By:
//
// - IncidentTable
// - IncidentDetail
//
// ================================================================

import { Badge } from '@/components/ui/badge';

import type { IncidentSeverity } from '@/types/incident.types';

// ================================================================
// TYPES
// ================================================================

interface IncidentSeverityBadgeProps {
  severity: IncidentSeverity;
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentSeverityBadge({
  severity,
}: IncidentSeverityBadgeProps) {
  const severityConfig = {
    critical: {
      label: 'Critical',

      className: 'bg-red-600 hover:bg-red-600 text-white',
    },

    high: {
      label: 'High',

      className: 'bg-orange-500 hover:bg-orange-500 text-white',
    },

    medium: {
      label: 'Medium',

      className: 'bg-yellow-500 hover:bg-yellow-500 text-black',
    },

    low: {
      label: 'Low',

      className: 'bg-green-600 hover:bg-green-600 text-white',
    },
  } satisfies Record<
    IncidentSeverity,
    {
      label: string;

      className: string;
    }
  >;

  const config = severityConfig[severity];

  return <Badge className={config.className}>{config.label}</Badge>;
}
