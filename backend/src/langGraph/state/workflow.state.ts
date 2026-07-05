// ================================================================
// LANGGRAPH WORKFLOW STATE
// ================================================================
//
// Purpose:
// Ye file LangGraph ki shared state define karti hai.
//
// WorkflowState interface already project ka source of truth hai.
// Isliye har Annotation usi interface se type inherit karegi.
//
// Is state ko workflow ke tamam nodes share karenge.
// ================================================================

import { Annotation } from '@langchain/langgraph';

import { WorkflowState } from '../../types/index.js';

// ================================================================
// LANGGRAPH SHARED STATE
// ================================================================

export const WorkflowGraphState = Annotation.Root({
  // Logs received from Detection Service.
  logs: Annotation<WorkflowState['logs']>(),

  // Incident created by Detection Service.
  incident: Annotation<WorkflowState['incident']>(),

  // Current workflow execution step.
  currentStep: Annotation<WorkflowState['currentStep']>(),

  // Workflow error message.
  error: Annotation<WorkflowState['error']>(),

  // Detection Service output.
  detectionResult: Annotation<WorkflowState['detectionResult']>(),

  // Orchestrator Agent decision.
  orchestratorDecision: Annotation<WorkflowState['orchestratorDecision']>(),

  // Log Analyzer result.
  logAnalysisResult: Annotation<WorkflowState['logAnalysisResult']>(),

  // Log Analysis tool outputs.
  logAnalysisArtifacts: Annotation<WorkflowState['logAnalysisArtifacts']>(),

  // Root Cause Analysis result.
  rootCauseResult: Annotation<WorkflowState['rootCauseResult']>(),

  // fix Agent result.
  fixAgentResult: Annotation<WorkflowState['fixAgentResult']>(),

  // Log Analysis tool outputs.
  fixAgentArtifacts: Annotation<WorkflowState['fixAgentArtifacts']>(),

  // risk validator Agent result.
  riskValidatorResult: Annotation<WorkflowState['riskValidatorResult']>(),

  // Log Analysis tool outputs.
  riskValidatorArtifacts: Annotation<WorkflowState['riskValidatorArtifacts']>(),

  approval: Annotation<WorkflowState["approval"]>(),
  
});
