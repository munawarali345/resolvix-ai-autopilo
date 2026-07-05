// ================================================================
// MAINTENANCE WINDOW POLICY CONFIG
// ================================================================
//
// Purpose:
// Defines when system allows safe execution.
//
// No logic here — only rules.
//
// ================================================================

export const MAINTENANCE_WINDOW_POLICY = {
  requireMaintenanceWindow: true,

  allowEmergencyExecution: false,
} as const;
