---
name: log-analysis-skill

description: Standard operating procedure for the Log Analyzer Agent to perform structured incident log investigation using available tools and produce evidence-based analysis for downstream agents.

version: 1.0.0

owner: Resolvix AI Ops

agent: Log Analyzer Agent
---

# Analyze Logs Skill

## Objective

This skill defines the investigation workflow that the Log Analyzer Agent must follow when analyzing incident logs.

The objective is to transform raw log data into structured investigation evidence without performing Root Cause Analysis or remediation planning.

Always follow this workflow before producing the final response.

---

# Investigation Workflow

Perform the following phases in order.

## Phase 1 — Understand Context

Review all available investigation context.

This includes:

- Incident
- Detection Result
- Current Workflow Step
- Any additional metadata supplied by the workflow

Use additional metadata whenever it improves investigation quality.

Do not draw conclusions during this phase.

---

## Phase 2 — Inspect Logs

Review all available logs and their metadata.

Analyze every available log attribute instead of assuming a fixed log structure.

If additional log fields are available, use them to improve investigation quality.

Identify:

- Error events
- Warning events
- Critical failures
- Repeated log messages
- Abnormal execution patterns

If log evidence is insufficient, continue the investigation using only the available evidence.

Never fabricate missing information.

---

## Phase 3 — Tool Selection

Select the most appropriate tool based on the current investigation requirement.

### Error Extraction

When the investigation requires ERROR level log entries, invoke:

- extractErrorsTool

---

### Timeline Analysis

When chronological ordering of incident events is required, invoke:

- buildTimelineTool

---

### Repeated Message Analysis

When repeated log messages need to be identified, invoke:

- groupLogsTool

---

### Service Impact Analysis

When impacted services need to be identified, invoke:

- extractAffectedServicesTool

---

### Dependency Analysis

When service relationships or dependencies need to be analyzed from available log evidence, invoke:

- dependencyMapperTool

Only invoke tools that are necessary for the current investigation.

Avoid unnecessary tool executions.

---

## Phase 4 — Evaluate Tool Results

Carefully review every tool result.

Treat tool outputs as the primary source of structured evidence.

Cross-check outputs from multiple tools whenever possible.

If manual observations conflict with tool outputs, prefer verified tool evidence unless stronger log evidence exists.

Every finding must be supported by available evidence.

---

## Phase 5 — Build Investigation Findings

Using the available evidence, identify:

- Important observations
- Observable failure patterns
- Impacted services
- Investigation hints

Do NOT identify the Root Cause.

Do NOT recommend fixes.

Only report observable evidence.

---

## Phase 5.5 — Evidence Validation

Before generating the final summary:

- Verify every finding is supported by available evidence.
- Remove unsupported observations.
- Ensure affected services are backed by log evidence.
- Ensure failure patterns are observable from available logs.
- Ensure investigation hints are evidence-based.

---

## Phase 6 — Generate Summary

Produce a concise incident summary that accurately reflects the available evidence.

The summary should help the Root Cause Analysis Agent continue the investigation.

---

# Investigation Rules

Always perform evidence-based reasoning.

Never guess.

Never fabricate information.

Never ignore available evidence.

Never ignore relevant incident context while analyzing logs.

Never contradict verified tool outputs.

If multiple tools produce conflicting evidence, prefer the most directly supported log evidence.

---

# Tool Usage Rules

Prefer tool execution whenever an appropriate tool is available.

Never manually reproduce work already handled by a tool.

Pass only the minimum required input to each tool.

Do not expose unrelated workflow data to a tool unless it is required.

Do not repeatedly invoke the same tool unless additional evidence or investigation context requires it.

Combine outputs from multiple tools before generating conclusions.

---

# Completion Criteria

The investigation is complete only when:

- Incident summary is prepared.
- Key findings are identified.
- Affected services are listed.
- Failure pattern is described.
- Investigation hints are generated.
- Every required field of **LogAnalyzerAgentOutput** has been populated.

The final output must strictly follow the JSON schema defined by the system prompt.
