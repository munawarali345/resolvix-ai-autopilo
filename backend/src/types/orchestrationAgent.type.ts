// ================================================================
// ORCHESTRATOR AGENT TYPES
// ================================================================
//
// Purpose:
// Ye file Orchestrator Agent ke input aur output types define karti hai.
// ================================================================

import { Incident } from './index.js';
import { Log } from './index.js';
import { DetectionServiceOutput } from './index.js';
import { NextWorkflowStep, WorkflowStep } from './index.js';

// Orchestrator Agent input.
export interface OrchestratorAgentInput {
  // Detection ke baad create hua incident.
  incident: Incident;

  // Incident ke related logs.
  logs: Log[];

  // Detection service ka output.
  detectionResult: DetectionServiceOutput;

  // Current workflow step.
  currentStep: WorkflowStep;
}

// Orchestrator Agent output.
export interface OrchestratorAgentOutput {
  // Next workflow step.
  nextStep: NextWorkflowStep;

  // Workflow continue hoga ya nahi.
  continueWorkflow: boolean;

  // AI explanation.
  reasoning: string;
}
