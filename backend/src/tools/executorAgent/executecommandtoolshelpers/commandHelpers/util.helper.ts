// ================================================================
// EXECUTION HELPER UTILITIES
// ================================================================
//
// Shared helper functions used across execution handlers.
//
// These functions DO NOT execute commands.
//
// They only:
//
// - Lookup fake infrastructure resources
// - Resolve names
// - Provide reusable utility logic
//
// ================================================================

import {
  infrastructure,
  FakeDeployment,
  FakeContainer,
  FakeService,
  FakeDatabase,
  FakeCache,
  FakeLog,
} from '../infrastructure.js';

import { logService } from '../../../../types/index.js';

// ================================================================
// FIND DEPLOYMENT
// ================================================================

export function findDeployment(name: string): FakeDeployment | undefined {
  return infrastructure.deployments.find(
    (deployment) => deployment.name === name,
  );
}

// ================================================================
// FIND CONTAINER
// ================================================================

export function findContainer(name: string): FakeContainer | undefined {
  return infrastructure.containers.find((container) => container.name === name);
}

// ================================================================
// FIND SERVICE
// ================================================================

export function findService(name: string): FakeService | undefined {
  return infrastructure.services.find((service) => service.name === name);
}

// ================================================================
// FIND DATABASE
// ================================================================

export function findDatabase(name: string): FakeDatabase | undefined {
  return infrastructure.databases.find((database) => database.name === name);
}

// ================================================================
// FIND CACHE
// ================================================================

export function findCache(name: string): FakeCache | undefined {
  return infrastructure.caches.find((cache) => cache.name === name);
}

// ================================================================
// FIND LOG
// ================================================================

export function findLog(source: logService): FakeLog | undefined {
  return infrastructure.logs.find((log) => log.source === source);
}

// ================================================================
// RESOLVE LOG SOURCE NAME
// ================================================================

export function resolveLogSourceName(value: string): logService | undefined {
  const normalized = value.toLowerCase();

  // ------------------------------------------------
  // Kubernetes
  // ------------------------------------------------

  if (normalized.includes('payment')) return 'payment-service';

  if (normalized.includes('user')) return 'user-service';

  if (normalized.includes('order')) return 'order-service';

  if (normalized.includes('auth')) return 'authentication';

  if (normalized.includes('gateway')) return 'api-gateway';

  if (normalized.includes('deployment')) return 'deployment';

  if (normalized.includes('monitor')) return 'monitoring';

  if (normalized.includes('health')) return 'health-check';

  if (normalized.includes('analytic')) return 'analytics-engine';

  // ------------------------------------------------
  // Infrastructure
  // ------------------------------------------------

  if (normalized.includes('postgres')) return 'database';

  if (normalized.includes('mysql')) return 'database';

  if (normalized.includes('database')) return 'database';

  if (normalized.includes('redis')) return 'cache';

  if (normalized.includes('cache')) return 'cache';

  if (normalized.includes('system')) return 'system';

  if (normalized.includes('log')) return 'logging';

  return undefined;
}

// ================================================================
// GET LOG BY RESOURCE
// ================================================================

export function getLogByResource(resourceName: string): FakeLog | undefined {
  const source = resolveLogSourceName(resourceName);

  if (!source) {
    return undefined;
  }

  return findLog(source);
}

// ================================================================
// RESOLVE RESOURCE NAME
// ================================================================

export function resolveResourceName(name: string): string {
  const normalized = name.trim().toLowerCase();

  // ------------------------------------------------
  // Database
  // ------------------------------------------------

  if (
    normalized === 'db-pool' ||
    normalized === 'postgres' ||
    normalized === 'postgresql' ||
    normalized === 'database'
  ) {
    return 'postgresql';
  }

  // ------------------------------------------------
  // Authentication
  // ------------------------------------------------

  if (
    normalized === 'auth' ||
    normalized === 'auth-service' ||
    normalized === 'authentication'
  ) {
    return 'authentication';
  }

  // ------------------------------------------------
  // Cache
  // ------------------------------------------------

  if (normalized === 'redis' || normalized === 'cache') {
    return 'redis';
  }

  // ------------------------------------------------
  // API Gateway
  // ------------------------------------------------

  if (normalized === 'gateway') {
    return 'api-gateway';
  }

  // ------------------------------------------------
  // Network
  // ------------------------------------------------

  if (normalized === 'network') {
    return 'network';
  }

  if (normalized === 'db-host') {
    return 'postgresql';
  }

  return normalized;
}
