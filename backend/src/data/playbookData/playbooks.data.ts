// ================================================================
// PLAYBOOK DATA
// ================================================================
//
// Purpose:
// Internal mock Knowledge Base used by the Fix Agent.
//
// These playbooks simulate an enterprise remediation database.
//
// Future:
// This file can be replaced by MongoDB without changing
// the Fix Agent logic.
// ================================================================

import { Playbook } from "../../types/playbookTool.types.js";

export const PLAYBOOKS: Playbook[] = [

// ============================================================
  // DATABASE FAILURE PLAYBOOKS
  // ============================================================

  {
    id: "PB-001",

    title: "Database Connection Pool Exhaustion Recovery",

    category: "Database",

    rootCauseKeywords: [
      "database connection pool exhausted",
      "connection pool exhaustion",
      "too many database connections",
      "connection timeout"
    ],

    affectedServices: [
      "database",
      "api-gateway",
      "payment-service",
      "order-service"
    ],

    severity: [
      "critical",
      "high"
    ],

summary:
       "Inspect database connection pool utilization, terminate stale sessions, restore healthy connection limits, and verify dependent services reconnect successfully.",
   },

  {
    id: "PB-002",

    title: "Database Service Unavailable",

    category: "Database",

    rootCauseKeywords: [
      "database unavailable",
      "database unreachable",
      "database offline",
      "failed to connect database"
    ],

    affectedServices: [
      "database",
      "api-gateway",
      "user-service",
      "payment-service",
      "order-service"
    ],

    severity: [
      "critical"
    ],

    summary:
      "Verify database availability, restore service health, validate network connectivity, and confirm application services recover after database restoration.",

   },

  {
    id: "PB-003",

    title: "Database Authentication Failure",

    category: "Database",

    rootCauseKeywords: [
      "authentication failed",
      "invalid database credentials",
      "database login failed",
      "access denied"
    ],

    affectedServices: [
      "database",
      "authentication",
      "user-service"
    ],

    severity: [
      "high",
      "medium"
    ],

    summary:
      "Validate database credentials, review authentication configuration, verify secret rotation history, and restore successful authentication.",


  },

  {
    id: "PB-004",

    title: "Database Network Connectivity Failure",

    category: "Database",

    rootCauseKeywords: [
      "database network timeout",
      "network unreachable",
      "connection refused",
      "database timeout"
    ],

    affectedServices: [
      "database",
      "api-gateway",
      "payment-service",
      "order-service"
    ],

    severity: [
      "critical",
      "high"
    ],

    summary:
      "Inspect network connectivity between application services and the database, verify routing, firewall configuration, and restore communication paths.",


  },

  {
    id: "PB-005",

    title: "Database Resource Saturation",

    category: "Database",

    rootCauseKeywords: [
      "database cpu high",
      "database memory high",
      "database resource exhaustion",
      "slow database"
    ],

    affectedServices: [
      "database",
      "analytics-engine",
      "payment-service",
      "order-service"
    ],

    severity: [
      "critical",
      "high"
    ],

    summary:
      "Review database resource utilization, identify expensive queries, evaluate workload distribution, and restore stable database performance.",


  },

  {
  id: "PB-006",

  title: "Idle Database Connection Cleanup",

  category: "Database",

  rootCauseKeywords: [
    "idle database connections",
    "connection accumulation",
    "stale database sessions",
    "connection pool exhaustion"
  ],

  affectedServices: [
    "database",
    "api-gateway",
    "payment-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Inspect idle database sessions, terminate stale connections, review connection lifetime configuration, and verify healthy connection reuse.",


},

{
  id: "PB-007",

  title: "Database Authentication Configuration Review",

  category: "Database",

  rootCauseKeywords: [
    "database authentication failure",
    "credential mismatch",
    "database login failed",
    "authentication configuration"
  ],

  affectedServices: [
    "database",
    "authentication",
    "user-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Review authentication configuration, validate credentials, inspect secret synchronization, and confirm successful database authentication.",


},

{
  id: "PB-008",

  title: "Long Running Database Transaction Investigation",

  category: "Database",

  rootCauseKeywords: [
    "long running transaction",
    "database blocking",
    "transaction contention",
    "database lock"
  ],

  affectedServices: [
    "database",
    "order-service",
    "payment-service"
  ],

  severity: [
    "high"
  ],

  summary:
    "Identify long running transactions, investigate locking behavior, optimize transaction duration, and restore normal database throughput.",


},

{
  id: "PB-009",

  title: "Database Storage Capacity Investigation",

  category: "Database",

  rootCauseKeywords: [
    "database disk full",
    "database storage exhausted",
    "low disk space",
    "database write failure"
  ],

  affectedServices: [
    "database"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Review database storage utilization, identify capacity bottlenecks, reclaim available space, and verify successful write operations.",


},

{
  id: "PB-010",

  title: "Database Retry Storm Investigation",

  category: "Database",

  rootCauseKeywords: [
    "retry storm",
    "connection retry",
    "database timeout",
    "connection pool exhaustion"
  ],

  affectedServices: [
    "database",
    "api-gateway",
    "user-service",
    "payment-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Review retry configuration, inspect timeout policies, validate exponential backoff behavior, and reduce excessive retry traffic toward the database.",


},

{
  id: "PB-011",

  title: "Database Failover Verification",

  category: "Database",

  rootCauseKeywords: [
    "database failover",
    "primary database failure",
    "database node unavailable",
    "database cluster failover"
  ],

  affectedServices: [
    "database",
    "api-gateway",
    "payment-service",
    "order-service"
  ],

  severity: [
    "critical"
  ],

  summary:
    "Verify database failover status, confirm replica promotion, validate application connectivity, and ensure dependent services reconnect successfully.",


},

{
  id: "PB-012",

  title: "Database Replication Health Investigation",

  category: "Database",

  rootCauseKeywords: [
    "replication lag",
    "database replication failure",
    "replica unavailable",
    "replication synchronization"
  ],

  affectedServices: [
    "database",
    "analytics-engine"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Inspect replication health, verify synchronization status, identify replication delays, and restore healthy replica consistency.",


},

{
  id: "PB-013",

  title: "Database Query Performance Investigation",

  category: "Database",

  rootCauseKeywords: [
    "slow query",
    "database query timeout",
    "expensive query",
    "query performance"
  ],

  affectedServices: [
    "database",
    "order-service",
    "payment-service",
    "analytics-engine"
  ],

  severity: [
    "high"
  ],

  summary:
    "Identify slow-running queries, review execution plans, validate indexing strategy, and restore acceptable database response times.",


},

{
  id: "PB-014",

  title: "Database Deadlock Investigation",

  category: "Database",

  rootCauseKeywords: [
    "database deadlock",
    "transaction deadlock",
    "deadlock detected",
    "database locking"
  ],

  affectedServices: [
    "database",
    "order-service",
    "payment-service"
  ],

  severity: [
    "high"
  ],

  summary:
    "Review transaction locking behavior, identify deadlock patterns, analyze conflicting operations, and restore transaction stability.",


},

{
  id: "PB-015",

  title: "Database Maintenance Window Validation",

  category: "Database",

  rootCauseKeywords: [
    "database maintenance",
    "planned database downtime",
    "database restart",
    "maintenance window"
  ],

  affectedServices: [
    "database",
    "api-gateway",
    "user-service",
    "payment-service",
    "order-service"
  ],

  severity: [
    "medium",
    "high"
  ],

  summary:
    "Verify whether scheduled maintenance activities affected database availability, confirm maintenance completion, and validate full service recovery.",


},

// ============================================================
// Ends DB-Failure PLAYBOOKS
// ============================================================

// ============================================================
// MEMORY LEAK PLAYBOOKS
// ============================================================

{
  id: "PB-016",

  title: "Application Memory Leak Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "memory leak",
    "heap memory exhausted",
    "out of memory",
    "memory usage continuously increasing"
  ],

  affectedServices: [
    "user-service",
    "order-service",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect application heap utilization, identify long-lived objects, review garbage collection behavior, and isolate components causing continuous memory growth.",


},

{
  id: "PB-017",

  title: "Garbage Collection Performance Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "garbage collection",
    "gc pause",
    "frequent gc",
    "heap pressure"
  ],

  affectedServices: [
    "user-service",
    "analytics-engine"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Review garbage collection metrics, analyze GC pause duration, inspect heap allocation patterns, and verify healthy memory reclamation.",


},

{
  id: "PB-018",

  title: "Memory Resource Saturation",

  category: "Memory",

  rootCauseKeywords: [
    "memory exhausted",
    "high memory usage",
    "memory saturation",
    "insufficient memory"
  ],

  affectedServices: [
    "user-service",
    "order-service",
    "payment-service",
    "analytics-engine"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Review memory utilization across affected services, identify abnormal allocation patterns, validate resource limits, and restore stable memory consumption.",


},

{
  id: "PB-019",

  title: "Container Memory Limit Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "oom killed",
    "container memory limit",
    "memory limit exceeded",
    "container restarted"
  ],

  affectedServices: [
    "user-service",
    "payment-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect container memory limits, verify resource allocation, analyze restart events, and confirm workloads operate within configured limits.",


},

{
  id: "PB-020",

  title: "Memory Consumption Trend Analysis",

  category: "Memory",

  rootCauseKeywords: [
    "memory growth",
    "memory trend",
    "heap growth",
    "memory increase"
  ],

  affectedServices: [
    "user-service",
    "analytics-engine"
  ],

  severity: [
    "medium",
    "high"
  ],

  summary:
    "Analyze historical memory consumption trends, identify abnormal growth patterns, correlate workload changes, and verify sustained memory stability.",


},


{
  id: "PB-021",

  title: "Memory Allocation Spike Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "memory allocation spike",
    "heap allocation spike",
    "allocation rate high",
    "rapid memory allocation"
  ],

  affectedServices: [
    "user-service",
    "analytics-engine",
    "payment-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Review application allocation patterns, identify sudden memory allocation spikes, correlate workload changes, and verify healthy allocation behavior.",


},

{
  id: "PB-022",

  title: "Application Cache Memory Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "cache memory growth",
    "cache overflow",
    "cache consuming memory",
    "cache leak"
  ],

  affectedServices: [
    "cache",
    "user-service",
    "order-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Inspect cache utilization, validate cache eviction policy, identify oversized cache entries, and restore healthy cache memory usage.",


},

{
  id: "PB-023",

  title: "Memory Fragmentation Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "memory fragmentation",
    "fragmented heap",
    "heap fragmentation",
    "memory allocation failure"
  ],

  affectedServices: [
    "user-service",
    "analytics-engine"
  ],

  severity: [
    "medium",
    "high"
  ],

  summary:
    "Review heap fragmentation, inspect allocation efficiency, analyze fragmentation patterns, and restore stable memory allocation behavior.",


},

{
  id: "PB-024",

  title: "Application Resource Leak Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "resource leak",
    "file descriptor leak",
    "socket leak",
    "memory resource leak"
  ],

  affectedServices: [
    "user-service",
    "payment-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect application resource utilization, identify unreleased resources, verify cleanup routines, and restore normal resource consumption.",


},

{
  id: "PB-025",

  title: "Out Of Memory Crash Investigation",

  category: "Memory",

  rootCauseKeywords: [
    "out of memory",
    "oom",
    "process killed",
    "memory crash"
  ],

  affectedServices: [
    "user-service",
    "payment-service",
    "order-service",
    "analytics-engine"
  ],

  severity: [
    "critical"
  ],

  summary:
    "Review Out Of Memory events, inspect heap utilization before process termination, identify excessive memory consumers, and restore application stability.",


},

// ============================================================
// Ends MEMORY LEAK PLAYBOOKS
// ============================================================

// ============================================================
// API 500 ERROR PLAYBOOKS
// ============================================================

{
  id: "PB-026",

  title: "HTTP 500 Internal Server Error Investigation",

  category: "API",

  rootCauseKeywords: [
    "http 500",
    "internal server error",
    "500 error",
    "unexpected server exception"
  ],

  affectedServices: [
    "api-gateway",
    "user-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect server-side exceptions, identify failing request handlers, correlate error spikes with application logs, and verify service stability after recovery.",


},

{
  id: "PB-027",

  title: "Unhandled Application Exception Investigation",

  category: "API",

  rootCauseKeywords: [
    "unhandled exception",
    "application exception",
    "runtime exception",
    "null reference"
  ],

  affectedServices: [
    "user-service",
    "order-service",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Review application exceptions, identify failing code paths, inspect stack traces, and verify exception handling behavior across affected services.",


},

{
  id: "PB-028",

  title: "API Dependency Failure Investigation",

  category: "API",

  rootCauseKeywords: [
    "dependency failure",
    "upstream service unavailable",
    "service unavailable",
    "dependency timeout"
  ],

  affectedServices: [
    "api-gateway",
    "payment-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect upstream service dependencies, identify unavailable services, correlate request failures, and verify healthy dependency communication.",


},

{
  id: "PB-029",

  title: "API Request Timeout Investigation",

  category: "API",

  rootCauseKeywords: [
    "request timeout",
    "gateway timeout",
    "api timeout",
    "operation timed out"
  ],

  affectedServices: [
    "api-gateway",
    "user-service",
    "payment-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Review request latency, inspect slow downstream operations, identify timeout sources, and verify stable response times across affected APIs.",


},

{
  id: "PB-030",

  title: "API Error Rate Spike Investigation",

  category: "API",

  rootCauseKeywords: [
    "error rate spike",
    "api failure rate",
    "high 500 errors",
    "request failures"
  ],

  affectedServices: [
    "api-gateway",
    "user-service",
    "order-service",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Analyze API error trends, correlate failure spikes with deployment or infrastructure events, and identify the primary source of elevated server errors.",


},

{
    id: "PB-031",

    title: "API Gateway Routing Failure",

    category: "API",

    rootCauseKeywords: [
      "gateway routing failed",
      "route not found",
      "upstream unavailable",
      "gateway routing error"
    ],

    affectedServices: [
      "api-gateway",
      "user-service",
      "order-service"
    ],

    severity: [
      "high",
      "medium"
    ],

    summary:
      "Validate gateway routing configuration, verify upstream service registration, and restore correct request routing across application services.",


  },

  {
    id: "PB-032",

    title: "API Gateway Rate Limiting Triggered",

    category: "API",

    rootCauseKeywords: [
      "rate limit exceeded",
      "too many requests",
      "429",
      "api throttling"
    ],

    affectedServices: [
      "api-gateway",
      "authentication"
    ],

    severity: [
      "medium",
      "low"
    ],

    summary:
      "Review configured rate limits, identify abnormal request patterns, validate client behavior, and restore expected request throughput.",


  },

  {
    id: "PB-033",

    title: "Authentication Service API Failure",

    category: "API",

    rootCauseKeywords: [
      "authentication api failed",
      "token validation failed",
      "jwt verification failed",
      "authentication timeout"
    ],

    affectedServices: [
      "authentication",
      "api-gateway",
      "user-service"
    ],

    severity: [
      "critical",
      "high"
    ],

    summary:
      "Verify authentication service availability, validate token configuration, inspect authentication dependencies, and restore successful request authentication.",


  },

  {
    id: "PB-034",

    title: "External API Dependency Failure",

    category: "API",

    rootCauseKeywords: [
      "external api timeout",
      "third party api failed",
      "external dependency unavailable",
      "api dependency error"
    ],

    affectedServices: [
      "payment-service",
      "order-service"
    ],

    severity: [
      "high",
      "medium"
    ],

    summary:
      "Verify external provider availability, inspect network communication, validate retry behavior, and restore dependent service communication.",


  },

  {
    id: "PB-035",

    title: "API Response Serialization Failure",

    category: "API",

    rootCauseKeywords: [
      "serialization failed",
      "response parsing failed",
      "json serialization error",
      "invalid response format"
    ],

    affectedServices: [
      "api-gateway",
      "user-service",
      "order-service"
    ],

    severity: [
      "medium"
    ],

    summary:
      "Review response serialization logic, validate API response structure, inspect payload compatibility, and restore successful response generation.",


  },

// ============================================================
// Ends API 500 ERROR PLAYBOOKS
// ============================================================

// ============================================================
// DEPLOYMENT FAILURE PLAYBOOKS
// ============================================================

{
  id: "PB-036",

  title: "Failed Production Deployment Recovery",

  category: "Deployment",

  rootCauseKeywords: [
    "deployment failed",
    "failed deployment",
    "production deployment failed",
    "release failed"
  ],

  affectedServices: [
    "deployment",
    "api-gateway",
    "user-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Review deployment logs, identify the failed release stage, verify deployment artifacts, and restore a healthy application deployment.",


},

{
  id: "PB-037",

  title: "Application Startup Failure After Deployment",

  category: "Deployment",

  rootCauseKeywords: [
    "application failed to start",
    "startup failure",
    "startup exception",
    "service failed after deployment"
  ],

  affectedServices: [
    "deployment",
    "user-service",
    "payment-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect application startup logs, identify initialization failures, validate runtime configuration, and restore successful service startup.",


},

{
  id: "PB-038",

  title: "Container Image Deployment Failure",

  category: "Deployment",

  rootCauseKeywords: [
    "container image not found",
    "image pull failed",
    "invalid container image",
    "image registry unavailable"
  ],

  affectedServices: [
    "deployment",
    "api-gateway",
    "user-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Verify container image availability, inspect registry connectivity, validate image tags, and restore successful container deployment.",


},

{
  id: "PB-039",

  title: "Configuration Error After Deployment",

  category: "Deployment",

  rootCauseKeywords: [
    "configuration error",
    "invalid configuration",
    "missing configuration",
    "environment configuration"
  ],

  affectedServices: [
    "deployment",
    "user-service",
    "authentication",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect deployment configuration, validate environment variables, compare configuration versions, and restore a valid runtime configuration.",


},

{
  id: "PB-040",

  title: "Deployment Rollout Interrupted",

  category: "Deployment",

  rootCauseKeywords: [
    "rollout failed",
    "deployment rollout interrupted",
    "rolling update failed",
    "deployment stuck"
  ],

  affectedServices: [
    "deployment",
    "api-gateway",
    "order-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Review rollout progress, identify interrupted deployment stages, verify deployment controller health, and restore successful rollout completion.",


},

{
  id: "PB-041",

  title: "Blue-Green Deployment Switch Failure",

  category: "Deployment",

  rootCauseKeywords: [
    "blue green deployment failed",
    "traffic switch failed",
    "green environment failed",
    "blue green rollback"
  ],

  affectedServices: [
    "deployment",
    "api-gateway",
    "user-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Validate blue-green deployment configuration, inspect traffic switching rules, verify target environment health, and restore stable traffic routing.",


},

{
  id: "PB-042",

  title: "Database Migration Failure During Deployment",

  category: "Deployment",

  rootCauseKeywords: [
    "database migration failed",
    "schema migration error",
    "migration rollback",
    "db migration issue"
  ],

  affectedServices: [
    "database",
    "deployment",
    "user-service",
    "order-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Inspect migration scripts, validate schema changes, check backward compatibility, and restore database consistency before redeployment.",


},

{
  id: "PB-043",

  title: "Service Discovery Failure After Deployment",

  category: "Deployment",

  rootCauseKeywords: [
    "service not registered",
    "service discovery failed",
    "registry unavailable",
    "service lookup failed"
  ],

  affectedServices: [
    "api-gateway",
    "deployment",
    "user-service",
    "order-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Verify service registry health, ensure services are properly registered, and restore service discovery communication.",


},

{
  id: "PB-044",

  title: "Load Balancer Misconfiguration After Deployment",

  category: "Deployment",

  rootCauseKeywords: [
    "load balancer misconfigured",
    "routing mismatch",
    "target group unhealthy",
    "lb configuration error"
  ],

  affectedServices: [
    "api-gateway",
    "deployment",
    "user-service",
    "order-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Validate load balancer configuration, check target health status, and restore correct routing to healthy service instances.",


},

{
  id: "PB-045",

  title: "Partial Deployment Rollout Causing Service Version Mismatch",

  category: "Deployment",

  rootCauseKeywords: [
    "version mismatch",
    "partial deployment",
    "service version conflict",
    "inconsistent deployment"
  ],

  affectedServices: [
    "api-gateway",
    "user-service",
    "order-service",
    "deployment"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Ensure consistent service version rollout, verify deployment consistency across nodes, and resolve version mismatch issues.",


},

{

  id: "PB-046",

  title: "Health Check Endpoint Failure",

  category: "Deployment",

  rootCauseKeywords: [

    "health check failure",

    "unhealthy service",

    "probe timeout",

    "liveness probe failed",

    "readiness probe failed"

  ],

  affectedServices: [

    "health-check",

    "api-gateway"

  ],

  severity: [

    "medium",

    "high"

  ],

  summary:

    "Investigate failing health check endpoints, verify service availability, review probe configurations, and ensure dependent services are responding correctly."

},

// ============================================================
// Ends DEPLOYMENT FAILURE PLAYBOOKS
// ============================================================


// ============================================================
// CPU SPIKES PLAYBOOKS
// ============================================================

{
  id: "PB-047",

  title: "High CPU Spike Across Services",

  category: "CPU Spike",

  rootCauseKeywords: [
    "cpu spike",
    "high cpu usage",
    "cpu utilization high",
    "processor overload"
  ],

  affectedServices: [
    "api-gateway",
    "user-service",
    "order-service",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Identify CPU-intensive processes, analyze request load distribution, and mitigate excessive computational usage across services.",


},

{
  id: "PB-048",

  title: "Memory Leak Causing Service Degradation",

  category: "CPU Spike",

  rootCauseKeywords: [
    "memory leak",
    "heap memory issue",
    "out of memory",
    "increasing memory usage"
  ],

  affectedServices: [
    "user-service",
    "order-service",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Analyze memory allocation patterns, detect memory leaks, and stabilize service memory usage by identifying problematic code paths.",


},

{
  id: "PB-049",

  title: "Disk Space Exhaustion Impacting Services",

  category: "CPU Spike",

  rootCauseKeywords: [
    "disk full",
    "no space left",
    "storage exhausted",
    "disk usage high"
  ],

  affectedServices: [
    "database",
    "logging",
    "api-gateway"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Clean up disk usage, identify large log files or artifacts, and restore sufficient storage capacity for system stability.",


},

{
  id: "PB-050",

  title: "Thread Pool Exhaustion in Application Services",

  category: "CPU Spike",

  rootCauseKeywords: [
    "thread pool exhausted",
    "too many threads",
    "concurrent request overload",
    "thread starvation"
  ],

  affectedServices: [
    "api-gateway",
    "user-service",
    "order-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Analyze thread pool usage, optimize concurrency limits, and restore request handling capacity across services.",


},

{
  id: "PB-051",

  title: "Database Query Performance Degradation",

  category: "CPU Spike",

  rootCauseKeywords: [
    "slow query",
    "database performance issue",
    "query timeout",
    "query execution slow"
  ],

  affectedServices: [
    "database",
    "order-service",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Optimize database queries, analyze execution plans, and improve indexing strategy to restore normal query performance.",


},

{
  id: "PB-052",

  title: "Cache Overload Causing System Latency",

  category: "CPU Spike",

  rootCauseKeywords: [
    "cache overload",
    "cache miss spike",
    "redis slow",
    "cache saturation"
  ],

  affectedServices: [
    "cache",
    "api-gateway",
    "user-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Analyze cache utilization, optimize caching strategy, and restore efficient cache hit ratios.",


},

{
  id: "PB-053",

  title: "Network Latency Causing System Slowdown",

  category: "CPU Spike",

  rootCauseKeywords: [
    "network latency",
    "slow response",
    "packet delay",
    "high latency"
  ],

  affectedServices: [
    "api-gateway",
    "payment-service",
    "order-service"
  ],

  severity: [
    "high",
    "medium"
  ],

  summary:
    "Analyze network delays, inspect routing issues, and restore stable communication between services.",


},

{
  id: "PB-054",

  title: "Service Bottleneck Due to Sequential Processing",

  category: "CPU Spike",

  rootCauseKeywords: [
    "bottleneck",
    "sequential processing",
    "slow pipeline",
    "blocking operation"
  ],

  affectedServices: [
    "order-service",
    "payment-service"
  ],

  severity: [
    "medium",
    "low"
  ],

  summary:
    "Identify blocking operations, optimize pipeline execution, and introduce parallel processing where possible.",


},

{
  id: "PB-055",

  title: "Logging Overhead Causing Performance Degradation",

  category: "CPU Spike",

  rootCauseKeywords: [
    "excessive logging",
    "logging overhead",
    "log flood",
    "high log volume"
  ],

  affectedServices: [
    "logging",
    "api-gateway",
    "user-service"
  ],

  severity: [
    "medium"
  ],

  summary:
    "Reduce logging verbosity, optimize log batching, and stabilize system performance impacted by excessive logging.",


},

{
  id: "PB-056",

  title: "Garbage Collection Pressure Causing CPU Throttling",

  category: "CPU Spike",

  rootCauseKeywords: [
    "gc overhead",
    "garbage collection high",
    "jvm gc pressure",
    "cpu throttling"
  ],

  affectedServices: [
    "user-service",
    "order-service",
    "payment-service"
  ],

  severity: [
    "critical",
    "high"
  ],

  summary:
    "Tune garbage collection settings, reduce object creation pressure, and stabilize CPU usage across runtime services.",


},

{
  id: "PB-057",

  title: "System Resource Exhaustion",

  category: "CPU Spike",

  rootCauseKeywords: [
    "system overload",
    "resource exhaustion",
    "host failure",
    "disk full",
    "system instability",
    "kernel issue"
  ],

  affectedServices: [
    "system",
    "monitoring"
  ],

  severity: [
    "high",
    "critical"
  ],

  summary:
    "Investigate host-level resource usage, disk capacity, operating system health, and monitoring alerts to identify infrastructure issues affecting multiple services."
}

// ============================================================
// Ends CPU SPIKES PLAYBOOKS
// ============================================================

];



