// ================================================================
// FIX AGENT TOOL TYPES
// ================================================================
//
// Purpose:
// Shared input/output contracts for all Fix Agent tools.
//
// These tools are READ-ONLY.
// They only retrieve recommendations and operational information.
//
// ================================================================

import { Environment } from './configurationTool.type.js';
import { IncidentSeverity } from './incident.type.js';
import { logService } from './log.type.js';
import { RunbookStep } from './runbook.types.js';
import { RunbookEstimatedTime } from './runbook.types.js';

// ================================================================
// Shared Input
// ================================================================

export interface FixToolIncidentContext {
  title: string;

  description: string;

  severity: IncidentSeverity;

  rootCause: string;
}

export interface FixToolInput {
  incident: FixToolIncidentContext;

  affectedServices: logService[];
}

export interface AffectedServicesToolInput {
  affectedServices: logService[];
}

// ================================================================
// Search Fix Playbook Tool
// ================================================================

export interface SearchFixPlaybookOutput {
  playbooks: {
    id: string;

    title: string;

    summary: string;

    relevanceScore: number;
  }[];
}

// ================================================================
// Search Runbook Tool
// ================================================================

export interface SearchRunbookOutput {
  runbooks: {
    id: string;

    title: string;

    service: logService[];

    severity: IncidentSeverity;

    estimatedTime: RunbookEstimatedTime;

    automationLevel: 'manual' | 'semi-automated' | 'automated';

    steps: RunbookStep[];

    relevanceScore: number;
  }[];
}

// ================================================================
// Configuration Reader Tool
// ================================================================

export interface ConfigurationReaderOutput {
  configurations: {
    service: logService;

    version: string;

    environment: Environment;

    image: string;

    replicas: number;

    cpuLimit: string;

    memoryLimit: string;

    connectionPool?: number;

    requestTimeout?: number;

    autoScaling: boolean;

    configurationVersion: string;
  }[];
}

// ================================================================
// Configuration Diff Tool
// ================================================================

export interface ConfigurationDiffOutput {
  changes: {
    id: string;

    service: logService;

    field: string;

    previousValue: string;

    currentValue: string;

    previousConfigurationVersion: string;

    currentConfigurationVersion: string;

    reason: string;

    changedAt: Date;
  }[];
}

// ================================================================
// Service Inventory Tool
// ================================================================

export interface ServiceInventoryOutput {
  services: {
    id: string;

    name: logService;

    owner: string;

    team: string;

    environment: Environment;

    version: string;

    runtime: string;

    repository: string;

    criticality: IncidentSeverity;
  }[];
}
