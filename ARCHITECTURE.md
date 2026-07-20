# Resolvix AI Architecture Documentation

## System Overview

```mermaid
flowchart TB
    subgraph "User Interface"
        UI[Next.js Frontend\nlocalhost:3000]
    end

    subgraph "Backend Layer"
        API[Express.js API\nlocalhost:5000]
        GRAPH[LangGraph Workflow\nOrchestration Engine]
    end

    subgraph "AI Layer"
        QWEN[Qwen Cloud API\ndashscope.aliyuncs.com]
    end

    subgraph "Data Layer"
        MONGO[(MongoDB\nresolvix-ai)]
    end

    subgraph "Real-time"
        SOCKET[Socket.IO\nWebSocket]
    end

    UI -->|REST API| API
    UI -->|WebSocket| SOCKET
    API -->|Workflow Init| GRAPH
    GRAPH -->|AI Calls| QWEN
    GRAPH <-->|State Persistence| MONGO
    SOCKET <-->|Real-time Updates| GRAPH

    style UI fill:#e3f2fd
    style API fill:#f3e5f5
    style GRAPH fill:#e8f5e8
    style QWEN fill:#fff3e0
    style MONGO fill:#ffebee
    style SOCKET fill:#fce4ec
```

## Agent Architecture

### Agent List

| #   | Agent          | File                                                    | Purpose                                  |
| --- | -------------- | ------------------------------------------------------- | ---------------------------------------- |
| 1   | Orchestrator   | `src/agents/orchestratorAgent/orchestrator.agent.ts`    | Workflow coordination                    |
| 2   | Log Analysis   | `src/agents/log-analysisAgent/logAnalysis.agent.ts`     | Extract errors, build timeline, patterns |
| 3   | Root Cause     | `src/agents/root-causeAgent/rootCouse.agnte.ts`         | Identify probable root cause             |
| 4   | Fix Agent      | `src/agents/fixAgent/fixAgent.agent.ts`                 | Generate remediation recommendations     |
| 5   | Risk Validator | `src/agents/risk-validatorAgent/riskValidator.agent.ts` | Validate remediation safety              |
| 6   | Executor       | `src/langGraph/nodes/executor.node.ts`                  | Execute approved commands                |
| 7   | Reporter       | `src/langGraph/nodes/reporter.node.ts`                  | Generate incident report                 |

### Workflow Nodes

```
src/langGraph/nodes/
├── orchestrator.node.ts      # Entry point - workflow initialization
├── logAnalysis.node.ts       # Log extraction and analysis
├── rootCause.node.ts         # Root cause identification
├── fix.node.ts               # Fix recommendation generation
├── riskValidator.node.ts     # Risk assessment and validation
├── approvalRouter.node.ts    # Approval routing decision
├── executor.node.ts          # Command execution
├── reporter.node.ts          # Report generation
└── complete.node.ts          # Workflow completion
```

## Qwen Cloud Integration

```mermaid
graph TD
    subgraph "AI Integration Stack"
        subgraph "Qwen Layer"
            QWEN1[qwen.client.ts\nDirect API Client]
            QWEN2[qwen.langchain.ts\nLangChain Wrapper]
        end

        subgraph "Configuration"
            CONFIG[qwen.config.ts\nQWEN_CONFIG]
        end

        subgraph "Agents Using Qwen"
            O[Orchestrator]
            LA[Log Analysis]
            RC[Root Cause]
            FA[Fix Agent]
            RV[Risk Validator]
            RE[Reporter]
        end

        CONFIG --> QWEN1
        CONFIG --> QWEN2
        QWEN1 --> API[Qwen Cloud API]
        QWEN2 --> API
        O --> QWEN2
        LA --> QWEN2
        RC --> QWEN2
        FA --> QWEN2
        RV --> QWEN2
        RE --> QWEN2
    end

    style QWEN1 fill:#fff3e0
    style QWEN2 fill:#ffebee
    style CONFIG fill:#f3e5f5
```

## Database Schema

```
src/models/
├── user.model.ts             # User authentication
├── incident.model.ts         # Incident records
├── log.model.ts              # Log entries
├── report.model.ts           # Generated reports
├── agentExecution.model.ts   # Agent execution tracking
└── audit.model.ts            # Audit trail
```

### Incident Model Fields

