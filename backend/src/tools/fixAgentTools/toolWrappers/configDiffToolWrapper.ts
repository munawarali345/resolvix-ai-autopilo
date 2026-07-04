
// ================================================================
// CONFIGURATION DIFF LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Configuration Diff service
// as a LangChain Tool.
//
// Business logic lives in:
//
// configurationDiff.function.ts
//
// ================================================================

import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { configurationDiff } from "../toolExecutors/configDiff.function.js";

import { LOG_SERVICES } from "../../../types/index.js";

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

// Validate tool input.

const ConfigurationDiffToolSchema = z.object({

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

  name: "configuration_diff",

  // Tool description.

  description: `

Retrieve historical configuration changes for the affected services.

Use this tool whenever:

- recent configuration changes need to be reviewed
- configuration history may explain an incident
- previous and current configuration values are required

Returns:

- configuration changes
- changed fields
- previous values
- current values
- change reason
- configuration versions
- change timestamp

Do NOT use this tool for:

- current configuration lookup
- playbook search
- runbook search
- service inventory

`,

  // Input schema.

  schema: ConfigurationDiffToolSchema,

};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

// Expose the business logic as a LangChain Tool.

export const configurationDiffTool = tool(

  // Execute tool.

  async (input) => {

    return configurationDiff(input);

  },

  // Tool metadata.

  metadata,

);