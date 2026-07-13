// ================================================================
// REPORT FORMATTER FUNCTION
// ================================================================
//
// Purpose:
// Generates different report formats from incident data.
//
// This function converts structured incident report data into:
// - Markdown format
// - HTML format
// - JSON format
//
// This is deterministic business logic.
// No AI reasoning is performed here.
//
// ================================================================

import {
  ReportFormatterOutput,
  ReportTimeline,
  ReportMetrics,
  Incident,
} from '../../../types/index.js';

// ================================================================
// INPUT TYPE
// ================================================================

export interface ReportFormatterInput {
  incident: Incident;

  summary: string;

  timeline: ReportTimeline[];

  metrics: ReportMetrics;
}

// ================================================================
// FORMAT REPORT
// ================================================================
//
// Input:
// Structured incident report data.
//
// Output:
// Multiple report formats.
//
// ================================================================

export function formatReport(
  input: ReportFormatterInput,
): ReportFormatterOutput {
  const { incident, summary, timeline, metrics } = input;

  // ================================================================
  // MARKDOWN REPORT
  // ================================================================

  const markdown = `

# Incident Report

## Incident Details

**Title:** ${incident.title}

**Severity:** ${incident.severity}

**Status:** ${incident.status}

**Detected At:** ${incident.detectedAt}


---

## Summary

${summary}


---

## Timeline


${timeline
  .map(
    (item) =>
      `- **${item.timestamp.toISOString()}**
  - Event: ${item.event}
  - Agent: ${item.agent}`,
  )
  .join('\n')}



---

## Metrics


- Detection Time: ${metrics.detectionTime} ms

- Diagnosis Time: ${metrics.diagnosisTime} ms

- Execution Time: ${metrics.executionTime} ms

- Total Time: ${metrics.totalTime} ms

- MTTR: ${metrics.mttr ?? 'N/A'}

`;

  // ================================================================
  // HTML REPORT
  // ================================================================

  const html = `

<html>

<head>

<title>
${incident.title}
</title>

</head>


<body>


<h1>
Incident Report
</h1>


<h2>
${incident.title}
</h2>


<p>
<strong>Severity:</strong>
${incident.severity}
</p>


<p>
<strong>Status:</strong>
${incident.status}
</p>


<h2>
Summary
</h2>


<p>
${summary}
</p>



<h2>
Timeline
</h2>


<ul>

${timeline
  .map(
    (item) =>
      `
<li>

<strong>
${item.timestamp.toISOString()}
</strong>

<br/>

${item.event}

<br/>

Agent:
${item.agent}

</li>
`,
  )
  .join('')}

</ul>



<h2>
Metrics
</h2>


<ul>

<li>
Detection Time:
${metrics.detectionTime} ms
</li>


<li>
Diagnosis Time:
${metrics.diagnosisTime} ms
</li>


<li>
Execution Time:
${metrics.executionTime} ms
</li>


<li>
Total Time:
${metrics.totalTime} ms
</li>


<li>
MTTR:
${metrics.mttr ?? 'N/A'}
</li>


</ul>


</body>

</html>

`;

  // ================================================================
  // JSON REPORT
  // ================================================================

  const json = {
    incident: {
      title: incident.title,

      severity: incident.severity,

      status: incident.status,

      detectedAt: incident.detectedAt,
    },

    summary,

    timeline,

    metrics,
  };

  // ================================================================
  // RETURN
  // ================================================================

  return {
    markdown,

    html,

    json,
  };
}