| Field           | Type   | Description                  |
| --------------- | ------ | ---------------------------- |
| title           | String | Incident title               |
| description     | String | Incident description         |
| severity        | Enum   | critical, high, medium, low  |
| status          | Enum   | open, in_progress, resolved  |
| detectedAt      | Date   | Detection timestamp          |
| rootCause       | String | Identified root cause        |
| fixSummary      | String | Applied fix summary          |
| executionStatus | Enum   | SUCCESS, FAILED, ROLLED_BACK |
| resolvedAt      | Date   | Resolution timestamp         |
| mttr            | Number | Mean Time To Resolution (ms) |

## Tool Architecture

```mermaid
graph TD
    subgraph "Tool Wrapper Pattern"
        subgraph "Fix Agent (5 Tools)"
            FIXW1[searchFixPlaybook\nWrapper]
            FIXW2[searchRunbook\nWrapper]
            FIXW3[configurationReader\nWrapper]
            FIXW4[configDiff\nWrapper]
            FIXW5[serviceInventory\nWrapper]
        end

        subgraph "Log Analyzer (5 Tools)"
            LOGW1[extractErrors\nWrapper]
            LOGW2[buildTimeline\nWrapper]
            LOGW3[groupLogs\nWrapper]
            LOGW4[extractAffectedServices\nWrapper]
            LOGW5[dependencyMapper\nWrapper]
        end

        subgraph "Risk Validator (4 Tools)"
            RISKW1[approvalPolicy\nWrapper]
            RISKW2[maintenanceWindow\nWrapper]
            RISKW3[impactAssessment\nWrapper]
            RISKW4[missingValidation\nWrapper]
        end

        subgraph "Executor Agent (4 Tools)"
            EXECW1[executeCommand\nWrapper]
            EXECW2[verifyExecution\nWrapper]
            EXECW3[rollback\nWrapper]
            EXECW4[notification\nWrapper]
        end

        subgraph "Reporter Agent (3 Tools)"
            REP[reportFormatter\nWrapper]
            METRIC[metricsTool\nWrapper]
            TL[buildTimeline\nWrapper]
        end

        EXECW1 -->|calls| EXEC1[executeCommand\nExecutor]
        EXECW2 -->|calls| EXEC2[verifyExecution\nExecutor]
    end

    style FIXW1 fill:#e8f5e8
    style LOGW1 fill:#f3e5f5
    style RISKW1 fill:#ffebee
```

## Service Layer Architecture

```
src/services/
├── agentsServices/
│   ├── orchestratorAgentService/orchestrator.service.ts
│   ├── logAnalyzerService/logAnalyzer.service.ts
│   ├── rootCauseAgentService/rootCause.Service.ts
│   ├── fixAgentService/fixAgent.service.ts
│   ├── riskValidationAgentService/riskValidatorAgent.service.ts
│   ├── executorAgentService/executorAgent.service.ts
│   └── reporterAgentService/reporter.service.ts
├── incidentSimulatorServices/
│   ├── db-failure.service.ts
│   ├── memory-leak.service.ts
│   ├── api-500-error.service.ts
│   ├── deployment-failure.service.ts
│   ├── cpu-spike.service.ts
│   └── index.ts
├── agentExecutionServices/
│   ├── getExecutionByIncidentId.service.ts
│   ├── getExecutionById.service.ts
│   └── getAllExecution.service.ts
├── incidentServices/
│   ├── approveIncident.service.ts
│   ├── rejectIncident.service.ts
│   ├── developerResume.service.ts
│   ├── getIncidentById.service.ts
│   ├── getIncident.service.ts
│   └── incident.filter.ts
├── dashboardServices/
│   ├── dashboardOverview.service.ts
│   ├── dashboardMttr.service.ts
│   ├── dashboardIncidentOverview.service.ts
│   ├── dashboardHealthMetrics.service.ts
│   └── dashboardChart.service.ts
├── reportServices/
│   ├── getReports.service.ts
│   └── getReportById.service.ts
├── notificationService/notification.service.ts
├── auth.service.ts
├── email.service.ts
└── token.service.ts
```

## API Routes Structure

