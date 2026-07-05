// ================================================================
// SERVICE INVENTORY DATA
// ================================================================
//
// Purpose:
// Mock service inventory used by the
// Service Inventory Tool.
//
// These records simulate an enterprise
// service catalog.
//
// Future:
// Can be replaced by:
//
// - CMDB
// - ServiceNow
// - Backstage
// - MongoDB
// - Internal Service Catalog
//
// ================================================================

import { ServiceInventory } from '../../types/serviceInventory.type.js';

export const SERVICE_INVENTORY: ServiceInventory[] = [
  {
    id: 'SVC-001',

    name: 'api-gateway',

    owner: 'Platform Team',

    team: 'Platform Engineering',

    environment: 'production',

    version: 'v2.4.1',

    runtime: 'Node.js',

    repository: 'platform/api-gateway',

    criticality: 'critical',
  },

  {
    id: 'SVC-002',

    name: 'database',

    owner: 'Database Team',

    team: 'Infrastructure',

    environment: 'production',

    version: 'v15.3',

    runtime: 'PostgreSQL',

    repository: 'infrastructure/postgres',

    criticality: 'critical',
  },

  {
    id: 'SVC-003',

    name: 'user-service',

    owner: 'Identity Team',

    team: 'Backend',

    environment: 'production',

    version: 'v1.9.2',

    runtime: 'Node.js',

    repository: 'backend/user-service',

    criticality: 'high',
  },

  {
    id: 'SVC-004',

    name: 'order-service',

    owner: 'Commerce Team',

    team: 'Backend',

    environment: 'production',

    version: 'v3.1.0',

    runtime: 'Node.js',

    repository: 'backend/order-service',

    criticality: 'critical',
  },

  {
    id: 'SVC-005',

    name: 'payment-service',

    owner: 'Payments Team',

    team: 'Backend',

    environment: 'production',

    version: 'v5.0.4',

    runtime: 'Node.js',

    repository: 'backend/payment-service',

    criticality: 'critical',
  },

  {
    id: 'SVC-006',

    name: 'cache',

    owner: 'Platform Team',

    team: 'Infrastructure',

    environment: 'production',

    version: 'v7.2.1',

    runtime: 'Redis',

    repository: 'infrastructure/redis',

    criticality: 'high',
  },

  {
    id: 'SVC-007',

    name: 'monitoring',

    owner: 'SRE Team',

    team: 'Operations',

    environment: 'production',

    version: 'v2.48.0',

    runtime: 'Prometheus',

    repository: 'operations/monitoring',

    criticality: 'medium',
  },

  {
    id: 'SVC-008',

    name: 'deployment',

    owner: 'DevOps Team',

    team: 'Platform Engineering',

    environment: 'production',

    version: 'v1.28.4',

    runtime: 'Kubernetes',

    repository: 'platform/deployment',

    criticality: 'critical',
  },

  {
    id: 'SVC-009',

    name: 'authentication',

    owner: 'Identity Team',

    team: 'Security',

    environment: 'production',

    version: 'v4.3.0',

    runtime: 'Node.js',

    repository: 'security/authentication',

    criticality: 'critical',
  },

  {
    id: 'SVC-010',

    name: 'health-check',

    owner: 'SRE Team',

    team: 'Operations',

    environment: 'production',

    version: 'v1.5.2',

    runtime: 'Node.js',

    repository: 'operations/health-check',

    criticality: 'medium',
  },

  {
    id: 'SVC-011',

    name: 'logging',

    owner: 'Observability Team',

    team: 'Operations',

    environment: 'production',

    version: 'v8.11.3',

    runtime: 'Elasticsearch',

    repository: 'operations/logging',

    criticality: 'high',
  },

  {
    id: 'SVC-012',

    name: 'analytics-engine',

    owner: 'Analytics Team',

    team: 'Data Engineering',

    environment: 'production',

    version: 'v3.8.2',

    runtime: 'Python',

    repository: 'analytics/engine',

    criticality: 'high',
  },

  {
    id: 'SVC-013',

    name: 'system',

    owner: 'Platform Team',

    team: 'Platform Engineering',

    environment: 'production',

    version: 'v1.0.0',

    runtime: 'Linux',

    repository: 'platform/system',

    criticality: 'critical',
  },
];
