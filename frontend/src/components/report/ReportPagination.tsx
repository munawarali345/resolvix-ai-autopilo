'use client';

// ================================================================
// REPORT PAGINATION
// ================================================================
//
// Purpose:
//
// Report list pagination controls.
//
// Responsibilities:
//
// 1. Show current page.
// 2. Move previous page.
// 3. Move next page.
// 4. Notify parent about page change.
//
// Data Source:
//
// Report pagination response.
//
// ================================================================

import { Button } from '@/components/ui/button';

import type { Pagination } from '@/types/pagination.types';

// ================================================================
// TYPES
// ================================================================

interface ReportPaginationProps {
  pagination?: Pagination;

  onPageChange: (page: number) => void;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ReportPagination({
  pagination,

  onPageChange,
}: ReportPaginationProps) {
  if (!pagination) return null;

  const {
    page,

    totalPages,

    total,
  } = pagination;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} • Total {total} reports
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
