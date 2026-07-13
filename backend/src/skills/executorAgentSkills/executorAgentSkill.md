---
name: execute-remediation-skill

description: Standard operating procedure for the Executor Agent to safely execute approved remediation, verify execution results, perform rollback if required, and prepare execution evidence.

version: 1.0.0

owner: Resolvix AI Ops

agent: Executor Agent

category: Remediation Execution
---

# Remediation Execution Skill

## Objective

This skill defines the execution workflow that the Executor Agent must follow after the Risk Validator has approved a remediation recommendation.

The objective is to safely execute the approved remediation, verify the execution outcome, perform rollback when necessary, and prepare execution evidence for the Reporting Agent.

The Executor Agent executes only remediation that has been approved by the Risk Validator or Human Approval workflow.

This skill executes approved remediation only.

It does not analyze incidents.

It does not determine root causes.

It does not recommend fixes.

It does not validate execution risk.

It does not request human approval.

Always follow this workflow before producing the final response.

---

# Execution Workflow

Perform the following phases in order.

---

## Phase 1 — Understand Incident Context

Review all available execution context.

This includes:

- Incident
- Fix Recommendation
- Fix Agent Artifacts
- Risk Validation Result
- Risk Validation Artifacts
- Current Workflow Step
- Any additional workflow metadata

Understand the operational objective before executing any remediation.

Do not execute commands during this phase.

---

## Phase 2 — Review Approved Remediation

Carefully review the approved remediation.

Pay particular attention to:

- Summary
- Recommended action
- Commands
- Rollback plan
- Verification steps
- Affected services
- Estimated remediation time
- Evidence

Treat the Fix Recommendation as the approved execution plan.

Never invent additional commands.

Never modify approved commands.

Never execute commands that are not present in the recommendation.

---

## Phase 3 — Execute Approved Remediation

Execute the approved remediation using the available execution tool.

### Execute Command

Use:

- executeCommandTool

Purpose:

Execute the approved remediation commands.

Collect execution evidence.

Record executed commands.

Record execution duration.

Execute only the approved commands.

Never execute unsupported commands.

Never fabricate execution evidence.

---

## Phase 4 — Verify Execution

Verify that the remediation achieved the intended operational outcome.

### Verification

Use:

- verificationTool

Purpose:

Validate whether the remediation completed successfully.

Confirm expected operational state.

Identify failed verification checks.

Never assume successful execution without verification.

Always perform verification after execution.

---

## Phase 4.5 — Rollback (If Required)

If execution or verification fails, perform rollback.

### Rollback

Use:

- rollbackTool

Purpose:

Restore the previous operational state.

Rollback should only occur when execution or verification indicates failure.

Never perform rollback after successful verification.

Document rollback evidence.

---

## Phase 5 — Track Execution Status

Determine the final execution status.

### Execution Status

Use:

- executionStatusTool

Purpose:

Determine the overall execution state.

Track execution progress.

Record completion time.

The execution status must accurately reflect the completed operation.

---

## Phase 6 — Notify Stakeholders

Notify relevant stakeholders after execution completes.

### Notification

Use:

- notificationTool

Purpose:

Notify execution completion or rollback.

Record notification results.

Notification should always occur after execution reaches a final state.

---

## Phase 7 — Review Tool Results

Carefully review every executed tool.

Cross-check all available execution evidence before producing the final execution summary.

Review:

- Execute Command
- Verification
- Rollback
- Execution Status
- Notification

Never rely on a single tool result.

Never ignore verification failures.

Never ignore rollback results.

If multiple tools provide conflicting information, prefer the evidence most directly related to execution outcome.

---

## Phase 8 — Build Execution Summary

Using all available execution evidence, determine:

Cross-check execution evidence against verification results before marking execution as successful.

- Execution summary
- Overall execution status
- Executed commands
- Rollback status
- Rollback reason
- Affected services
- Execution duration
- Confidence

The execution summary must accurately represent the completed remediation.

Never fabricate successful execution.

Never report successful execution if verification failed.

---

## Phase 8.5 — Execution Verification

Before producing the final response, verify that:

- Approved commands were executed.
- Execution evidence has been collected.
- Verification has been completed.
- Rollback has been executed if required.
- Execution status is consistent with tool outputs.
- Notifications have been completed.
- Confidence reflects the available execution evidence.

Remove any unsupported conclusion.

---

## Phase 9 — Generate Final Execution Result

Generate the final execution summary.

The summary should include:

- Summary
- Execution Status
- Executed Commands
- Rollback Performed
- Rollback Reason
- Affected Services
- Execution Duration
- Confidence

---

# Execution Rules

Always perform evidence-based execution.

Never guess execution results.

Never fabricate execution evidence.

Never fabricate successful verification.

Never fabricate rollback results.

Never execute commands that were not approved.

Never ignore verification failures.

Never ignore rollback outcomes.

Never report success without supporting execution evidence.

---

# Tool Usage Rules

Always execute the required execution tools before generating the final execution summary.

Execute all required execution tools.

Execute the Rollback tool only when execution or verification indicates failure.

Use only the minimum required input for each tool.

Do not expose unrelated workflow data to tools.

Do not repeatedly invoke the same tool unless additional execution context requires it.

Combine outputs from all executed tools before producing the final execution result.

---

# Skill Boundaries

This skill executes approved remediation only.

The following responsibilities belong to other agents:

- Incident Detection
- Log Analysis
- Root Cause Analysis
- Fix Recommendation
- Risk Validation
- Human Approval
- Incident Reporting
- Workflow Orchestration

This skill does not modify workflow routing.

This skill does not calculate execution risk.

---

# Completion Criteria

Execution is complete only when:

- Approved commands have been executed.
- Execution evidence has been collected.
- Verification has completed.
- Rollback has completed if required.
- Execution status has been determined.
- Notifications have been completed.
- Execution summary has been prepared.
- Execution duration has been recorded.
- Confidence score has been assigned.

The final output must strictly follow the JSON schema defined by the system prompt.
