// ================================================================
// INCIDENT FILTER BUILDER
// ================================================================
//
// Purpose:
// API se aane wale filters ko MongoDB query me convert karta hai.
//
// Input:
// IncidentFilter
//
// Output:
// MongoDB filter object
// ================================================================

import { FilterQuery } from 'mongoose';

import { IncidentDocument } from '../../models/incident.model.js';

import { IncidentFilter } from '../../types/index.js';

// ================================================================
// INCIDENT FILTER BUILDER
// ================================================================

export const buildIncidentFilter = (
  filters: IncidentFilter,
): FilterQuery<IncidentDocument> => {
  // ------------------------------------------------
  // MongoDB query object
  // ------------------------------------------------

  const query: FilterQuery<IncidentDocument> = {};

  // ------------------------------------------------
  // Severity Filter
  // ------------------------------------------------

  if (filters.severity) {
    query.severity = filters.severity;
  }

  // ------------------------------------------------
  // Status Filter
  // ------------------------------------------------

  if (filters.status) {
    query.status = filters.status;
  }

  // ------------------------------------------------
  // Date Range Filter
  // ------------------------------------------------

  if (filters.startDate || filters.endDate) {
    query.detectedAt = {};

    if (filters.startDate) {
      query.detectedAt.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      query.detectedAt.$lte = new Date(filters.endDate);
    }
  }

  // ------------------------------------------------
  // Return MongoDB Filter
  // ------------------------------------------------

  return query;
};
