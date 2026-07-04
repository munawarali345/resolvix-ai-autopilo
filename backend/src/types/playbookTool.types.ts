
// ================================================================
// PLAYBOOK TYPE
// ================================================================
//
// Purpose:
// Defines the structure of an operational remediation playbook.
//
// Playbooks are stored in the internal Knowledge Base.
//
// The Fix Agent searches these playbooks to recommend
// the most relevant remediation strategy.
//
// Future:
// This interface can be reused by the MongoDB schema
// without changing the Fix Agent logic.
// ================================================================

import { IncidentSeverity, logService } from "./index.js";

// ================================================================
// PLAYBOOK
// ================================================================

export interface Playbook {

  // Unique playbook identifier.
  id: string;

  // Human readable playbook title.
  title: string;

  // Playbook category.
  category: string;

  // Keywords used for relevance matching.
  rootCauseKeywords: string[];

  // Services for which this playbook applies.
  affectedServices: logService[];

  // Supported incident severities.
  severity: IncidentSeverity[];

// Short remediation overview.
   summary: string;

}