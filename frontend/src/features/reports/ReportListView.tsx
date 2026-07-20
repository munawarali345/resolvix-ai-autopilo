'use client';

// ================================================================
// REPORT LIST VIEW
// ================================================================
//
// Purpose:
//
// Main report listing container.
//
// Responsibilities:
//
// 1. Connect report hooks.
// 2. Handle loading/error.
// 3. Manage pagination.
// 4. Combine report components.
//
// Flow:
//
// page.tsx
//    ↓
// ReportListView
//    ↓
// React Query
//    ↓
// Report Components
//
// ================================================================

import { useState } from 'react';

import { useReports } from '@/hooks/usereports';

import ReportTable from '@/components/report/ReportTable';

import ReportPagination from '@/components/report/ReportPagination';

import type { PaginationParams } from '@/types/pagination.types';

// ================================================================
// COMPONENT
// ================================================================

export default function ReportListView() {
  // ------------------------------------------------
  // Pagination State
  // ------------------------------------------------

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,

    limit: 10,
  });

  // ------------------------------------------------
  // Fetch Reports
  // ------------------------------------------------

  const {
    reports,

    pagination: responsePagination,

    isLoading,

    error,
  } = useReports(pagination);

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (isLoading) {
    return <div className="p-6">Loading reports...</div>;
  }

  // ------------------------------------------------
  // Error
  // ------------------------------------------------

  if (error) {
    return <div className="p-6">Failed to load reports.</div>;
  }

  // ------------------------------------------------
  // Page Change Handler
  // ------------------------------------------------

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,

      page,
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold">Reports</h1>

        <p className="text-sm text-muted-foreground">
          View generated incident reports and analysis.
        </p>
      </div>

      {/* Table */}

      <ReportTable reports={reports} />

      {/* Pagination */}

      {responsePagination && (
        <ReportPagination
          pagination={responsePagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
