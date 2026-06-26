// ================================================================
// WORKFLOW CONSTANTS
// ================================================================
// LangGraph workflow me use hone wali fixed values
// ================================================================

export const WORKFLOW_CONSTANTS = {
  // Workflow node names
  NODES: {
    ORCHESTRATOR: 'orchestrator',

    LOG_ANALYSIS: 'log-analysis',

    ROOT_CAUSE: 'root-cause',

    FIX: 'fix',

    RISK_VALIDATION: 'risk-validation',

    EXECUTION: 'execution',

    REPORTING: 'reporting',
  },

  // Workflow execution steps
  STEPS: {
    ORCHESTRATOR: 'orchestrator',

    LOG_ANALYSIS: 'log-analysis',

    ROOT_CAUSE: 'root-cause',

    FIX: 'fix',

    RISK_VALIDATION: 'risk-validation',

    EXECUTION: 'execution',

    REPORTING: 'reporting',

    COMPLETED: 'completed',
  },

  // Agent names
  AGENTS: {
    ORCHESTRATOR: 'orchestrator-agent',

    LOG_ANALYSIS: 'log-analysis-agent',

    ROOT_CAUSE: 'root-cause-agent',

    FIX: 'fix-agent',

    RISK_VALIDATION: 'risk-validation-agent',

    EXECUTION: 'execution-agent',

    REPORTING: 'reporting-agent',
  },
} as const;
