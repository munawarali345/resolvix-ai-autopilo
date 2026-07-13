// ================================================================
// LANGGRAPH WORKFLOW GRAPH
// ================================================================
// Purpose:
// Ye file pura workflow define karti hai (nodes + edges + flow)
// ================================================================

import { StateGraph, START, END } from '@langchain/langgraph';
import { WorkflowGraphState } from '../state/workflow.state.js';

// Nodes import
import { orchestratorNode } from '../nodes/orchestrator.node.js';
import { logAnalysisNode } from '../nodes/logAnalysis.node.js';
import { rootCauseNode } from '../nodes/rootCause.node.js';
import { fixNode } from '../nodes/fix.node.js';
import { riskValidationNode } from '../nodes/riskValidator.node.js';
import { executionNode } from '../nodes/executor.node.js';
import { reportingNode } from '../nodes/reporter.node.js';

import { approvalRouterNode } from '../nodes/approvalRouter.node.js';
import { createMongoCheckpointer } from '../checkPointer/mongo.CheckPointer.js';

// ================================================================
// GRAPH BUILD
// ================================================================
const graph = new StateGraph(WorkflowGraphState)

  // ---------------- Nodes Register ----------------
  .addNode('orchestratorNode', orchestratorNode)
  .addNode('logAnalysisNode', logAnalysisNode)
  .addNode('rootCauseNode', rootCauseNode)
  .addNode('fixNode', fixNode)
  .addNode('riskValidationNode', riskValidationNode)
  .addNode('approvalRouterNode', approvalRouterNode)
  .addNode('executionNode', executionNode)
  .addNode('reportingNode', reportingNode)

  // ---------------- START FLOW ----------------
  .addEdge(START, 'orchestratorNode')

  // ---------------- SEQUENTIAL FLOW ----------------
  .addEdge('orchestratorNode', 'logAnalysisNode')
  .addEdge('logAnalysisNode', 'rootCauseNode')
  .addEdge('rootCauseNode', 'fixNode')
  .addEdge('fixNode', 'riskValidationNode')
  .addEdge('riskValidationNode', 'approvalRouterNode')
  .addEdge('approvalRouterNode', 'executionNode')
  .addEdge('executionNode', 'reportingNode')
  .addEdge('reportingNode', END);

// ================================================================
// COMPILED WORKFLOW
// ================================================================

let appWorkflow: ReturnType<typeof graph.compile>;

// ================================================================
// INITIALIZE WORKFLOW
// ================================================================

export async function initializeWorkflow() {
  const checkpointer = await createMongoCheckpointer();

  // ------------------------------------------------
  // Prevent multiple graph compilations
  // ------------------------------------------------

  if (appWorkflow) {
    return;
  }

  appWorkflow = graph.compile({
    checkpointer,
  });
}

// ================================================================
// GET WORKFLOW
// ================================================================
//
// Returns the compiled workflow.
//
// Throws if workflow has not been initialized.
//
// ================================================================

export function getWorkflow() {
  if (!appWorkflow) {
    throw new Error(
      'Workflow has not been initialized. Call initializeWorkflow() during server startup.',
    );
  }

  return appWorkflow;
}
