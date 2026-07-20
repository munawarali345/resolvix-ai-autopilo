// ================================================================
// DASHBOARD MTTRMETRICS SERVICE
// ================================================================
//
// Purpose:
//
//
// MTTRMatrics:
//
//
// ================================================================

import { IncidentModel } from '../../models/incident.model.js';

// ================================================================
// Dashboard MTTR
// ================================================================

export const getDashboardMttrMetrics = async () => {
  // ============================================================
  // STEP 3
  // MTTR Metrics
  // ============================================================

  // ------------------------------------------------------------
  // Average MTTR
  //
  // Sirf resolved incidents consider kiye jayenge.
  //
  // Null MTTR ignore hogi.
  //
  // Result minutes me return hoga.
  // ------------------------------------------------------------

  const [mttrResult] = await IncidentModel.aggregate([
    {
      $match: {
        status: 'resolved',

        mttr: {
          $ne: null,
        },
      },
    },

    {
      $group: {
        _id: null,

        averageMTTR: {
          $avg: '$mttr',
        },
      },
    },
  ]);

  // ------------------------------------------------------------
  // Dashboard MTTR
  // ------------------------------------------------------------

  const mttrMetrics = {
    averageMTTR:
      mttrResult?.averageMTTR != null ? Math.round(mttrResult.averageMTTR) : 0,
  };

  return mttrMetrics;
};
