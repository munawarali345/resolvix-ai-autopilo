// ================================================================
// SEARCH FIX PLAYBOOK LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Search Fix Playbook service as a LangChain Tool.
//
// Business logic lives in:
//
// searchFixPlaybook.function.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { searchFixPlaybook } from '../toolExecutors/searchFixPlaybook.function.js';

import { LOG_SERVICES } from '../../../types/index.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

// Validate tool input.

const SearchFixPlaybookToolSchema = z.object({
  incident: z.object({
    title: z.string(),

    description: z.string(),

    severity: z.enum(['critical', 'high', 'medium', 'low']),

    rootCause: z.string(),
  }),

  affectedServices: z.array(z.enum(LOG_SERVICES)),
});

// ================================================================
// TOOL METADATA
// ================================================================

// Tool metadata used by the LLM.

const metadata = {
  // Tool name.

  name: 'search_fix_playbook',

  // Tool description.

  description: `

Search the internal remediation playbook knowledge base.

Use this tool whenever:

- a root cause has been identified
- remediation guidance is required
- matching operational playbooks are needed

Returns:

- matching playbooks
- remediation summaries
- relevance score

Do NOT use this tool for:

- runbooks
- configuration lookup
- service inventory
- configuration comparison

`,

  // Input schema.

  schema: SearchFixPlaybookToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

// Expose the business logic as a LangChain Tool.

export const searchFixPlaybookTool = tool(
  // Execute tool.

  async (input) => {
    return searchFixPlaybook(input);
  },

  // Tool metadata.

  metadata,
);
