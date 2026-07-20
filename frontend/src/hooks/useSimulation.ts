// ================================================================
// SIMULATION HOOK
// ================================================================
//
// Purpose:
// Incident simulation server action manage karna.
//
// Responsibilities:
//
// 1. Simulation API call trigger karna.
// 2. Loading state manage karna.
// 3. Error handling.
// 4. Response cache/manage karna.
//
// Flow:
//
// Component
//      ↓
// useSimulation()
//      ↓
// React Query Mutation
//      ↓
// simulation.service
//      ↓
// Backend API
//
// ================================================================

import { useMutation } from '@tanstack/react-query';

import { runSimulation } from '@/services/simulation.service';

import type { SimulationScenario } from '@/types/simulation.types';

// ================================================================
// useSimulation Hook
// ================================================================
//
// Component is hook ke through:
//
// - simulate()
// - loading state
// - error state
// - response data
//
// access karega.
//
// ================================================================

export function useSimulation() {
  const mutation = useMutation({
    // ============================================================
    // API CALL
    // ============================================================
    //
    // mutate("db-failure")
    //
    // yaha ayega
    //
    // ============================================================

    mutationFn: (scenario: SimulationScenario) => runSimulation(scenario),
  });

  return {
    // trigger function
    simulate: mutation.mutate,

    // response data
    data: mutation.data,

    // loading
    isLoading: mutation.isPending,

    // error
    error: mutation.error,

    // reset
    reset: mutation.reset,
  };
}
