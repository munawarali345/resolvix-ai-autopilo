// ================================================================
// SIMULATION SERVICE
// ================================================================
//
// Purpose:
// Frontend incident simulation API communication.
//
// Responsibilities:
// 1. Incident scenarios trigger karna.
// 2. Backend simulator endpoints call karna.
// 3. Simulation response return karna.
//
// NOTE:
// Ye file sirf backend communication handle karti hai.
// UI, Zustand, React Query ko nahi janti.
//
// Flow:
//
// Simulation Hook
//        ↓
// Simulation Service
//        ↓
// apiClient
//        ↓
// Backend Simulator API
//
// ================================================================

import { apiClient } from '@/lib/api/apiClient';

import type {
  SimulationResponse,
  SimulationScenario,
} from '@/types/simulation.types';

import type { ApiResponse } from '@/types/api.types';

// ================================================================
// RUN SIMULATION
// ================================================================
//
// Endpoint:
//
// POST /api/simulate/{scenario}
//
// Example:
//
// /simulate/db-failure
// /simulate/memory-leak
// /simulate/api-500-error
// /simulate/deployment-failure
// /simulate/cpu-spike
//
// ================================================================

export const runSimulation = async (scenario: SimulationScenario) => {
  return apiClient<ApiResponse<SimulationResponse>>(
    `/simulate/${scenario}`,

    {
      method: 'POST',
    },
  );
};
