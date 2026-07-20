'use client';

// ================================================================
// AGENT EXECUTION STEP
// ================================================================
//
// Purpose:
//
// Single agent execution ko show karna.
//
// Responsibilities:
//
// 1. Agent name show karna.
// 2. Execution status show karna.
// 3. Execution time show karna.
// 4. Error show karna agar fail hua.
//
// Used By:
//
// AgentExecutionTimeline
//
// ================================================================

import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import type { AgentStatus } from '@/types/agentStatus.types';

// ================================================================
// PROPS
// ================================================================

interface AgentExecutionStepProps {
  agent: AgentStatus;
}

// ================================================================
// COMPONENT
// ================================================================

export default function AgentExecutionStep({ agent }: AgentExecutionStepProps) {
  const statusConfig = {
    running: {
      label: 'Running',

      icon: <Loader2 className="h-5 w-5 animate-spin text-blue-600" />,

      className: 'text-blue-600',
    },

    success: {
      label: 'Completed',

      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,

      className: 'text-green-600',
    },

    failed: {
      label: 'Failed',

      icon: <XCircle className="h-5 w-5 text-red-600" />,

      className: 'text-red-600',
    },
  };

  const config = statusConfig[agent.status];

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.icon}

            <div>
              <p className="font-semibold">{agent.agentName}</p>

              <p className={`text-sm ${config.className}`}>{config.label}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {agent.executionTime} ms
          </p>
        </div>

        {/* Time */}

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Started: {new Date(agent.startedAt).toLocaleString()}</p>

          {agent.completedAt && (
            <p>Completed: {new Date(agent.completedAt).toLocaleString()}</p>
          )}
        </div>

        {/* Error */}

        {agent.error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {agent.error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
