// ================================================================
// RISK VALIDATOR TOOL TYPES
// ================================================================
//
// Purpose:
// Shared input/output contracts for all Risk Validator tools.
//
// These tools are READ-ONLY.
//
// They validate whether the Fix Agent recommendation
// is safe for execution.
//
// ================================================================

import {
  IncidentSeverity,
  logService,
  FixAgentOutput,
  FixAgentArtifacts,
} from './index.js';

// ================================================================
// Shared Incident Context
// ================================================================

export interface RiskToolIncidentContext {
  title: string;

  description: string;

  severity: IncidentSeverity;
}

// ================================================================
// Shared Tool Input
// ================================================================

export interface RiskToolInput {
  incident: RiskToolIncidentContext;

  recommendation: FixAgentOutput;

  artifacts: FixAgentArtifacts;
}

// ================================================================
// Approval Policy Tool
// ================================================================

export interface ApprovalPolicyOutput {
  approvalRequired: boolean;

  approvalReason: string;
}

// ================================================================
// Maintenance Window Tool
// ================================================================

export interface MaintenanceWindowOutput {
  maintenanceAllowed: boolean;

  windowReason: string;
}

// ================================================================
// Impact Assessment Tool
// ================================================================

export interface ImpactAssessmentOutput {
  safeToExecute: boolean;

  potentialImpacts: string[];

  affectedServices: logService[];
}

// ================================================================
// Missing Validation Tool
// ================================================================

export interface MissingValidationOutput {
  missingChecks: string[];

  validationPassed: boolean;
}
