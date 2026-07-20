// ================================================================
// INCIDENTS PAGE
// ================================================================
//
// Purpose:
//
// Incident module route entry.
//
// Flow:
//
// URL
//   ↓
// page.tsx
//   ↓
// IncidentListView
//   ↓
// React Query
//   ↓
// Incident Service
//   ↓
// Backend API
//
// ================================================================

import IncidentListView from '@/features/incidents/IncidentListView';

// ================================================================
// PAGE COMPONENT
// ================================================================

export default function IncidentsPage() {
  return <IncidentListView />;
}
