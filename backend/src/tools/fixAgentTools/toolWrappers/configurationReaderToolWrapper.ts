// ================================================================
// CONFIGURATION READER LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the Configuration Reader service as a LangChain Tool.
//
// Business logic lives in:
//
// configurationReader.function.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { configurationReader } from '../toolExecutors/configurationReader.function.js';

import { LOG_SERVICES } from '../../../types/index.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

// This tool only needs affected services.
// Incident/root cause context is not required for configuration lookup.

const ConfigurationReaderToolSchema = z.object({
  affectedServices: z.array(z.enum(LOG_SERVICES)),
});

// ================================================================
// TOOL METADATA
// ================================================================

// Tool metadata used by the LLM.

const metadata = {
  // Tool name.

  name: 'configuration_reader',

  // Tool description.

  description: `

Read current production configuration for affected services.

Use this tool whenever:

- current service configuration is needed
- resource limits, replicas, image, version, timeout, or connection pool may affect the fix
- remediation requires checking whether scaling, restart, rollback, or config tuning is appropriate

Returns:

- service
- version
- environment
- image
- replicas
- CPU and memory limits
- connection pool when applicable
- request timeout when applicable
- autoscaling status
- configuration version

Do NOT use this tool for:

- playbook search
- runbook search
- configuration change history
- service ownership or criticality lookup

`,

  // Input schema.

  schema: ConfigurationReaderToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

// Expose the business logic as a LangChain Tool.

export const configurationReaderTool = tool(
  // Execute tool.

  async (input) => {
    return configurationReader(input);
  },

  // Tool metadata.

  metadata,
);
