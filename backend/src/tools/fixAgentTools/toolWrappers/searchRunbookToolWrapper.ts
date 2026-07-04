// ================================================================
// SEARCH RUNBOOK LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Search Runbook service as a LangChain Tool.
//
// Business logic lives in:
//
// searchRunbook.function.ts
//
// ================================================================

import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { searchRunbook } from "../toolExecutors/searchRunbook.function.js";

import { LOG_SERVICES } from "../../../types/index.js";

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

// Validate tool input.

const SearchRunbookToolSchema = z.object({

  incident: z.object({

    title: z.string(),

    description: z.string(),

    severity: z.enum([

      "critical",

      "high",

      "medium",

      "low",

    ]),

    rootCause: z.string(),

  }),

  affectedServices: z.array(

    z.enum(LOG_SERVICES),

  ),

});

// ================================================================
// TOOL METADATA
// ================================================================

// Tool metadata used by the LLM.

const metadata = {

  // Tool name.

  name: "search_runbook",

  // Tool description.

  description: `

Search the internal operational runbook knowledge base.

Use this tool whenever:

- a root cause has been identified
- executable remediation steps are required
- matching operational runbooks are needed
- rollback, verification, or service recovery steps are needed

Returns:

- matching runbooks
- operational steps
- affected services
- severity
- automation level
- estimated remediation time
- relevance score

Do NOT use this tool for:

- high-level remediation playbooks
- configuration lookup
- service inventory
- configuration comparison

`,

  // Input schema.

  schema: SearchRunbookToolSchema,

};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

// Expose the business logic as a LangChain Tool.

export const searchRunbookTool = tool(

  // Execute tool.

  async (input) => {

    return searchRunbook(input);

  },

  // Tool metadata.

  metadata,

);
