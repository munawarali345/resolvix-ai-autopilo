'use client';

// ================================================================
// INCIDENT ACTIONS
// ================================================================
//
// Purpose:
//
// Human approval / rejection actions.
//
// Responsibilities:
//
// 1. Approve incident.
// 2. Reject incident.
// 3. Show loading state.
// 4. Show API errors.
//
// NOTE:
//
// Uses React Query mutation hooks.
//
// Used By:
//
// IncidentDetailView
//
// ================================================================

import { Alert, AlertDescription } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useApproveIncident } from '@/hooks/useApproveIncident';

import { useRejectIncident } from '@/hooks/useRejectIncident';

import AdminGuard from "@/components/guards/AdminGuard"


// ================================================================
// TYPES
// ================================================================

interface IncidentActionsProps {
  incidentId: string;
}

// ================================================================
// COMPONENT
// ================================================================

export default function IncidentActions({ incidentId }: IncidentActionsProps) {
  const {
    approve,

    isLoading: approving,

    error: approveError,
  } = useApproveIncident();

  const {
    reject,

    isLoading: rejecting,

    error: rejectError,
  } = useRejectIncident();

  return (

    <AdminGuard>
    <Card>
      <CardHeader>
        <CardTitle>Incident Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {(approveError || rejectError) && (
          <Alert variant="destructive">
            <AlertDescription>
              {(approveError ?? rejectError)?.message}
            </AlertDescription>
          </Alert>
        )}



        <div className="flex gap-3">
          <Button
            variant="destructive"
            disabled={approving || rejecting}
            onClick={() => reject(incidentId)}
          >
            {rejecting ? 'Rejecting...' : 'Reject Incident'}
          </Button>

          <Button
            disabled={approving || rejecting}
            onClick={() => approve(incidentId)}
          >
            {approving ? 'Approving...' : 'Approve Incident'}
          </Button>
        </div>

        

      </CardContent>
    </Card>

    </AdminGuard>
  );
}
