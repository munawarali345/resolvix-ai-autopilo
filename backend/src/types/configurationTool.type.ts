// ================================================================
// CONFIGURATION TYPES
// ================================================================
//
// Purpose:
// Defines configuration records used by the
// Configuration Reader Tool.
//
// Future:
// This data can be loaded from MongoDB,
// Kubernetes ConfigMaps,
// AWS Parameter Store,
// Azure App Configuration,
// HashiCorp Vault,
// or any centralized configuration service.
//
// ================================================================

import { IncidentSeverity, logService } from './index.js';

// ================================================================
// DEPLOYMENT ENVIRONMENT
// ================================================================

export type Environment = 'development' | 'staging' | 'production';

// ================================================================
// SERVICE CONFIGURATION
// ================================================================

export interface ServiceConfiguration {
  // Unique configuration identifier.
  id: string;

  // Service name.
  service: logService;

  // Current deployment environment.
  environment: Environment;

  // Running application version.
  version: string;

  // Running container image.
  image: string;

  // Number of running replicas.
  replicas: number;

  // CPU resource limit.
  cpuLimit: string;

  // Memory resource limit.
  memoryLimit: string;

  // Maximum database connection pool.
  connectionPool?: number;

  // API request timeout (seconds).
  requestTimeout?: number;

  // Horizontal Auto Scaling enabled.
  autoScaling: boolean;

  // Configuration version.
  configurationVersion: string;

  // Last configuration update time.
  lastUpdated: Date;

  // Incident severities supported by this configuration.
  supportedSeverity: IncidentSeverity[];
}