```mermaid
graph TD
    subgraph "API Routes"
        RAUTH[/api/auth/]
        RSIM[/api/simulate/]
        RINC[/api/incidents/]
        RDASH[/api/dashboard/]
        RAGT[/api/agents/]
        RNOTIF[/api/notification/]
        REPORT[/api/reports/]
        RUSER[/api/user/]
    end

    subgraph "Auth Routes"
        RAUTH -->|POST| LOGIN[/login]
        RAUTH -->|POST| REG[/register]
        RAUTH -->|POST| REF[/refresh]
        RAUTH -->|POST| LOGO[/logout]
    end

    subgraph "Simulation Routes"
        RSIM -->|POST| DB[/db-failure]
        RSIM -->|POST| MEM[/memory-leak]
        RSIM -->|POST| API500[/api-500-error]
        RSIM -->|POST| DEP[/deployment-failure]
        RSIM -->|POST| CPU[/cpu-spike]
    end

    subgraph "Incident Routes"
        RINC -->|GET| GETALL[/]
        RINC -->|GET| GETONE[:id]
        RINC -->|PATCH| APP[/:id/approve]
        RINC -->|PATCH| REJ[/:id/reject]
        RINC -->|PATCH| RES[/threadId/resume]
    end

    subgraph "Agent Routes"
        RAGT -->|GET| STATUS[/status/:incidentId]
    end
```

## Configuration Files

```
src/config/
├── db.ts                    # MongoDB connection setup
├── validateEnv.ts           # Zod environment validation
├── rateLimiter.ts           # Rate limiting configuration
├── email.ts                 # Email transport config
├── approvalPolicyTool.config.ts
└── maintaincepolicy.config.ts
```

### Environment Variables

```env
# Required
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/resolvix-ai
JWT_SECRET=your-jwt-secret
DASHSCOPE_API_KEY=sk-...
QWEN_MODEL=qwen-plus

# Optional
PORT=5000
LOG_LEVEL=info
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d
CLIENT_URL=http://localhost:3000
EMAIL_USER=
EMAIL_PASS=
```

## Socket.IO Real-time Updates

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant BE as Backend (Socket.IO)
    participant GRAPH as LangGraph

    FE->>BE: io.connect()
    BE->>FE: Connection established

    loop Workflow Execution
        GRAPH->>BE: Emit agent-status events
        BE->>FE: Forward agent-status
        GRAPH->>BE: Emit notification events
        BE->>FE: Forward notification
    end

    FE->>BE: Emit events (if needed)
```

Event Types:

- `agent-status` - Real-time agent execution status
- `notification` - System notifications
- `dashboard-update` - Dashboard data updates

## Data Flow Diagram

```mermaid
flowchart LR
    subgraph "Data Sources"
        SIM[Simulation\nServices]
        MOCK[Mock Data\nplaybooks.data.ts]
    end

    subgraph "Workflow State"
        STATE[WorkflowGraphState\n(LangGraph Annotation)]
    end

    subgraph "Persistence"
        MONGO[(MongoDB\nWorkflow Checkpoints)]
    end

    SIM -->|Creates Incident| STATE
    MOCK -->|Knowledge Base| STATE
    STATE <-->|Save/Load| MONGO
```

## Frontend Architecture

```mermaid
flowchart TB
    subgraph "Frontend (Next.js 15)"
        PAGE[App Router Pages]
        FEATURE[Feature Components]
        COMP[UI Components]
        HOOK[React Hooks]
        STORE[Zustand Stores]
        SVC[API Services]
        SOCK[Socket Client]

        PAGE --> FEATURE
        FEATURE --> COMP
        FEATURE --> HOOK
        HOOK --> SVC
        HOOK --> STORE
        SVC -->|REST| API
        SOCK -->|WebSocket| BE
    end

    subgraph "API Layer"
        API[Backend API\nlocalhost:5000]
        BE[Socket.IO\nlocalhost:5000]
    end

    style PAGE fill:#e3f2fd
    style FEATURE fill:#f3e5f5
    style SOCK fill:#fce4ec
```

## Development Flow

```mermaid
flowchart LR
    subgraph "Development"
        DEV1[pnpm dev:backend]
        DEV2[pnpm dev:frontend]
        DEV3[docker-compose up]
    end

    subgraph "Backend Flow"
        START[server.ts]
        APP[app.ts]
        GRAPH[LangGraph\ninitializeWorkflow]
        MONGO[MongoDB\nconnectDB]
        SOCKET[Socket.IO\ncreateHttpServer]

        START --> APP
        APP --> MONGO
        APP --> GRAPH
        APP --> SOCKET
    end

    subgraph "Frontend Flow"
        FRONT[Next.js Dev\nServer]

        DEV2 --> FRONT
    end

    subgraph "Docker Flow"
        DOCKER[docker-compose.yml]
        DOCKER -->|builds| MONGODB[mongodb:7.0]
        DOCKER -->|builds| BACKEND[resolvix-backend]
        DOCKER -->|builds| FRONTEND[resolvix-frontend]
    end

    DEV1 --> START
```
