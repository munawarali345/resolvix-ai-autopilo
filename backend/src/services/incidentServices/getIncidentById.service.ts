// ================================================================
// GET INCIDENT DETAILS SERVICE
// ================================================================
//
// Purpose:
//
// Returns complete information for a single incident.
//
// Flow:
//
// 1. Find incident by id
// 2. If incident doesn't exist return null
// 3. Fetch incident logs
// 4. Map response
// 5. Return clean response
//
// ================================================================

import { IncidentModel } from '../../models/incident.model.js';
import { LogModel } from '../../models/log.model.js';

// ================================================================
// GET INCIDENT DETAILS
// ================================================================

export const getIncidentDetailsService = async (incidentId: string) => {
  // ------------------------------------------------
  // STEP 1
  // Find incident
  // ------------------------------------------------

  const incident = await IncidentModel.findById(incidentId).lean();

  // ------------------------------------------------
  // STEP 2
  // Incident not found
  // ------------------------------------------------

  if (!incident) {
    return null;
  }

  // ------------------------------------------------
  // STEP 3
  // Fetch incident logs
  // ------------------------------------------------

  const logs = await LogModel.find({
    incidentId,
  })

    .sort({
      timestamp: -1,
    })

    .lean();

  // -----------------------------------------------------------------------------
  // STEP 4
  // Map incident
  // Remove unnecessary database fields
  // yaha map isliye use ni hua he kun ki incident ek object he or logs ek arry he
  // ------------------------------------------------------------------------------

  const incidentResponse = {
    id: incident._id,

    title: incident.title,

    description: incident.description,

    severity: incident.severity,

    status: incident.status,

    detectedAt: incident.detectedAt,

    rootCause: incident.rootCause,

    fixSummary: incident.fixSummary,

    executionStatus: incident.executionStatus,

    resolvedAt: incident.resolvedAt,

    mttr: incident.mttr,
  };

  // ------------------------------------------------
  // STEP 5
  // Map logs
  // ------------------------------------------------

  const logsResponse = logs.map((log) => ({
    service: log.service,

    level: log.level,

    message: log.message,

    timestamp: log.timestamp,
  }));

  // ------------------------------------------------
  // STEP 6
  // Return clean response
  // ------------------------------------------------

  return {
    incident: incidentResponse,

    logs: logsResponse,
  };
};
