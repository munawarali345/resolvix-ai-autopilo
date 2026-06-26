// ================================================================
// DETECTION AGENT TYPES (PRODUCTION GRADE)
// ================================================================
// Purpose:
// Ye file sirf Detection Agent ke input/output structure define karti hai
// Qwen AI isi structure ko strictly follow karega
// ================================================================

import { Log } from '../types/index.js';

// ================================================================
// 1. INPUT TYPE (Logs + pre-analyzed metrics)
// ================================================================
// Ye data Log Analyzer se aata hai + raw logs bhi hote hain
// AI ko yahi input milega
// ================================================================
export type DetectionAgentInput = {
  logs: Log[];

  // Pre-calculated metrics (logAnalyzer se aata hai)
  metrics: {
    totalLogs: number; // total logs count
    errorLogs: number; // ERROR logs count
    warningLogs: number; // WARN logs count
    errorRate: number; // percentage
    warningRate: number; // percentage
    affectedServices: string[]; // affected systems
    topError: string; // first / main error
  };
};

// ================================================================
// 2. INCIDENT STRUCTURE (AI GENERATED DRAFT)
// ================================================================
// Ye actual DB incident nahi hai
// Sirf AI ka prediction / draft hai
// ================================================================
export type DetectionAgentIncident = {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';

  status: 'open'; // always open at detection stage

  detectedAt: string; // ISO string (IMPORTANT: Date NOT Date object)

  // System will fill later (not AI)
  rootCause: null;
  fixApplied: null;
  resolvedAt: null;
  mttr: null;
};

// ================================================================
// 3. FINAL OUTPUT TYPE (QWEN RESPONSE)
// ================================================================
// Ye EXACT JSON hai jo AI return karega
// ================================================================
export type DetectionAgentOutput = {
  // Main decision: incident hai ya nahi
  isIncident: boolean;

  // AI confidence score (0 - 1)
  confidence: number;

  // Reasoning signals (proof / evidence)
  signals: string[];

  // Incident object (sirf tab jab incident detect ho)
  incident: DetectionAgentIncident | null;
};
