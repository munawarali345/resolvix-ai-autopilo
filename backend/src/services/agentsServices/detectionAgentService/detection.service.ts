// ================================================================
// DETECTION SERVICE (CORE ENGINE)
// ================================================================
// Purpose:
//
// Ye service poora detection pipeline handle karti hai:
//
// 1. Logs receive karti hai (from simulator / monitoring)
// 2. Log Analyzer se metrics nikalti hai
// 3. Detection Agent (Qwen AI) ko call karti hai
// 4. AI response parse karti hai
// 5. Validate karti hai
// 6. Incident DB me create karti hai (agar needed ho)
// 7. AgentExecution log store karti hai
// 8. Final response controller ko return karti hai
// ================================================================

import { Log, WorkflowStep } from '../../../types/index.js';

import { analyzeLogs } from '../../../utils/logAnalyzer.js';

import { detectionAgent } from '../../../agents/detectionAgent/detection.agent.js';

import { IncidentModel } from '../../../models/incident.model.js';

import { LogModel } from '../../../models/log.model.js';

import { AgentExecutionModel } from '../../../models/agentExecution.model.js';

import { DetectionServiceOutput } from '../../../types/detectionService.type.js';

import { getWorkflow } from '../../../langGraph/graph/workflow.graph.js';

// ================================================================
// DETECTION SERVICE FUNCTION
// ================================================================
export const detectionService = async (
  logs: Log[],
): Promise<DetectionServiceOutput> => {
  // ------------------------------------------------
  // STEP 0: Execution start time (performance tracking)
  // ------------------------------------------------
  const startTime = Date.now();

  const workflow = getWorkflow();

  // ================================================================
  // STEP 1: LOG ANALYSIS (Metrics generate karna)
  // ================================================================
  const metrics = analyzeLogs(logs);

  // ================================================================
  // STEP 2: DETECTION AGENT CALL (Qwen AI)
  // ================================================================
  const aiResponse = await detectionAgent({ logs, metrics });

  // ================================================================
  // STEP 3: INCIDENT CREATE (ONLY IF DETECTED)
  // ================================================================
  let savedIncident = null;

  if (aiResponse.isIncident && aiResponse.incident) {
    // DB model ke hisaab se incident create
    savedIncident = await IncidentModel.create({
      title: aiResponse.incident.title,
      description: aiResponse.incident.description,
      severity: aiResponse.incident.severity,
      status: 'open',
      detectedAt: new Date(aiResponse.incident.detectedAt),

      // these will stay null initially
      rootCause: null,
      fixApplied: null,
      resolvedAt: null,
      mttr: null,
    });
  }

  // ================================================================
  // STEP 3.1: LINK LOGS WITH INCIDENT ID
  // ================================================================
  if (savedIncident) {
    // agar incident successfully create hua hai

    // ------------------------------------------------
    // STEP 1: logs se sirf unke _id nikaalna
    // ------------------------------------------------
    const logIds = logs.map((log) => log._id);

    // ------------------------------------------------
    // STEP 2: DB me logs update karna
    // ------------------------------------------------
    await LogModel.updateMany(
      {
        // filter: un logs ko target karo jin ke IDs match karte hain
        _id: { $in: logIds },
      },

      {
        // update operation
        $set: {
          // har log ke andar incidentId attach kar do
          incidentId: savedIncident._id,
        },
      },
    );
  }

  // ================================================================
  // STEP 4: AGENT EXECUTION LOG SAVE (audit trail)
  // ================================================================
  await AgentExecutionModel.create({
    incidentId: savedIncident?._id?.toString() || 'no-incident',

    agentName: 'detection',

    status: 'success',

    input: {
      logsCount: logs.length,
      metrics,
    },

    output: aiResponse,

    executionTime: Date.now() - startTime,

    startedAt: new Date(startTime),

    completedAt: new Date(),
  });

  // ================================================================
  // STEP 4.1: BUILD LANGGRAPH STATE + START WORKFLOW
  // ================================================================
  if (savedIncident) {
    // ------------------------------------------------
    // STEP 1: Build workflow state
    // ------------------------------------------------
    const workflowState = {
      logs, // raw logs from simulator

      incident: savedIncident, // DB incident

      detectionResult: {
        incidentDetected: aiResponse.isIncident,
        confidence: aiResponse.confidence,
        signals: aiResponse.signals,
        incident: savedIncident,
      },

      orchestratorDecision: null, // abhi orchestrator decide karega

      currentStep: 'orchestrator' as WorkflowStep, // workflow start point

      error: null,
    };

    // ------------------------------------------------
    // STEP 2: Start LangGraph workflow
    //
    // Each workflow is assigned a unique thread_id.
    //
    // The thread_id allows LangGraph to:
    //
    // • persist workflow state using the configured checkpointer
    // • resume execution after interrupt()
    // • support Human-in-the-Loop approvals
    // • recover long-running workflows
    //
    // ------------------------------------------------
    await workflow.invoke(
      workflowState,

      {
        configurable: {
          thread_id: savedIncident._id.toString(),
        },
      },
    );
  }

  // ================================================================
  // STEP 5: FINAL RESPONSE RETURN
  // ================================================================
  return {
    incidentDetected: aiResponse.isIncident,

    incident: savedIncident,

    confidence: aiResponse.confidence,

    signals: aiResponse.signals,
  };
};
