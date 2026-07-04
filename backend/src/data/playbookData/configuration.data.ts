

// ================================================================
// CONFIGURATION DATA
// ================================================================
//
// Purpose:
// Mock service configurations used by the
// Configuration Reader Tool.
//
// These configurations simulate the current
// production environment.
//
// Future:
// This file can be replaced by MongoDB,
// Kubernetes ConfigMaps,
// AWS Parameter Store,
// Azure App Configuration,
// or any centralized configuration service.
//
// ================================================================

import { ServiceConfiguration } from "../../types/configurationTool.type.js";

export const CONFIGURATIONS: ServiceConfiguration[] = [

  // ============================================================
  // API GATEWAY
  // ============================================================

  {
    id: "CFG-001",

    service: "api-gateway",

    environment: "production",

    version: "v2.4.1",

    image: "company/api-gateway:v2.4.1",

    replicas: 3,

    cpuLimit: "500m",

    memoryLimit: "512Mi",

    requestTimeout: 30,

    autoScaling: true,

    configurationVersion: "CFG-001",

    lastUpdated: new Date("2026-01-10T09:15:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
      "low",
    ],
  },

  // ============================================================
  // DATABASE
  // ============================================================

  {
    id: "CFG-002",

    service: "database",

    environment: "production",

    version: "v15.3",

    image: "postgres:15.3",

    replicas: 1,

    cpuLimit: "2000m",

    memoryLimit: "4Gi",

    connectionPool: 100,

    autoScaling: false,

    configurationVersion: "CFG-002",

    lastUpdated: new Date("2026-01-08T13:40:00Z"),

    supportedSeverity: [
      "critical",
      "high",
    ],
  },

  // ============================================================
  // USER SERVICE
  // ============================================================

  {
    id: "CFG-003",

    service: "user-service",

    environment: "production",

    version: "v1.9.2",

    image: "company/user-service:v1.9.2",

    replicas: 2,

    cpuLimit: "500m",

    memoryLimit: "768Mi",

    requestTimeout: 25,

    autoScaling: true,

    configurationVersion: "CFG-003",

    lastUpdated: new Date("2026-01-11T08:20:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
    ],
  },

  // ============================================================
  // ORDER SERVICE
  // ============================================================

  {
    id: "CFG-004",

    service: "order-service",

    environment: "production",

    version: "v3.1.0",

    image: "company/order-service:v3.1.0",

    replicas: 3,

    cpuLimit: "750m",

    memoryLimit: "1Gi",

    requestTimeout: 40,

    autoScaling: true,

    configurationVersion: "CFG-004",

    lastUpdated: new Date("2026-01-09T15:10:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
    ],
  },

  // ============================================================
  // PAYMENT SERVICE
  // ============================================================

  {
    id: "CFG-005",

    service: "payment-service",

    environment: "production",

    version: "v5.0.4",

    image: "company/payment-service:v5.0.4",

    replicas: 2,

    cpuLimit: "1000m",

    memoryLimit: "1Gi",

    connectionPool: 60,

    requestTimeout: 45,

    autoScaling: true,

    configurationVersion: "CFG-005",

    lastUpdated: new Date("2026-01-12T10:35:00Z"),

    supportedSeverity: [
      "critical",
      "high",
    ],

  },

    // ============================================================
  // CACHE
  // ============================================================

  {
    id: "CFG-006",

    service: "cache",

    environment: "production",

    version: "v7.2.1",

    image: "redis:7.2.1",

    replicas: 2,

    cpuLimit: "500m",

    memoryLimit: "2Gi",

    requestTimeout: 5,

    autoScaling: true,

    configurationVersion: "CFG-006",

    lastUpdated: new Date("2026-01-09T11:45:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
    ],
  },

  // ============================================================
  // MONITORING
  // ============================================================

  {
    id: "CFG-007",

    service: "monitoring",

    environment: "production",

    version: "v2.48.0",

    image: "prometheus:v2.48.0",

    replicas: 1,

    cpuLimit: "500m",

    memoryLimit: "1Gi",

    autoScaling: false,

    configurationVersion: "CFG-007",

    lastUpdated: new Date("2026-01-05T08:30:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
      "low",
    ],
  },

  // ============================================================
  // DEPLOYMENT
  // ============================================================

  {
    id: "CFG-008",

    service: "deployment",

    environment: "production",

    version: "v1.28.4",

    image: "deployment-controller:v1.28.4",

    replicas: 2,

    cpuLimit: "750m",

    memoryLimit: "1Gi",

    autoScaling: false,

    configurationVersion: "CFG-008",

    lastUpdated: new Date("2026-01-06T16:20:00Z"),

    supportedSeverity: [
      "critical",
      "high",
    ],
  },

  // ============================================================
  // AUTHENTICATION
  // ============================================================

  {
    id: "CFG-009",

    service: "authentication",

    environment: "production",

    version: "v4.3.0",

    image: "company/authentication:v4.3.0",

    replicas: 2,

    cpuLimit: "500m",

    memoryLimit: "768Mi",

    requestTimeout: 20,

    autoScaling: true,

    configurationVersion: "CFG-009",

    lastUpdated: new Date("2026-01-10T13:15:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
    ],
  },

  // ============================================================
  // HEALTH CHECK
  // ============================================================

  {
    id: "CFG-010",

    service: "health-check",

    environment: "production",

    version: "v1.5.2",

    image: "company/health-check:v1.5.2",

    replicas: 2,

    cpuLimit: "250m",

    memoryLimit: "256Mi",

    requestTimeout: 10,

    autoScaling: false,

    configurationVersion: "CFG-010",

    lastUpdated: new Date("2026-01-07T09:10:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
      "low",
    ],

  },

    // ============================================================
  // LOGGING
  // ============================================================

  {
    id: "CFG-011",

    service: "logging",

    environment: "production",

    version: "v8.11.3",

    image: "elasticsearch:8.11.3",

    replicas: 2,

    cpuLimit: "1000m",

    memoryLimit: "2Gi",

    autoScaling: true,

    configurationVersion: "CFG-011",

    lastUpdated: new Date("2026-01-08T10:45:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
      "low",
    ],
  },

  // ============================================================
  // ANALYTICS ENGINE
  // ============================================================

  {
    id: "CFG-012",

    service: "analytics-engine",

    environment: "production",

    version: "v3.8.2",

    image: "company/analytics-engine:v3.8.2",

    replicas: 2,

    cpuLimit: "2000m",

    memoryLimit: "4Gi",

    requestTimeout: 120,

    autoScaling: true,

    configurationVersion: "CFG-012",

    lastUpdated: new Date("2026-01-11T14:30:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
    ],
  },

  // ============================================================
  // SYSTEM
  // ============================================================

  {
    id: "CFG-013",

    service: "system",

    environment: "production",

    version: "v1.0.0",

    image: "company/system-controller:v1.0.0",

    replicas: 1,

    cpuLimit: "500m",

    memoryLimit: "512Mi",

    autoScaling: false,

    configurationVersion: "CFG-013",

    lastUpdated: new Date("2026-01-05T07:30:00Z"),

    supportedSeverity: [
      "critical",
      "high",
      "medium",
      "low",
    ],
  },

];
