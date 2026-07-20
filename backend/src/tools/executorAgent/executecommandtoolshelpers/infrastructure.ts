// ================================================================
// FAKE EXECUTION INFRASTRUCTURE
// ================================================================
//
// Purpose:
// Simulates infrastructure resources that can be modified by the
// Fake Execution Provider.
//
// This represents the current runtime state of our fake
// Kubernetes / Docker / Linux environment.
//
// NOTE:
// This is only for hackathon simulation.
//
// In production this file will be replaced by real
// infrastructure APIs.
//
// ================================================================

import { logService } from '../../../types/index.js';

// ================================================================
// RESOURCE STATUS
// ================================================================

export type ResourceStatus = 'running' | 'restarting' | 'stopped' | 'failed';

// ================================================================
// DEPLOYMENT
// ================================================================

export interface FakeDeployment {
  id: string;
  name: string;
  service: logService;
  status: ResourceStatus;

  createdAt: Date;
  updatedAt: Date;

  labels?: Record<string, string>;

  replicas: number;

  version?: number;
}

// ================================================================
// CONTAINER
// ================================================================

export interface FakeContainer {
  id: string;
  name: string;
  service: logService;
  status: ResourceStatus;

  createdAt: Date;
  updatedAt: Date;

  labels?: Record<string, string>;
}

// ================================================================
// SERVICE
// ================================================================

export interface FakeService {
  id: string;
  name: string;
  service: logService;
  status: ResourceStatus;

  createdAt: Date;
  updatedAt: Date;

  labels?: Record<string, string>;

  version?: number;
}

// ================================================================
// DATABASE
// ================================================================

export interface FakeDatabase {
  id: string;

  name: string;

  service: logService;

  status: ResourceStatus;

  activeConnections: number;

  queryCacheHitRate: number;

  cpuUsage: number;

  memoryUsage: number;

  lastRestartAt: Date;

  createdAt: Date;

  updatedAt: Date;
}

export interface FakeCache {
  id: string;

  name: string;

  service: logService;

  status: ResourceStatus;

  usedMemoryMB: number;

  maxMemoryMB: number;

  keys: number;

  hitRate: number;

  createdAt: Date;

  updatedAt: Date;
}

export interface FakeLog {
  id: string;

  source: logService;

  entries: string[];

  updatedAt: Date;
}

// ================================================================
// EXECUTION HISTORY
// ================================================================

export interface ExecutionHistory {
  executionId: string;

  command: string;

  exitCode: number;

  stdout: string;

  stderr: string;

  duration: number;

  success: boolean;

  executedAt: Date;
}

// ================================================================
// FAKE INFRASTRUCTURE
// ================================================================

