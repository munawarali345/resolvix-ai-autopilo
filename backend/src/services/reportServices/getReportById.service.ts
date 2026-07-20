// ================================================================
// GET REPORT DETAILS SERVICE
// ================================================================
//
// Purpose:
//
// Returns complete details of a single report.
//
// Flow:
//
// 1. Find report by id
// 2. If report doesn't exist return null
// 3. Map response
// 4. Return report
//
// ================================================================

import { ReportModel } from '../../models/report.model.js';

// ================================================================
// GET REPORT DETAILS
// ================================================================

export const getReportByIdService = async (reportId: string) => {
  // ------------------------------------------------
  // STEP 1
  // Find report
  // ------------------------------------------------

  const report = await ReportModel.findById(reportId).lean();

  // ------------------------------------------------
  // STEP 2
  // Report not found
  // ------------------------------------------------

  if (!report) {
    return null;
  }

  // ------------------------------------------------
  // STEP 3
  // Map report
  // Return only required fields
  // ------------------------------------------------

  const reportResponse = {
    id: report._id,

    incidentId: report.incidentId,

    title: report.title,

    summary: report.summary,

    executiveSummary: report.executiveSummary,

    technicalSummary: report.technicalSummary,

    incidentStatus: report.incidentStatus,

    confidence: report.confidence,

    timeline: report.timeline,

    metrics: report.metrics,

    createdAt: report.createdAt,
  };

  // ------------------------------------------------
  // STEP 4
  // Return response
  // ------------------------------------------------

  return reportResponse;
};
