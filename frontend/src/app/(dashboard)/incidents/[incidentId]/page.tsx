// ================================================================
// INCIDENT DETAIL PAGE
// ================================================================
//
// Purpose:
//
// Single incident route.
//
// URL:
//
// /incidents/:incidentId
//
// Flow:
//
// URL
//  ↓
// page.tsx
//  ↓
// IncidentDetailView
//  ↓
// Hooks
//  ↓
// Backend API
//
// ================================================================

import IncidentDetailView from '@/features/incidents/IncidentDetailView';

// ================================================================
// PAGE
// ================================================================

interface PageProps {
  params: {
    incidentId: string;
  };
}

export default async function IncidentDetailPage({ params }: PageProps) {
  const { incidentId } = await params;

  return <IncidentDetailView incidentId={incidentId} />;
}
