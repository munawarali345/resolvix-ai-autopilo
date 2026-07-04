
// ================================================================
// SERVICE INVENTORY LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Service Inventory service
// as a LangChain Tool.
//
// Business logic lives in:
//
// serviceInventory.function.ts
//
// ================================================================

import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { serviceInventory } from "../toolExecutors/serviceInventory.function.js";

import { LOG_SERVICES } from "../../../types/index.js";

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

// Validate tool input.

const ServiceInventoryToolSchema = z.object({

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

  name: "service_inventory",

  // Tool description.

  description: `

Retrieve inventory information for the affected services.

Use this tool whenever:

- service ownership is required
- responsible team must be identified
- runtime or repository information is needed
- service metadata is required

Returns:

- service information
- owner
- team
- environment
- version
- runtime
- repository
- service criticality

Do NOT use this tool for:

- configuration history
- current configuration lookup
- playbook search
- runbook search

`,

  // Input schema.

  schema: ServiceInventoryToolSchema,

};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

// Expose the business logic as a LangChain Tool.

export const serviceInventoryTool = tool(

  // Execute tool.

  async (input) => {

    return serviceInventory(input);

  },

  // Tool metadata.

  metadata,

);