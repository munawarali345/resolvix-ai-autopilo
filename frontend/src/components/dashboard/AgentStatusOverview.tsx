// ================================================================
// AGENT OVERVIEW
// ================================================================
//
// Purpose:
//
// Dashboard par AI agent execution summary show karna.
//
// Responsibilities:
//
// 1. Running agents count.
// 2. Successful executions count.
// 3. Failed executions count.
//
// Data Source:
//
// Dashboard Aggregation API.
//
// Note:
//
// Ye dashboard summary hai.
// Main realtime agent timeline nahi.
//
// ================================================================

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

// ================================================================
// TYPES
// ================================================================

interface AgentOverviewProps {
  agentStatus: {
    // Currently running agents

    runningAgents: number;

    // Successful executions

    successfulExecutions: number;

    // Failed executions

    failedExecutions: number;
  };
}

// ================================================================
// COMPONENT
// ================================================================

export default function AgentOverview({ agentStatus }: AgentOverviewProps) {
  const agents = [
    {
      title: 'Running Agents',

      value: agentStatus.runningAgents,

      status: 'Running',
    },

    {
      title: 'Successful Executions',

      value: agentStatus.successfulExecutions,

      status: 'Success',
    },

    {
      title: 'Failed Executions',

      value: agentStatus.failedExecutions,

      status: 'Failed',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {agents.map((agent) => (
            <div key={agent.title} className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">{agent.title}</p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-bold">{agent.value}</p>

                <Badge variant="outline">{agent.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
