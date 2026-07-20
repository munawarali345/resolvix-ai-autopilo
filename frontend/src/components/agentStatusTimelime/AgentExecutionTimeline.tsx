'use client';

// ================================================================
// AGENT EXECUTION TIMELINE
// ================================================================
//
// Purpose:
//
// Incident ke agents ka realtime execution flow show karna.
//
// Responsibilities:
//
// 1. Initial agent status fetch karna.
// 2. Zustand se live updates lena.
// 3. Har agent ko AgentExecutionStep me render karna.
//
// Used By:
//
// IncidentDetailsView
//
// ================================================================

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useAgentStatus } from '@/hooks/useAgentStatus';

import { useAgentStatusStore } from '@/stores/agents.store';

import AgentExecutionStep from './AgentExecutionStep';

// ================================================================
// PROPS
// ================================================================

interface AgentExecutionTimelineProps {
  incidentId: string;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AgentExecutionTimeline({
  incidentId,
}: AgentExecutionTimelineProps) {
  // ------------------------------------------------
  // Initial API Data
  // ------------------------------------------------

  const {
    data,

    isLoading,

    error,
  } = useAgentStatus(incidentId);

  // ------------------------------------------------
  // Zustand
  // ------------------------------------------------

  const {
    agents,

    setAgents,
  } = useAgentStatusStore();

  // ------------------------------------------------
  // React Query data ko store me dalna
  // ------------------------------------------------

  useEffect(() => {
    if (data) {
      setAgents(data);
    }
  }, [data, setAgents]);

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">Loading agent execution...</CardContent>
      </Card>
    );
  }

  // ------------------------------------------------
  // Error
  // ------------------------------------------------

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-red-600">
          Failed to load agent status.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Agent Execution Timeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {agents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Waiting for agent execution...
          </p>
        ) : (
          agents.map((agent) => (
            <AgentExecutionStep key={agent.id} agent={agent} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
