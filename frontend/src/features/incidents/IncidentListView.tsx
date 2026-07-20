'use client';

// ================================================================
// INCIDENT LIST VIEW
// ================================================================
//
// Purpose:
//
// Main incident listing container.
//
// Responsibilities:
//
// 1. Connect incident hooks.
// 2. Handle loading/error.
// 3. Combine incident components.
//
// Flow:
//
// page.tsx
//    ↓
// IncidentListView
//    ↓
// React Query
//    ↓
// Incident Components
//
// ================================================================

import { useState } from 'react';

import type { IncidentFilter } from '@/types/incident.types';

import type { PaginationParams } from '@/types/pagination.types';

import { useIncidents } from '@/hooks/useIncidents';

import IncidentFilters from '@/components/incidents/IncidentFilters';

import IncidentTable from '@/components/incidents/IncidentTable';

import IncidentPagination from '@/components/incidents/IncidentPagination';

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentListView() {
  const [filters, setFilters] = useState<IncidentFilter>({});

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,

    limit: 10,
  });

  const {
    incidents,

    pagination: paginationData,

    isLoading,

    error,
  } = useIncidents(
    filters,

    pagination,
  );

  const handleFilterChange = (newFilters: IncidentFilter) => {
    setFilters(newFilters);

    setPagination({
      ...pagination,

      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,

      page,
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading incidents...</div>;
  }

  if (error) {
    return <div className="p-6">Failed to load incidents.</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">Incidents</h1>

        <p className="text-sm text-muted-foreground">
          Monitor and manage system incidents.
        </p>
      </div>

      {/* Filters */}

      <IncidentFilters filters={filters} onChange={handleFilterChange} />

      {/* Table */}

      <IncidentTable incidents={incidents} />

      {/* Pagination */}

      {paginationData && (
        <IncidentPagination
          pagination={paginationData}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
