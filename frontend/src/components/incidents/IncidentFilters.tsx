// ================================================================
// INCIDENT FILTERS
// ================================================================
//
// Purpose:
//
// Incident list filtering UI.
//
// Responsibilities:
//
// 1. Severity filter.
// 2. Status filter.
// 3. Sort filter.
// 4. Order filter.
// 5. Reset filters.
//
// NOTE:
//
// Backend supported filters only.
//
// ================================================================

'use client';

import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { IncidentFilter } from '@/types/incident.types';

// ================================================================
// TYPES
// ================================================================

interface IncidentFiltersProps {
  filters: IncidentFilter;

  onChange: (filters: IncidentFilter) => void;
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentFilters({
  filters,

  onChange,
}: IncidentFiltersProps) {
  return (
    <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-5">
      {/* ------------------------------------------------ */}
      {/* Severity */}
      {/* ------------------------------------------------ */}

      <div className="space-y-2">
        <Label>Severity</Label>

        <Select
          value={filters.severity ?? 'all'}
          onValueChange={(value) =>
            onChange({
              ...filters,

              severity:
                value === 'all'
                  ? undefined
                  : (value as IncidentFilter['severity']),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Severity" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            <SelectItem value="critical">Critical</SelectItem>

            <SelectItem value="high">High</SelectItem>

            <SelectItem value="medium">Medium</SelectItem>

            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ------------------------------------------------ */}
      {/* Status */}
      {/* ------------------------------------------------ */}

      <div className="space-y-2">
        <Label>Status</Label>

        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            onChange({
              ...filters,

              status:
                value === 'all'
                  ? undefined
                  : (value as IncidentFilter['status']),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            <SelectItem value="open">Open</SelectItem>

            <SelectItem value="in_progress">In Progress</SelectItem>

            <SelectItem value="resolved">Resolved</SelectItem>

            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ------------------------------------------------ */}
      {/* Sort */}
      {/* ------------------------------------------------ */}

      <div className="space-y-2">
        <Label>Sort By</Label>

        <Select
          value={filters.sort ?? 'createdAt'}
          onValueChange={(value) =>
            onChange({
              ...filters,

              sort: value as IncidentFilter['sort'],
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="createdAt">Created At</SelectItem>

            <SelectItem value="detectedAt">Detected At</SelectItem>

            <SelectItem value="severity">Severity</SelectItem>

            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ------------------------------------------------ */}
      {/* Order */}
      {/* ------------------------------------------------ */}

      <div className="space-y-2">
        <Label>Order</Label>

        <Select
          value={filters.order ?? 'desc'}
          onValueChange={(value) =>
            onChange({
              ...filters,

              order: value as IncidentFilter['order'],
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>

            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ------------------------------------------------ */}
      {/* Reset */}
      {/* ------------------------------------------------ */}

      <div className="flex items-end">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onChange({})}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
