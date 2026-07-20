// ================================================================
// DASHBOARD INCIDENT OVERVIEW SERVICE
// ================================================================
//
// Purpose:
//
//
// incident overviews:
//------------------------------------------------------------
// Single aggregation query
//
// Is query se ek hi database call me:
//
// • Total Incidents
// • Open
// • In Progress
// • Resolved
// • Critical
// • High
// • Medium
// • Low
//
// sab calculate ho jayega.
// ------------------------------------------------------------
//
// ================================================================

import { IncidentModel } from '../../models/incident.model.js';

// ================================================================
// Dashboard incident overview
// ================================================================

export const getDashboardincidentOverview = async () => {
  const [incidentOverview] = await IncidentModel.aggregate([
    {
      $group: {
        _id: null,

        // Total incidents
        totalIncidents: {
          $sum: 1,
        },

        // -------------------------
        // Status Counts
        // -------------------------

        openIncidents: {
          $sum: {
            $cond: [{ $eq: ['$status', 'open'] }, 1, 0],
          },
        },

        inProgressIncidents: {
          $sum: {
            $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0],
          },
        },

        resolvedIncidents: {
          $sum: {
            $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0],
          },
        },

        // -------------------------
        // Severity Counts
        // -------------------------

        criticalIncidents: {
          $sum: {
            $cond: [{ $eq: ['$severity', 'critical'] }, 1, 0],
          },
        },

        highIncidents: {
          $sum: {
            $cond: [{ $eq: ['$severity', 'high'] }, 1, 0],
          },
        },

        mediumIncidents: {
          $sum: {
            $cond: [{ $eq: ['$severity', 'medium'] }, 1, 0],
          },
        },

        lowIncidents: {
          $sum: {
            $cond: [{ $eq: ['$severity', 'low'] }, 1, 0],
          },
        },
      },
    },
  ]);

  const overview = incidentOverview ?? {
    totalIncidents: 0,
    openIncidents: 0,
    inProgressIncidents: 0,
    resolvedIncidents: 0,
    criticalIncidents: 0,
    highIncidents: 0,
    mediumIncidents: 0,
    lowIncidents: 0,
  };

  return overview;
};
