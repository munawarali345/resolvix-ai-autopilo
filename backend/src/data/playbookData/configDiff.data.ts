
// ================================================================
// CONFIGURATION DIFF DATA
// ================================================================
//
// Purpose:
// Mock configuration change history used by the
// Config Diff Tool.
//
// These records simulate configuration changes
// that occurred before or during incidents.
//
// Future:
// This file can be replaced by:
//
// - Git History
// - Kubernetes Audit Logs
// - Terraform State
// - MongoDB
// - AWS Config
// - Azure Configuration History
//
// ================================================================

import { ConfigurationChange } from "../../types/configDiff.type.js";

export const CONFIGURATION_CHANGES: ConfigurationChange[] = [

  // ============================================================
  // API GATEWAY
  // ============================================================

  {
    id: "CHG-001",

    service: "api-gateway",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-001",

    field: "replicas",

    previousValue: "2",

    currentValue: "3",

    reason:
      "Traffic increased after production release. Replica count was increased to improve availability.",

    changedAt: new Date("2026-01-08T09:20:00Z"),
  },

  {
    id: "CHG-002",

    service: "api-gateway",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-001",

    field: "requestTimeout",

    previousValue: "20",

    currentValue: "30",

    reason:
      "Timeout increased to reduce unnecessary request failures during peak traffic.",

    changedAt: new Date("2026-01-08T09:22:00Z"),
  },

  {
    id: "CHG-003",

    service: "api-gateway",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-001",

    field: "cpuLimit",

    previousValue: "250m",

    currentValue: "500m",

    reason:
      "CPU resources increased after sustained high utilization observed in monitoring.",

    changedAt: new Date("2026-01-08T09:25:00Z"),
  },

  // ============================================================
  // DATABASE
  // ============================================================

  {
    id: "CHG-004",

    service: "database",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-002",

    field: "connectionPool",

    previousValue: "50",

    currentValue: "100",

    reason:
      "Connection pool size increased to support higher concurrent application traffic.",

    changedAt: new Date("2026-01-07T14:10:00Z"),
  },

  {
    id: "CHG-005",

    service: "database",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-002",

    field: "memoryLimit",

    previousValue: "2Gi",

    currentValue: "4Gi",

    reason:
      "Memory allocation increased after repeated database memory pressure alerts.",

    changedAt: new Date("2026-01-07T14:18:00Z"),
  },

    // ============================================================
  // DATABASE
  // ============================================================

  {
    id: "CHG-006",

    service: "database",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-002",

    field: "cpuLimit",

    previousValue: "1000m",

    currentValue: "2000m",

    reason:
      "CPU allocation increased after repeated database CPU saturation alerts during peak workload.",

    changedAt: new Date("2026-01-07T14:30:00Z"),
  },

  // ============================================================
  // USER SERVICE
  // ============================================================

  {
    id: "CHG-007",

    service: "user-service",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-003",

    field: "replicas",

    previousValue: "1",

    currentValue: "2",

    reason:
      "Replica count increased to improve user authentication and profile request availability.",

    changedAt: new Date("2026-01-10T08:10:00Z"),
  },

  {
    id: "CHG-008",

    service: "user-service",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-003",

    field: "requestTimeout",

    previousValue: "15",

    currentValue: "25",

    reason:
      "Request timeout increased to reduce unnecessary failures caused by slow downstream responses.",

    changedAt: new Date("2026-01-10T08:18:00Z"),
  },

  // ============================================================
  // ORDER SERVICE
  // ============================================================

  {
    id: "CHG-009",

    service: "order-service",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-004",

    field: "replicas",

    previousValue: "2",

    currentValue: "3",

    reason:
      "Replica count increased to handle growing order processing traffic during business hours.",

    changedAt: new Date("2026-01-09T15:25:00Z"),
  },

  {
    id: "CHG-010",

    service: "order-service",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-004",

    field: "requestTimeout",

    previousValue: "30",

    currentValue: "40",

    reason:
      "Timeout updated because order validation occasionally exceeded the previous limit.",

    changedAt: new Date("2026-01-09T15:32:00Z"),
  },

    // ============================================================
  // PAYMENT SERVICE
  // ============================================================

  {
    id: "CHG-011",

    service: "payment-service",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-005",

    field: "requestTimeout",

    previousValue: "30",

    currentValue: "45",

    reason:
      "Payment gateway latency increased after external provider update. Timeout was extended to reduce transaction failures.",

    changedAt: new Date("2026-01-12T09:40:00Z"),
  },

  {
    id: "CHG-012",

    service: "payment-service",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-005",

    field: "connectionPool",

    previousValue: "40",

    currentValue: "60",

    reason:
      "Connection pool increased to support higher payment transaction concurrency during peak traffic.",

    changedAt: new Date("2026-01-12T09:45:00Z"),
  },

  // ============================================================
  // CACHE
  // ============================================================

  {
    id: "CHG-013",

    service: "cache",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-006",

    field: "memoryLimit",

    previousValue: "1Gi",

    currentValue: "2Gi",

    reason:
      "Cache memory allocation increased after eviction rate exceeded acceptable production thresholds.",

    changedAt: new Date("2026-01-09T11:55:00Z"),
  },

  {
    id: "CHG-014",

    service: "cache",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-006",

    field: "replicas",

    previousValue: "1",

    currentValue: "2",

    reason:
      "Additional cache replica added to improve availability and reduce request latency.",

    changedAt: new Date("2026-01-09T12:00:00Z"),
  },

  // ============================================================
  // MONITORING
  // ============================================================

  {
    id: "CHG-015",

    service: "monitoring",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-007",

    field: "memoryLimit",

    previousValue: "512Mi",

    currentValue: "1Gi",

    reason:
      "Monitoring stack memory increased after sustained growth in metrics and alerting workload.",

    changedAt: new Date("2026-01-05T08:45:00Z"),
  },

    // ============================================================
  // MONITORING
  // ============================================================

  {
    id: "CHG-016",

    service: "monitoring",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-007",

    field: "cpuLimit",

    previousValue: "250m",

    currentValue: "500m",

    reason:
      "CPU resources increased after sustained Prometheus scrape load and alert evaluation latency.",

    changedAt: new Date("2026-01-05T08:55:00Z"),
  },

  // ============================================================
  // DEPLOYMENT
  // ============================================================

  {
    id: "CHG-017",

    service: "deployment",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-008",

    field: "version",

    previousValue: "v1.27.5",

    currentValue: "v1.28.4",

    reason:
      "Deployment controller upgraded to the latest supported production release.",

    changedAt: new Date("2026-01-06T15:40:00Z"),
  },

  {
    id: "CHG-018",

    service: "deployment",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-008",

    field: "image",

    previousValue: "deployment-controller:v1.27.5",

    currentValue: "deployment-controller:v1.28.4",

    reason:
      "Container image updated as part of the production deployment controller upgrade.",

    changedAt: new Date("2026-01-06T15:50:00Z"),
  },

  {
    id: "CHG-019",

    service: "deployment",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-008",

    field: "replicas",

    previousValue: "1",

    currentValue: "2",

    reason:
      "Replica count increased to improve controller availability during rolling deployments.",

    changedAt: new Date("2026-01-06T16:00:00Z"),
  },

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  {
    id: "CHG-020",

    service: "authentication",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-009",

    field: "requestTimeout",

    previousValue: "15",

    currentValue: "20",

    reason:
      "Authentication timeout increased to reduce login failures caused by slow identity provider responses.",

    changedAt: new Date("2026-01-10T13:30:00Z"),
  },

    // ============================================================
  // AUTHENTICATION
  // ============================================================

  {
    id: "CHG-021",

    service: "authentication",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-009",

    field: "replicas",

    previousValue: "1",

    currentValue: "2",

    reason:
      "Replica count increased to improve authentication service availability and reduce login request latency.",

    changedAt: new Date("2026-01-10T13:40:00Z"),
  },

  // ============================================================
  // HEALTH CHECK
  // ============================================================

  {
    id: "CHG-022",

    service: "health-check",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-010",

    field: "requestTimeout",

    previousValue: "5",

    currentValue: "10",

    reason:
      "Health check timeout increased to prevent false unhealthy reports during temporary infrastructure latency.",

    changedAt: new Date("2026-01-07T09:20:00Z"),
  },

  {
    id: "CHG-023",

    service: "health-check",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-010",

    field: "memoryLimit",

    previousValue: "128Mi",

    currentValue: "256Mi",

    reason:
      "Memory allocation increased after additional health probes and diagnostic checks were introduced.",

    changedAt: new Date("2026-01-07T09:28:00Z"),
  },

  // ============================================================
  // LOGGING
  // ============================================================

  {
    id: "CHG-024",

    service: "logging",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-011",

    field: "memoryLimit",

    previousValue: "1Gi",

    currentValue: "2Gi",

    reason:
      "Logging service memory increased to support higher log ingestion and indexing workload.",

    changedAt: new Date("2026-01-08T11:05:00Z"),
  },

  {
    id: "CHG-025",

    service: "logging",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-011",

    field: "replicas",

    previousValue: "1",

    currentValue: "2",

    reason:
      "Additional logging replica deployed to improve resilience and distribute indexing traffic.",

    changedAt: new Date("2026-01-08T11:12:00Z"),
  },

    // ============================================================
  // ANALYTICS ENGINE
  // ============================================================

  {
    id: "CHG-026",

    service: "analytics-engine",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-012",

    field: "cpuLimit",

    previousValue: "1000m",

    currentValue: "2000m",

    reason:
      "CPU allocation increased after large analytical workloads caused sustained high processor utilization.",

    changedAt: new Date("2026-01-11T14:40:00Z"),
  },

  {
    id: "CHG-027",

    service: "analytics-engine",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-012",

    field: "memoryLimit",

    previousValue: "2Gi",

    currentValue: "4Gi",

    reason:
      "Memory allocation increased to support larger in-memory analytics and reduce processing latency.",

    changedAt: new Date("2026-01-11T14:45:00Z"),
  },

  {
    id: "CHG-028",

    service: "analytics-engine",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-012",

    field: "replicas",

    previousValue: "1",

    currentValue: "2",

    reason:
      "Replica count increased to distribute analytical workloads and improve service availability.",

    changedAt: new Date("2026-01-11T14:52:00Z"),
  },

  // ============================================================
  // SYSTEM
  // ============================================================

  {
    id: "CHG-029",

    service: "system",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-013",

    field: "memoryLimit",

    previousValue: "256Mi",

    currentValue: "512Mi",

    reason:
      "System controller memory allocation increased to improve orchestration stability under production load.",

    changedAt: new Date("2026-01-05T07:40:00Z"),
  },

  {
    id: "CHG-030",

    service: "system",

    previousConfigurationVersion: "CFG-000",

    currentConfigurationVersion: "CFG-013",

    field: "cpuLimit",

    previousValue: "250m",

    currentValue: "500m",

    reason:
      "CPU resources increased after observing higher scheduling and orchestration workload during production operations.",

    changedAt: new Date("2026-01-05T07:50:00Z"),
  },

];