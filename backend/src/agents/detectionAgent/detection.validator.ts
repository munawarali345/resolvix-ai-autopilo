// ================================================================
// Detection Agent Output Validator
// ================================================================
// Purpose:
// Parser sirf JSON parse karta hai.
// Ye validator check karega ke AI ne sahi structure return kiya hai.
// Agar required fields missing hui ya invalid values hui to error throw hoga.
// ================================================================

import { DetectionAgentOutput } from '../../types/detectionAgent.type.js';

// ================================================================
// Allowed Incident Severity Values
// ================================================================
const allowedSeverity = ['critical', 'high', 'medium', 'low'] as const;



// ================================================================
// Validate Detection Agent Output
// ================================================================
export const validateDetectionOutput = (
  data: unknown,
): DetectionAgentOutput => {
  // ------------------------------------------------
  // Step 1
  // Check karo ke response object hai ya nahi
  // ------------------------------------------------
  if (!data || typeof data !== 'object') {
    throw new Error('Detection Agent: Response is not a valid object');
  }

  // Object ko DetectionAgentOutput ki tarah treat karenge
  const output = data as DetectionAgentOutput;

  // ------------------------------------------------
  // Step 2
  // isIncident boolean hona chahiye
  // ------------------------------------------------
  if (typeof output.isIncident !== 'boolean') {
    throw new Error('Detection Agent: Invalid isIncident');
  }

  // ------------------------------------------------
  // Step 3
  // confidence number hona chahiye
  // ------------------------------------------------
  if (typeof output.confidence !== 'number') {
    throw new Error('Detection Agent: Invalid confidence');
  }

  // ------------------------------------------------
  // Step 4
  // confidence 0 se 1 ke darmiyan honi chahiye
  // ------------------------------------------------
  if (output.confidence < 0 || output.confidence > 1) {
    throw new Error('Detection Agent: Confidence must be between 0 and 1');
  }

  // ------------------------------------------------
  // Step 5
  // signals array honi chahiye
  // ------------------------------------------------
  if (!Array.isArray(output.signals)) {
    throw new Error('Detection Agent: Invalid signals');
  }

  // ------------------------------------------------
  // Step 6
  // Signals ke andar har value string honi chahiye
  // ------------------------------------------------
  for (const signal of output.signals) {
    if (typeof signal !== 'string') {
      throw new Error('Detection Agent: Invalid signal');
    }
  }

  // ------------------------------------------------
  // Step 7
  // Agar incident detect hua hai to incident object required hai
  // ------------------------------------------------
  if (output.isIncident && !output.incident) {
    throw new Error('Detection Agent: Incident object is required');
  }

  // ------------------------------------------------
  // Step 8
  // Agar incident detect nahi hua to incident null hona chahiye
  // ------------------------------------------------
  if (!output.isIncident && output.incident !== null) {
    throw new Error('Detection Agent: Incident must be null');
  }

  // ------------------------------------------------
  // Step 9
  // Incident object ki sari required fields validate karo
  // ------------------------------------------------
  if (output.incident) {
    // --------------------------
    // Title
    // --------------------------
    if (
      typeof output.incident.title !== 'string' ||
      output.incident.title.trim() === ''
    ) {
      throw new Error('Detection Agent: Invalid incident title');
    }

    // --------------------------
    // Description
    // --------------------------
    if (
      typeof output.incident.description !== 'string' ||
      output.incident.description.trim() === ''
    ) {
      throw new Error('Detection Agent: Invalid incident description');
    }

    // --------------------------
    // Severity
    // --------------------------
    if (!allowedSeverity.includes(output.incident.severity)) {
      throw new Error('Detection Agent: Invalid severity');
    }

    // --------------------------
    // Status
    // --------------------------
    if (output.incident.status !== 'open') {
      throw new Error('Detection Agent: Invalid incident status');
    }

   // --------------------------
   // detectedAt
   // Must be valid Date
   // --------------------------
   if (!(output.incident.detectedAt instanceof Date)) {
      throw new Error('Detection Agent: Invalid detectedAt');
   }

   if (Number.isNaN(output.incident.detectedAt.getTime())) {
      throw new Error('Detection Agent: Invalid detectedAt');

   }

  }
  
  // ------------------------------------------------
  // Step 10
  // Sab validation pass ho gayi
  // Safe object return karo
  // ------------------------------------------------
  return output

};
