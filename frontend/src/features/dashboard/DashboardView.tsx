'use client';

// ================================================================
// DASHBOARD VIEW
// ================================================================
//
// Purpose:
//
// Main dashboard UI container.
//
// Responsibilities:
//
// 1. Connect dashboard data hooks.
// 2. Handle loading/error states.
// 3. Combine dashboard sections.
//
// Flow:
//
// page.tsx
//    ↓
// DashboardView
//    ↓
// React Query + Zustand
//    ↓
// Dashboard Components
//
// ================================================================

import { AlertCircle } from 'lucide-react';

import { useDashboard } from '@/hooks/useDashboard';

import StatsCards from '@/components/dashboard/StatsCards';
import HealthMetricsCard from '@/components/dashboard/HealthMetrics';
import MttrCard from '@/components/dashboard/MTTRMetrics';
import AgentStatusOverview from '@/components/dashboard/AgentStatusOverview';
import DashboardCharts from '@/components/dashboard/DashboardCharts';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// ================================================================
// COMPONENT
// ================================================================

export default function DashboardView() {
  const {
    incidentOverview,

    healthMetrics,

    mttrMetrics,

    agentStatus,

    charts,

    isLoading,

    error,
  } = useDashboard();

  // ------------------------------------------------
  // Loading State
  // ------------------------------------------------

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  // ------------------------------------------------
  // Error State
  // ------------------------------------------------

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />

          <AlertTitle>Dashboard Error</AlertTitle>

          <AlertDescription>Failed to load dashboard data.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* ------------------------------------------------ */}
      {/* Page Header */}
      {/* ------------------------------------------------ */}

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Monitor your AI operations in real time.
        </p>
      </div>

      {/* ------------------------------------------------ */}
      {/* Incident Overview */}
      {/* ------------------------------------------------ */}

      {incidentOverview && <StatsCards incidentOverview={incidentOverview} />}

      {/* ------------------------------------------------ */}
      {/* Health + MTTR + Agent Status */}
      {/* ------------------------------------------------ */}

      <div className="grid gap-6 lg:grid-cols-3">
        {healthMetrics && <HealthMetricsCard healthMetrics={healthMetrics} />}

        {mttrMetrics && <MttrCard mttrMetrics={mttrMetrics} />}

        {agentStatus && <AgentStatusOverview agentStatus={agentStatus} />}
      </div>

      {/* ------------------------------------------------ */}
      {/* Charts */}
      {/* ------------------------------------------------ */}

      {charts && <DashboardCharts charts={charts} />}
    </div>
  );
}
