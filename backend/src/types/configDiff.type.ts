// ================================================================
// CONFIGURATION DIFF TYPES
// ================================================================
//
// Purpose:
// Defines configuration change history used by
// Config Diff Tool.
//
// Future:
// Can be loaded from Git,
// Kubernetes,
// Terraform,
// MongoDB,
// AWS Config,
// Azure Configuration History.
//
// ================================================================

import { logService } from './index.js';

// ================================================================
// CONFIGURATION CHANGE
// ================================================================

export interface ConfigurationChange {
  // Unique change id.
  id: string;

  // Service name.
  service: logService;

  // Previous configuration version.
  previousConfigurationVersion: string;

  // Current configuration version.
  currentConfigurationVersion: string;

  // Changed field.
  field: string;

  // Previous value.
  previousValue: string;

  // Current value.
  currentValue: string;

  // Why this change happened.
  reason: string;

  // Change timestamp.
  changedAt: Date;
}
