'use client';

// ================================================================
// INCIDENT DETAIL VIEW
// ================================================================
//
// Purpose:
//
// Main incident detail container.
//
// Responsibilities:
//
// 1. Fetch single incident data.
// 2. Handle loading/error states.
// 3. Combine detail components.
//
// Flow:
//
// page.tsx
//    ↓
// IncidentDetailView
//    ↓
// useIncidentById()
//    ↓
// React Query
//    ↓
// Incident Components
//
// ================================================================

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useIncidentById } from '@/hooks/useIncidentById';

import IncidentHeader from '@/components/incidents/IncidentHeader';

import IncidentInfo from '@/components/incidents/IncidentInfo';

import IncidentLogs from '@/components/incidents/IncidentLogs';

import IncidentActions from '@/components/incidents/IncidentActions';

import AgentExecutionTimeline from '@/components/agentStatusTimelime/AgentExecutionTimeline';

// ================================================================
// TYPES
// ================================================================

interface IncidentDetailViewProps {
  incidentId: string;
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentDetailView({
  incidentId,
}: IncidentDetailViewProps) {
  const {
    data,

    isLoading,

    error,
  } = useIncidentById(incidentId);

  // ------------------------------------------------
  // Loading
  // ------------------------------------------------

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Loading incident details...</p>
      </div>
    );
  }

  // ------------------------------------------------
  // Error
  // ------------------------------------------------

  if (error || !data) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />

          <AlertTitle>Incident Error</AlertTitle>

          <AlertDescription>Failed to load incident details.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const {
    incident,

    logs,
  } = data;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}

      <IncidentHeader incident={incident} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-6 lg:col-span-2">
          <IncidentInfo incident={incident} />

          <IncidentLogs logs={logs} />

          <IncidentActions incidentId={incident.id} />
        </div>

        {/* RIGHT */}

        <div>
          <AgentExecutionTimeline incidentId={incidentId} />
        </div>
      </div>
    </div>
  );
}
