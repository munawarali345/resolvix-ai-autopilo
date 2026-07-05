// ================================================================
// MAINTENANCE WINDOW FUNCTION
// ================================================================
//
// Purpose:
// Determines whether remediation execution is allowed
// according to the maintenance window policy.
//
// ================================================================

import { MAINTENANCE_WINDOW_POLICY } from '../../../config/maintaincepolicy.config.js';

export function checkMaintenanceWindow(input: {
  incident: { severity: string };
  environment: string;
  currentTime: string;
}) {
  const isProduction = input.environment === 'production';

  const severity = input.incident.severity;

  // ------------------------------------------------
  // Demo Maintenance Window
  // (Future: Replace with scheduler/calendar service)
  // Allowed Window: 02:00 - 04:00
  // ------------------------------------------------

  const currentHour = new Date(input.currentTime).getHours();

  const isMaintenanceWindowActive = currentHour >= 2 && currentHour < 4;

  // ------------------------------------------------
  // Production Policy
  // ------------------------------------------------

  if (
    isProduction &&
    MAINTENANCE_WINDOW_POLICY.requireMaintenanceWindow &&
    !isMaintenanceWindowActive
  ) {
    // Emergency override
    if (
      severity === 'critical' &&
      MAINTENANCE_WINDOW_POLICY.allowEmergencyExecution
    ) {
      return {
        maintenanceAllowed: true,
        windowReason: 'Emergency execution allowed for critical incident',
      };
    }

    return {
      maintenanceAllowed: false,
      windowReason: 'Execution is outside the approved maintenance window',
    };
  }

  // ------------------------------------------------
  // Allowed
  // ------------------------------------------------

  return {
    maintenanceAllowed: true,

    windowReason: isMaintenanceWindowActive
      ? 'Execution is within the approved maintenance window'
      : 'No maintenance window restriction applies',
  };
}
