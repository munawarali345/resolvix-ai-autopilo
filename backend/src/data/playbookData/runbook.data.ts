
import { Runbook } from "../../types/runbook.types.js";

export const RUNBOOKS: Runbook[] = [

  // ============================================================
  // DB FAILURE - CONNECTION POOL
  // ============================================================

  {
    id: "RB-001",

    title: "Database Connection Pool Exhaustion Recovery",

    scenario: "db-failure",

    category: "Database",

    service: ["database", "api-gateway", "payment-service", "monitoring"],

    triggerConditions: [
      "connection pool exhausted",
      "too many connections",
      "db timeout"
    ],

    steps: [
      {
        order: 1,
        action: "Check active DB connections",
        command: "SHOW PROCESSLIST;",
        expectedResult: "Active connections visible"
      },
      {
        order: 2,
        action: "Identify stale connections",
        command: "SELECT * FROM pg_stat_activity;",
        expectedResult: "Stale sessions listed"
      },
      {
        order: 3,
        action: "Terminate idle connections",
        command: "SELECT pg_terminate_backend(pid);",
        expectedResult: "Idle connections cleared"
      },
      {
        order: 4,
        action: "Restart connection pool service",
        command: "systemctl restart db-pool",
        expectedResult: "Pool restarted successfully"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "15-30 minutes",

    
  },

  // ============================================================
  // DB FAILURE - DATABASE UNAVAILABLE
  // ============================================================

  {
    id: "RB-002",

    title: "Database Service Recovery Procedure",

    scenario: "db-failure",

    category: "Database",

    service: ["database", "user-service", "order-service", "health-check", "monitoring"],

    triggerConditions: [
      "database unreachable",
      "db offline",
      "connection refused"
    ],

    steps: [
      {
        order: 1,
        action: "Check DB service status",
        command: "systemctl status postgresql",
        expectedResult: "DB service status displayed"
      },
      {
        order: 2,
        action: "Restart database service",
        command: "systemctl restart postgresql",
        expectedResult: "Database restarted"
      },
      {
        order: 3,
        action: "Verify connectivity",
        command: "ping db-host",
        expectedResult: "Network reachable"
      }
    ],

    automationLevel: "manual",

    severity: "critical",

    estimatedTime: "5-10 minutes",

    
  },

  // ============================================================
  // DB FAILURE - AUTH ISSUE
  // ============================================================

  {
    id: "RB-003",

    title: "Database Authentication Failure Recovery",

    scenario: "db-failure",

    category: "Database",

    service: ["database", "authentication", "logging"],

    triggerConditions: [
      "authentication failed",
      "invalid credentials",
      "access denied"
    ],

    steps: [
      {
        order: 1,
        action: "Verify DB credentials",
        command: "cat /etc/db/credentials",
        expectedResult: "Credentials loaded"
      },
      {
        order: 2,
        action: "Check secret rotation logs",
        command: "kubectl get secrets",
        expectedResult: "Secrets verified"
      },
      {
        order: 3,
        action: "Reload authentication config",
        command: "systemctl restart auth-service",
        expectedResult: "Auth service restarted"
      }
    ],

    automationLevel: "semi-automated",

    severity: "high",

    estimatedTime: "15-30 minutes",

    
  },

  // ============================================================
  // DB FAILURE - NETWORK ISSUE
  // ============================================================

  {
    id: "RB-004",

    title: "Database Network Connectivity Recovery",

    scenario: "db-failure",

    category: "Database",

    service: ["database", "api-gateway", "system"],

    triggerConditions: [
      "network timeout",
      "connection refused",
      "db unreachable network"
    ],

    steps: [
      {
        order: 1,
        action: "Check network routes",
        command: "netstat -rn",
        expectedResult: "Routing table displayed"
      },
      {
        order: 2,
        action: "Check firewall rules",
        command: "iptables -L",
        expectedResult: "Firewall rules shown"
      },
      {
        order: 3,
        action: "Restart network interface",
        command: "systemctl restart network",
        expectedResult: "Network restored"
      }
    ],

    automationLevel: "manual",

    severity: "critical",

    estimatedTime: "15-30 minutes",

    
  },

  // ============================================================
  // DB FAILURE - RESOURCE SATURATION
  // ============================================================

  {
    id: "RB-005",

    title: "Database Resource Saturation Recovery",

    scenario: "db-failure",

    category: "Database",

    service: ["database", "analytics-engine", "monitoring"],

    triggerConditions: [
      "cpu high db",
      "memory high db",
      "slow database"
    ],

    steps: [
      {
        order: 1,
        action: "Check DB resource usage",
        command: "top",
        expectedResult: "CPU/Memory usage visible"
      },
      {
        order: 2,
        action: "Identify heavy queries",
        command: "SELECT * FROM pg_stat_statements;",
        expectedResult: "Slow queries listed"
      },
      {
        order: 3,
        action: "Restart DB service",
        command: "systemctl restart postgresql",
        expectedResult: "Database stabilized"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "20-40 minutes",

    
  },

  // ============================================================
  // Ends DB FAILURE 
  // ============================================================


   // ============================================================
  // MEMORY LEAK - HIGH HEAP USAGE
  // ============================================================

  {
    id: "RB-006",

    title: "Memory Leak Detection and Stabilization",

    scenario: "memory-leak",

    category: "Performance",

    service: ["user-service", "order-service", "payment-service", "monitoring"],

    triggerConditions: [
      "memory leak",
      "heap memory increasing",
      "out of memory",
      "high ram usage"
    ],

    steps: [
      {
        order: 1,
        action: "Check memory usage per process",
        command: "top -o %MEM",
        expectedResult: "Processes sorted by memory usage"
      },
      {
        order: 2,
        action: "Identify leaking service",
        command: "ps aux --sort=-%mem",
        expectedResult: "High memory process identified"
      },
      {
        order: 3,
        action: "Restart affected service",
        command: "systemctl restart user-service",
        expectedResult: "Memory reset after restart"
      },
      {
        order: 4,
        action: "Verify memory stabilization",
        command: "free -m",
        expectedResult: "Stable memory usage observed"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "20-40 minutes",

    
  },

  // ============================================================
  // MEMORY LEAK - JVM / NODE HEAP PRESSURE
  // ============================================================

  {
    id: "RB-007",

    title: "Heap Memory Pressure Recovery",

    scenario: "memory-leak",

    category: "Performance",

    service: ["api-gateway", "analytics-engine", "system"],

    triggerConditions: [
      "heap memory error",
      "gc overhead",
      "jvm memory high",
      "node heap out of memory"
    ],

    steps: [
      {
        order: 1,
        action: "Check heap stats",
        command: "node --inspect",
        expectedResult: "Heap snapshot available"
      },
      {
        order: 2,
        action: "Trigger garbage collection",
        command: "kill -SIGUSR2 <pid>",
        expectedResult: "GC triggered"
      },
      {
        order: 3,
        action: "Restart service",
        command: "systemctl restart api-gateway",
        expectedResult: "Service restarted"
      }
    ],

    automationLevel: "manual",

    severity: "high",

    estimatedTime: "20-40 minutes",

    
  },

  // ============================================================
  // MEMORY LEAK - CACHE OVERFLOW
  // ============================================================

  {
    id: "RB-008",

    title: "Cache Memory Overflow Recovery",

    scenario: "memory-leak",

    category: "Performance",

    service: ["cache", "api-gateway", "monitoring"],

    triggerConditions: [
      "redis memory full",
      "cache overflow",
      "cache saturation"
    ],

    steps: [
      {
        order: 1,
        action: "Check cache memory usage",
        command: "redis-cli info memory",
        expectedResult: "Memory stats displayed"
      },
      {
        order: 2,
        action: "Flush non-critical cache keys",
        command: "redis-cli FLUSHDB",
        expectedResult: "Cache cleaned"
      },
      {
        order: 3,
        action: "Restart cache service",
        command: "systemctl restart redis",
        expectedResult: "Redis restarted"
      }
    ],

    automationLevel: "semi-automated",

    severity: "high",

    estimatedTime: "10-15 minutes",

    
  },

  // ============================================================
  // MEMORY LEAK - CONTAINER MEMORY LIMIT EXCEEDED
  // ============================================================

  {
    id: "RB-009",

    title: "Container Memory Limit Breach Recovery",

    scenario: "memory-leak",

    category: "Deployment",

    service: ["api-gateway", "user-service", "deployment"],

    triggerConditions: [
      "oom killed",
      "container memory limit exceeded",
      "pod killed memory"
    ],

    steps: [
      {
        order: 1,
        action: "Check pod status",
        command: "kubectl get pods",
        expectedResult: "Pod crash status visible"
      },
      {
        order: 2,
        action: "Inspect memory limits",
        command: "kubectl describe pod",
        expectedResult: "Resource limits shown"
      },
      {
        order: 3,
        action: "Restart deployment",
        command: "kubectl rollout restart deployment api-gateway",
        expectedResult: "Pod recreated"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "20-40 minutes",

    
  },

  // ============================================================
  // MEMORY LEAK - LONG RUNNING PROCESS LEAK
  // ============================================================

  {
    id: "RB-010",

    title: "Long Running Process Memory Leak Fix",

    scenario: "memory-leak",

    category: "System",

    service: ["order-service", "analytics-engine", "system", "monitoring"],

    triggerConditions: [
      "slow memory leak",
      "gradual memory increase",
      "long running service degradation"
    ],

    steps: [
      {
        order: 1,
        action: "Monitor process memory trend",
        command: "sar -r 1 10",
        expectedResult: "Memory trend visible"
      },
      {
        order: 2,
        action: "Identify process growth",
        command: "top -p <pid>",
        expectedResult: "Growing memory usage confirmed"
      },
      {
        order: 3,
        action: "Gracefully restart service",
        command: "systemctl restart order-service",
        expectedResult: "Service restarted cleanly"
      }
    ],

    automationLevel: "manual",

    severity: "medium",

    estimatedTime: "20-40 minutes",

    
  },

   // ============================================================
  // Ends MEMORY LEAK
  // ============================================================


  // ============================================================
  // API 500 - HIGH ERROR RATE (GATEWAY ISSUE)
  // ============================================================

  {
    id: "RB-011",

    title: "API Gateway 500 Error Recovery",

    scenario: "api-500-error",

    category: "API",

    service: ["api-gateway", "authentication", "logging", "health-check"],

    triggerConditions: [
      "500 internal server error",
      "gateway failure",
      "high api error rate"
    ],

    steps: [
      {
        order: 1,
        action: "Check API gateway health",
        command: "kubectl get pods api-gateway",
        expectedResult: "Pods status visible"
      },
      {
        order: 2,
        action: "Inspect logs for errors",
        command: "kubectl logs api-gateway",
        expectedResult: "Error logs identified"
      },
      {
        order: 3,
        action: "Restart API gateway",
        command: "kubectl rollout restart deployment api-gateway",
        expectedResult: "Gateway restarted successfully"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "10-15 minutes",

    
  },

  // ============================================================
  // API 500 - AUTH FAILURE SPIKE
  // ============================================================

  {
    id: "RB-012",

    title: "Authentication Service Failure Recovery",

    scenario: "api-500-error",

    category: "API",

    service: ["authentication", "user-service", "health-check"],

    triggerConditions: [
      "auth failure",
      "token invalid",
      "login API 500"
    ],

    steps: [
      {
        order: 1,
        action: "Check auth service status",
        command: "systemctl status auth-service",
        expectedResult: "Service status shown"
      },
      {
        order: 2,
        action: "Restart authentication service",
        command: "systemctl restart auth-service",
        expectedResult: "Auth service restarted"
      },
      {
        order: 3,
        action: "Verify token generation",
        command: "curl /auth/health",
        expectedResult: "200 OK response"
      }
    ],

    automationLevel: "manual",

    severity: "high",

    estimatedTime: "15-30 minutes",

    
  },

  // ============================================================
  // API 500 - DATABASE PROPAGATED ERROR
  // ============================================================

  {
    id: "RB-013",

    title: "Database Propagated API Failure Fix",

    scenario: "api-500-error",

    category: "Database",

    service: ["database", "api-gateway", "order-service", "logging"],

    triggerConditions: [
      "database error causing api 500",
      "query failure",
      "db timeout api error"
    ],

    steps: [
      {
        order: 1,
        action: "Check DB connectivity",
        command: "ping database",
        expectedResult: "DB reachable"
      },
      {
        order: 2,
        action: "Check slow queries",
        command: "SELECT * FROM slow_log;",
        expectedResult: "Slow queries identified"
      },
      {
        order: 3,
        action: "Restart dependent API services",
        command: "kubectl rollout restart deployment order-service",
        expectedResult: "Services recovered"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "20-40 minutes",

    
  },

  // ============================================================
  // API 500 - DEPLOYMENT BAD BUILD
  // ============================================================

  {
    id: "RB-014",

    title: "Rollback Bad Deployment Causing API Errors",

    scenario: "api-500-error",

    category: "Deployment",

    service: ["api-gateway", "user-service", "deployment", "health-check"],

    triggerConditions: [
      "bad deployment",
      "new release failure",
      "api error after deploy"
    ],

    steps: [
      {
        order: 1,
        action: "Check deployment history",
        command: "kubectl rollout history deployment api-gateway",
        expectedResult: "Previous versions listed"
      },
      {
        order: 2,
        action: "Rollback deployment",
        command: "kubectl rollout undo deployment api-gateway",
        expectedResult: "Rollback successful"
      },
      {
        order: 3,
        action: "Verify API health",
        command: "curl /health",
        expectedResult: "200 OK response"
      }
    ],

    automationLevel: "automated",

    severity: "critical",

    estimatedTime: "10-15 minutes",

    
  },

  // ============================================================
  // API 500 - RATE LIMIT / TRAFFIC SPIKE
  // ============================================================

  {
    id: "RB-015",

    title: "API Traffic Spike Mitigation",

    scenario: "api-500-error",

    category: "Performance",

    service: ["api-gateway", "cache", "monitoring"],

    triggerConditions: [
      "rate limit exceeded",
      "traffic spike",
      "api overload"
    ],

    steps: [
      {
        order: 1,
        action: "Check traffic metrics",
        command: "kubectl top pods",
        expectedResult: "High traffic confirmed"
      },
      {
        order: 2,
        action: "Scale API gateway",
        command: "kubectl scale deployment api-gateway --replicas=5",
        expectedResult: "Pods scaled"
      },
      {
        order: 3,
        action: "Enable cache fallback",
        command: "enable-cache-mode",
        expectedResult: "Traffic stabilized"
      }
    ],

    automationLevel: "semi-automated",

    severity: "high",

    estimatedTime: "15-30 minutes",

    
  },

  // ============================================================
  // Ends API 500 
  // ============================================================

  // ============================================================
  // DEPLOYMENT - FAILED ROLLOUT
  // ============================================================

  {
    id: "RB-016",

    title: "Deployment Rollout Failure Recovery",

    scenario: "deployment-failure",

    category: "Deployment",

    service: ["api-gateway", "user-service", "order-service", "deployment", "logging", "monitoring"],

    triggerConditions: [
      "deployment failed",
      "rollout stuck",
      "container crashloop"
    ],

    steps: [
      {
        order: 1,
        action: "Check rollout status",
        command: "kubectl rollout status deployment api-gateway",
        expectedResult: "Rollout status shown"
      },
      {
        order: 2,
        action: "Check pod logs",
        command: "kubectl logs deployment/api-gateway",
        expectedResult: "Error logs visible"
      },
      {
        order: 3,
        action: "Restart deployment",
        command: "kubectl rollout restart deployment api-gateway",
        expectedResult: "Deployment restarted"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "10-15 minutes",

    
  },

  // ============================================================
  // DEPLOYMENT - IMAGE PULL FAILURE
  // ============================================================

  {
    id: "RB-017",

    title: "Container Image Pull Failure Fix",

    scenario: "deployment-failure",

    category: "Deployment",

    service: ["api-gateway", "payment-service", "deployment"],

    triggerConditions: [
      "image pull error",
      "image not found",
      "registry failure"
    ],

    steps: [
      {
        order: 1,
        action: "Check pod events",
        command: "kubectl describe pod",
        expectedResult: "Image pull error visible"
      },
      {
        order: 2,
        action: "Verify registry access",
        command: "docker pull image",
        expectedResult: "Registry accessible"
      },
      {
        order: 3,
        action: "Fix image tag and redeploy",
        command: "kubectl set image deployment api-gateway",
        expectedResult: "New image deployed"
      }
    ],

    automationLevel: "manual",

    severity: "high",

    estimatedTime: "15-30 minutes",

    
  },

  // ============================================================
  // DEPLOYMENT - CONFIGURATION ERROR
  // ============================================================

  {
    id: "RB-018",

    title: "Deployment Configuration Mismatch Fix",

    scenario: "deployment-failure",

    category: "Deployment",

    service: ["user-service", "order-service", "deployment"],

    triggerConditions: [
      "config error",
      "environment mismatch",
      "missing env variables"
    ],

    steps: [
      {
        order: 1,
        action: "Check config map",
        command: "kubectl get configmap",
        expectedResult: "Config maps listed"
      },
      {
        order: 2,
        action: "Inspect environment variables",
        command: "kubectl describe pod",
        expectedResult: "Env mismatch detected"
      },
      {
        order: 3,
        action: "Update deployment config",
        command: "kubectl apply -f deployment.yaml",
        expectedResult: "Config fixed"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "15-30 minutes",

    
  },

  // ============================================================
  // DEPLOYMENT - CRASHLOOP BACKOFF
  // ============================================================

  {
    id: "RB-019",

    title: "CrashLoopBackOff Recovery Procedure",

    scenario: "deployment-failure",

    category: "Deployment",

    service: ["api-gateway", "authentication", "deployment", "logging"],

    triggerConditions: [
      "crashloopbackoff",
      "pod restarting continuously",
      "container crash loop"
    ],

    steps: [
      {
        order: 1,
        action: "Check pod logs",
        command: "kubectl logs pod-name",
        expectedResult: "Crash reason identified"
      },
      {
        order: 2,
        action: "Describe pod state",
        command: "kubectl describe pod",
        expectedResult: "Restart reason visible"
      },
      {
        order: 3,
        action: "Rollback deployment",
        command: "kubectl rollout undo deployment api-gateway",
        expectedResult: "Stable version restored"
      }
    ],

    automationLevel: "automated",

    severity: "critical",

    estimatedTime: "10-15 minutes",

    
  },

  // ============================================================
  // DEPLOYMENT - NETWORK POLICY FAILURE
  // ============================================================

  {
    id: "RB-020",

    title: "Deployment Network Policy Issue Fix",

    scenario: "deployment-failure",

    category: "System",

    service: ["api-gateway", "database", "deployment", "system"],

    triggerConditions: [
      "network policy blocked",
      "service unreachable after deploy",
      "routing failure"
    ],

    steps: [
      {
        order: 1,
        action: "Check network policies",
        command: "kubectl get networkpolicy",
        expectedResult: "Policies listed"
      },
      {
        order: 2,
        action: "Inspect service routing",
        command: "kubectl get svc",
        expectedResult: "Service endpoints checked"
      },
      {
        order: 3,
        action: "Fix network policy rules",
        command: "kubectl apply -f networkpolicy.yaml",
        expectedResult: "Connectivity restored"
      }
    ],

    automationLevel: "manual",

    severity: "high",

    estimatedTime: "15-30 minutes",

    
  },

   // ============================================================
   //  Ends DEPLOYMENT 
  // ============================================================

    // ============================================================
  // CPU SPIKE - HIGH CPU USAGE DETECTION
  // ============================================================

  {
    id: "RB-021",

    title: "CPU Spike Detection and Stabilization",

    scenario: "cpu-spike",

    category: "Performance",

    service: ["api-gateway", "analytics-engine", "user-service", "system", "monitoring"],

    triggerConditions: [
      "high cpu usage",
      "cpu spike",
      "system overload",
      "slow response time"
    ],

    steps: [
      {
        order: 1,
        action: "Check CPU usage",
        command: "top -o %CPU",
        expectedResult: "High CPU processes visible"
      },
      {
        order: 2,
        action: "Identify heavy process",
        command: "ps aux --sort=-%cpu",
        expectedResult: "Top CPU consuming process found"
      },
      {
        order: 3,
        action: "Restart affected service",
        command: "systemctl restart api-gateway",
        expectedResult: "CPU load reduced"
      }
    ],

    automationLevel: "semi-automated",

    severity: "critical",

    estimatedTime: "20-40 minutes",

    
  },

  // ============================================================
  // CPU SPIKE - INFINITE LOOP PROCESS
  // ============================================================

  {
    id: "RB-022",

    title: "Infinite Loop CPU Consumption Fix",

    scenario: "cpu-spike",

    category: "System",

    service: ["user-service", "order-service", "system"],

    triggerConditions: [
      "infinite loop",
      "cpu stuck at 100%",
      "uncontrolled process"
    ],

    steps: [
      {
        order: 1,
        action: "Find process PID",
        command: "ps aux | grep node",
        expectedResult: "PID identified"
      },
      {
        order: 2,
        action: "Kill runaway process",
        command: "kill -9 <pid>",
        expectedResult: "Process terminated"
      },
      {
        order: 3,
        action: "Restart service safely",
        command: "systemctl restart user-service",
        expectedResult: "Service restored"
      }
    ],

    automationLevel: "manual",

    severity: "critical",

    estimatedTime: "20-40 minutes",

  },

  // ============================================================
  // CPU SPIKE - TRAFFIC OVERLOAD
  // ============================================================

  {
    id: "RB-023",

    title: "Traffic-Induced CPU Spike Mitigation",

    scenario: "cpu-spike",

    category: "Performance",

    service: ["api-gateway", "cache", "monitoring"],

    triggerConditions: [
      "traffic spike",
      "request overload",
      "high request rate"
    ],

    steps: [
      {
        order: 1,
        action: "Check request load",
        command: "kubectl top pods",
        expectedResult: "High load confirmed"
      },
      {
        order: 2,
        action: "Scale service horizontally",
        command: "kubectl scale deployment api-gateway --replicas=5",
        expectedResult: "Load distributed"
      },
      {
        order: 3,
        action: "Enable caching layer",
        command: "enable-cache-mode",
        expectedResult: "CPU usage reduced"
      }
    ],

    automationLevel: "semi-automated",

    severity: "high",

    estimatedTime: "20-40 minutes",

  },

  // ============================================================
  // CPU SPIKE - BAD QUERY / DATABASE LOAD
  // ============================================================

  {
    id: "RB-024",

    title: "Database Query Causing CPU Spike",

    scenario: "cpu-spike",

    category: "Database",

    service: ["database", "analytics-engine", "monitoring"],

    triggerConditions: [
      "slow query",
      "high db cpu",
      "expensive query execution"
    ],

    steps: [
      {
        order: 1,
        action: "Check running queries",
        command: "SELECT * FROM pg_stat_activity;",
        expectedResult: "Active queries visible"
      },
      {
        order: 2,
        action: "Identify slow query",
        command: "SELECT * FROM pg_stat_statements;",
        expectedResult: "Slow queries found"
      },
      {
        order: 3,
        action: "Kill heavy query",
        command: "SELECT pg_cancel_backend(pid);",
        expectedResult: "Query stopped"
      }
    ],

    automationLevel: "manual",

    severity: "critical",

    estimatedTime: "20-40 minutes",

  },

  // ============================================================
  // CPU SPIKE - MEMORY PRESSURE LEADING CPU THRASHING
  // ============================================================

  {
    id: "RB-025",

    title: "CPU Throttling Due to Memory Pressure",

    scenario: "cpu-spike",

    category: "Performance",

    service: ["api-gateway", "user-service", "system", "monitoring"],

    triggerConditions: [
      "cpu throttling",
      "memory pressure cpu spike",
      "system lag high load"
    ],

    steps: [
      {
        order: 1,
        action: "Check memory usage",
        command: "free -m",
        expectedResult: "Memory pressure visible"
      },
      {
        order: 2,
        action: "Clear cache and buffers",
        command: "sync; echo 3 > /proc/sys/vm/drop_caches",
        expectedResult: "Memory freed"
      },
      {
        order: 3,
        action: "Restart affected service",
        command: "systemctl restart api-gateway",
        expectedResult: "System stabilized"
      }
    ],

    automationLevel: "semi-automated",

    severity: "high",

    estimatedTime: "20-40 minutes",

  }

];
