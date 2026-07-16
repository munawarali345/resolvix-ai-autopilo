

// ================================================================
// DASHBOARD HEALTH METRICS SERVICE
// ================================================================
//
// Purpose:
//
//
// agentStatus:
// ------------------------------------------------------------
// Dashboard health score.
//
// Fake monitoring system hai.
//
// Health ko incident severity ke basis per calculate
// kar rahe hain.
//
// Future:
//
// Prometheus
// Grafana
// Kubernetes
//
// se replace ho jayega.
// ------------------------------------------------------------
// ================================================================
import { DashboardIncidentOverview } from "../../types/dashboardOverview.types.js";


// ================================================================
// Dashboard Agent status
// ================================================================

export const getDashboardHealthMetrics =  (
      Overview: DashboardIncidentOverview,
) => {
  

const systemHealth = Math.max(

    0,

    100 -

    Overview.criticalIncidents * 15 -

    Overview.highIncidents * 8 -

    Overview.openIncidents * 3,

);

// ------------------------------------------------------------
// Incident Resolution Rate
//
// resolved / total
// ------------------------------------------------------------

const resolvedRate = Overview.totalIncidents === 0

    ? 100

    : Math.round(
        (Overview.resolvedIncidents / Overview.totalIncidents) * 100,
      );

// ------------------------------------------------------------
// Dashboard Health Object
// ------------------------------------------------------------

const healthMetrics = {

  systemHealth,

  resolvedRate,

};

   return healthMetrics; 


}