// ================================================================
// PAGINATION TYPES
// ================================================================
//
// Purpose:
// Backend pagination response ko type karna.
//
// Used by:
// - Incidents
// - Reports
// - Future tables
//
// ================================================================

// ================================================================
// PAGINATION RESPONSE
// ================================================================

export type Pagination = {
  total: number;

  page: number;

  limit: number;

  totalPages: number;
};

export type PaginationParams = {
  page: number;

  limit: number;
};
