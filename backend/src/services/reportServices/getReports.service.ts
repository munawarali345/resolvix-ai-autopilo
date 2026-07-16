// ================================================================
// GET REPORTS SERVICE
// ================================================================
//
// Purpose:
//
// Returns paginated list of reports.
//
// Flow:
//
// 1. Count total reports
// 2. Fetch reports
// 3. Map only required fields
// 4. Return paginated response
//
// ================================================================

import { ReportModel } from '../../models/report.model.js';

import { PaginationOptions } from '../../types/index.js';

// ================================================================
// GET REPORTS
// ================================================================

export const getReportsService = async (
  pagination: PaginationOptions,
) => {

  // ------------------------------------------------
  // STEP 1
  // Count total reports
  // means Database me kitni reports hain?
  // ------------------------------------------------

  const totalReports = await ReportModel.countDocuments();

  // ------------------------------------------------
  // STEP 2
  // Fetch reports
  // ------------------------------------------------

  const reports = await ReportModel.find()

    .sort({

      createdAt: -1,

    })

    .skip(pagination.skip)

    .limit(pagination.limit)

    .lean();

  // ------------------------------------------------
  // STEP 3
  // Return only required fields
  // ------------------------------------------------

  const reportList = reports.map((report) => ({

    id: report._id,

    incidentId: report.incidentId,

    title: report.title,

    summary: report.summary,

    incidentStatus: report.incidentStatus,

    confidence: report.confidence,

    createdAt: report.createdAt,

  }));

  // ------------------------------------------------
  // STEP 4
  // Return response
  // ------------------------------------------------

  return {

    reports: reportList,

    pagination: {

      total: totalReports,

      page: pagination.page,

      limit: pagination.limit,

      totalPages: Math.ceil(totalReports / pagination.limit),

    },

  };

};