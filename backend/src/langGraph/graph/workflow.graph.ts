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

// ye hum graph type bana rah ehe jo LangGraph ka real inferred type use ho raha hai
type GraphState = typeof WorkflowGraphState.State;

// ================================================================
// ROUTING LOGIC
// ================================================================
const routeAfterOrchestrator = (state: GraphState) => {
  const decision = state.orchestratorDecision;

  if (!decision) {
    return 'logAnalysisNode';
  }

  if (decision.runParallel) {
    return ['logAnalysisNode', 'rootCauseNode'];
  }

  if (decision.nextStep === 'root-cause') {
    return 'rootCauseNode';
  }

  return 'logAnalysisNode';
};

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
  .addNode('executionNode', executionNode)
  .addNode('reportingNode', reportingNode)

  // ---------------- START FLOW ----------------
  .addEdge(START, 'orchestratorNode')

  // ---------------- PARALLEL ----------------
  // Orchestrator → logs + root cause (parallel)
  .addConditionalEdges('orchestratorNode', routeAfterOrchestrator)

  // ---------------- SEQUENTIAL FLOW ----------------
  .addEdge('logAnalysisNode', 'fixNode')
  .addEdge('rootCauseNode', 'fixNode')

  .addEdge('fixNode', 'riskValidationNode')
  .addEdge('riskValidationNode', 'executionNode')
  .addEdge('executionNode', 'reportingNode')
  .addEdge('reportingNode', END);

// ================================================================
// COMPILE WORKFLOW
// ================================================================
export const appWorkflow = graph.compile();