export const infrastructure = {
  deployments: <FakeDeployment[]>[
    {
      id: 'dep-1',
      service: 'payment-service',
      name: 'payment-service',
      status: 'running',
      replicas: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'payment' },
      version: 1,
    },
    {
      id: 'dep-2',
      service: 'user-service',
      name: 'user-service',
      status: 'running',
      replicas: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'user' },
      version: 1,
    },
    {
      id: 'dep-3',
      service: 'order-service',
      name: 'order-service',
      status: 'running',
      replicas: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'order' },
      version: 1,
    },
    {
      id: 'dep-4',
      service: 'authentication',
      name: 'auth-service',
      status: 'running',
      replicas: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'auth' },
      version: 1,
    },
    {
      id: 'dep-5',
      service: 'api-gateway',
      name: 'api-gateway',
      status: 'running',
      replicas: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'gateway' },
      version: 1,
    },
    {
      id: 'dep-6',
      service: 'monitoring',
      name: 'monitoring',
      status: 'running',
      replicas: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'monitoring' },
      version: 1,
    },
    {
      id: 'dep-7',
      service: 'analytics-engine',
      name: 'analytics-engine',
      status: 'running',
      replicas: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'analytics' },
      version: 1,
    },
    {
      id: 'dep-8',
      service: 'logging',
      name: 'logging',
      status: 'running',
      replicas: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: { app: 'logging' },
      version: 1,
    },
  ],

  containers: <FakeContainer[]>[
    {
      id: 'ctr-1',
      service: 'payment-service',
      name: 'payment-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ctr-2',
      service: 'user-service',
      name: 'user-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ctr-3',
      service: 'order-service',
      name: 'order-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ctr-4',
      service: 'authentication',
      name: 'auth-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ctr-5',
      service: 'api-gateway',
      name: 'gateway-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ctr-6',
      service: 'monitoring',
      name: 'monitoring-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ctr-7',
      service: 'analytics-engine',
      name: 'analytics-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'ctr-8',
      service: 'logging',
      name: 'logging-container',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  services: <FakeService[]>[
    {
      id: 'svc-1',
      service: 'api-gateway',
      name: 'api-gateway',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-2',
      service: 'database',
      name: 'postgresql',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-3',
      service: 'user-service',
      name: 'user-service',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-4',
      service: 'order-service',
      name: 'order-service',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-5',
      service: 'payment-service',
      name: 'payment-service',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-6',
      service: 'cache',
      name: 'redis',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-7',
      service: 'monitoring',
      name: 'monitoring',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-8',
      service: 'deployment',
      name: 'deployment',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-9',
      service: 'authentication',
      name: 'authentication',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-10',
      service: 'health-check',
      name: 'health-check',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-11',
      service: 'logging',
      name: 'logging',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-12',
      service: 'analytics-engine',
      name: 'analytics-engine',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-13',
      service: 'system',
      name: 'system',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-14',
      service: 'database',
      name: 'db-pool',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-15',
      service: 'authentication',
      name: 'auth-service',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
    {
      id: 'svc-16',
      service: 'system',
      name: 'network',
      status: 'running',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    },
  ],

  databases: <FakeDatabase[]>[
    {
      id: 'db-1',
      name: 'postgresql',
      status: 'running',
      activeConnections: 18,
      queryCacheHitRate: 92,
      cpuUsage: 34,
      memoryUsage: 41,
      lastRestartAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'db-2',
      name: 'mysql',
      status: 'running',
      activeConnections: 12,
      queryCacheHitRate: 89,
      cpuUsage: 27,
      memoryUsage: 38,
      lastRestartAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'db-3',
      name: 'mongodb',
      status: 'running',
      activeConnections: 25,
      queryCacheHitRate: 94,
      cpuUsage: 31,
      memoryUsage: 46,
      lastRestartAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  caches: <FakeCache[]>[
    {
      id: 'cache-1',
      name: 'redis',
      status: 'running',
      usedMemoryMB: 420,
      maxMemoryMB: 1024,
      keys: 18342,
      hitRate: 96,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cache-2',
      name: 'memcached',
      status: 'running',
      usedMemoryMB: 180,
      maxMemoryMB: 512,
      keys: 9542,
      hitRate: 91,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  logs: <FakeLog[]>[
    {
      id: 'log-1',
      source: 'payment-service',
      entries: [
        '[INFO] Payment service started.',
        '[INFO] Database connected.',
        '[WARN] Slow query detected.',
      ],
      updatedAt: new Date(),
    },
    {
      id: 'log-2',
      source: 'user-service',
      entries: ['[INFO] User authenticated.', '[INFO] User profile loaded.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-3',
      source: 'order-service',
      entries: ['[INFO] Order created.', '[INFO] Inventory reserved.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-4',
      source: 'api-gateway',
      entries: [
        '[INFO] Incoming request received.',
        '[INFO] Routed to payment-service.',
      ],
      updatedAt: new Date(),
    },
    {
      id: 'log-5',
      source: 'database',
      entries: ['[INFO] PostgreSQL ready.', '[INFO] Active connections: 18.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-6',
      source: 'cache',
      entries: ['[INFO] Redis initialized.', '[INFO] Cache hit rate: 96%.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-7',
      source: 'authentication',
      entries: ['[INFO] JWT validated.', '[INFO] Login successful.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-8',
      source: 'monitoring',
      entries: ['[INFO] Metrics collected.', '[INFO] CPU usage normal.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-9',
      source: 'deployment',
      entries: ['[INFO] Deployment started.', '[INFO] Rollout successful.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-10',
      source: 'health-check',
      entries: [
        '[INFO] Readiness probe passed.',
        '[INFO] Liveness probe passed.',
      ],
      updatedAt: new Date(),
    },
    {
      id: 'log-11',
      source: 'logging',
      entries: [
        '[INFO] Log collector active.',
        '[INFO] Log rotation completed.',
      ],
      updatedAt: new Date(),
    },
    {
      id: 'log-12',
      source: 'analytics-engine',
      entries: ['[INFO] Analytics job started.', '[INFO] Report generated.'],
      updatedAt: new Date(),
    },
    {
      id: 'log-13',
      source: 'system',
      entries: [
        '[INFO] System boot completed.',
        '[INFO] All services healthy.',
      ],
      updatedAt: new Date(),
    },
    {
      id: 'log-14',
      source: 'database',
      entries: [
        '[INFO] Database connection pool service initialized.',
        '[INFO] db-pool service is running.',
      ],
      updatedAt: new Date(),
    },
    {
      id: 'log-15',
      source: 'authentication',
      entries: [
        '[INFO] Authentication service started.',
        '[INFO] auth-service is healthy.',
      ],
      updatedAt: new Date(),
    },
    {
      id: 'log-16',
      source: 'system',
      entries: [
        '[INFO] Network service initialized.',
        '[INFO] Network connectivity verified.',
      ],
      updatedAt: new Date(),
    },
  ],

  executionHistory: <ExecutionHistory[]>[],
};
