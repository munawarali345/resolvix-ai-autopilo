// ================================================================
// DETECTION SERVICE TYPES
// ================================================================
// Purpose:
// Ye file Detection Service ka final return type define karti hai.
//
// Detection Agent AI ka output deta hai.
// Detection Service us output ko process karti hai,
// Incident create karti hai,
// AgentExecution save karti hai,
// aur finally controller ko response return karti hai.
// ================================================================

import { Incident } from './incident.type.js';

// ================================================================
// Detection Service Output
// ================================================================
// Ye final object Detection Service return karegi.
// ================================================================
export type DetectionServiceOutput = {
  // ------------------------------------------------
  // Kya incident detect hua?
  // ------------------------------------------------
  incidentDetected: boolean;

  // ------------------------------------------------
  // Agar incident create hua hai to DB wala Incident
  // warna null
  // ------------------------------------------------
  incident: Incident | null;

  // ------------------------------------------------
  // Detection Agent ka confidence score
  // (0 → 1)
  // ------------------------------------------------
  confidence: number;

  // ------------------------------------------------
  // AI ne kis evidence ki basis par decision liya
  // ------------------------------------------------
  signals: string[];
};
