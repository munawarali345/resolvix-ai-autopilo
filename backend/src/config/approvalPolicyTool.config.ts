// ================================================================
// APPROVAL POLICY CONFIG
// ================================================================
//
// Purpose:
// Central approval policy configuration used by the
// Approval Policy Tool.
//
// This file contains ONLY business rules.
//
// No decision logic should be placed here.
//
// ================================================================

import { IncidentSeverity, logService, Environment } from '../types/index.js';

// ================================================================
// SERVICE POLICY
// ================================================================
//
// Services that always require manual approval
// before executing a remediation.
//
// ================================================================

export const SERVICE_POLICY: readonly logService[] = [
  'database',

  'payment-service',

  'authentication',

  'deployment',
];

// ================================================================
// SEVERITY POLICY
// ================================================================
//
// Incident severities requiring manual approval.
//
// ================================================================

export const SEVERITY_POLICY: readonly IncidentSeverity[] = [
  'critical',

  'high',
];

// ================================================================
// ENVIRONMENT POLICY
// ================================================================
//
// Environments where automatic execution
// is restricted.
//
// ================================================================

export const ENVIRONMENT_POLICY: readonly Environment[] = ['production'];

// ================================================================
// CRITICALITY POLICY
// ================================================================
//
// Service criticality levels requiring
// manual approval.
//
// ================================================================

export const CRITICALITY_POLICY: readonly IncidentSeverity[] = [
  'critical',

  'high',
];

// ================================================================
// MAINTENANCE WINDOW POLICY
// ================================================================
//
// Whether execution outside an approved
// maintenance window requires approval.
//
// ================================================================

// ================================================================
// APPROVAL POLICY
// ================================================================

export const APPROVAL_POLICY = {
  services: SERVICE_POLICY,

  severities: SEVERITY_POLICY,

  environments: ENVIRONMENT_POLICY,

  criticality: CRITICALITY_POLICY,
} as const;
