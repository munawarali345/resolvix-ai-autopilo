
// ================================================================
// GET INCIDENTS SERVICE
// ================================================================
//
// Purpose:
// Incident list fetch karna.
//
// Flow:
//
// 1. Build MongoDB filters
// 2. Count total matching incidents
// 3. Apply sorting
// 4. Apply pagination
// 5. Fetch incidents
// 6. Return paginated result
//
// ================================================================

import { IncidentModel } from '../../models/incident.model.js';

import { IncidentFilter, PaginationOptions } from '../../types/index.js';

import { buildIncidentFilter } from './incident.filter.js';

// ================================================================
// GET INCIDENTS
// ================================================================

export const getIncidentsService = async (
  filters: IncidentFilter,
  pagination: PaginationOptions
) => {

  // ------------------------------------------------
  // STEP 1
  // Build MongoDB filter object
  // ------------------------------------------------

  const query = buildIncidentFilter(filters);

  // ------------------------------------------------
  // STEP 2
  // Count total matching incidents
  // ------------------------------------------------

  const totalIncidents = await IncidentModel.countDocuments(query);

  // ------------------------------------------------
  // STEP 3
  // Build sorting object
  // ------------------------------------------------

  const sortField = filters.sort ?? 'createdAt';

  const sortOrder = filters.order === 'asc' ? 1 : -1;

  // ------------------------------------------------
  // STEP 4
  // Fetch incidents
  // ------------------------------------------------

  const incidents = await IncidentModel.find(query)

    .sort({ [sortField]: sortOrder })

    .skip(pagination.skip)

    .limit(pagination.limit)

    .lean();

  // ------------------------------------------------
  // STEP 5
  // Return paginated response
  // ------------------------------------------------

  return {

    incidents,

    pagination: {

      total: totalIncidents,

      page: pagination.page,

      limit: pagination.limit,

      totalPages: Math.ceil(totalIncidents / pagination.limit),

    },

  };

};