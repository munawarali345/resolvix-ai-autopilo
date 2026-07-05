// maintenanceWindow.tool.ts

import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { checkMaintenanceWindow } from '../toolExecutors/maintenanceWindow.function.js';

// INPUT SCHEMA
const MaintenanceWindowSchema = z.object({
  incident: z.object({
    title: z.string(),

    severity: z.enum(['critical', 'high', 'medium', 'low']),
  }),

  environment: z.enum(['development', 'staging', 'production']),

  currentTime: z.string(), // ISO string
});

// TOOL
export const maintenanceWindowTool = tool(
  async (input) => {
    return checkMaintenanceWindow(input);
  },

  {
    name: 'maintenance_window_policy',

    description: `

     Checks whether deployment/remediation is allowed in current time window.

    Rules:
    - Production may require maintenance window
    - Emergency execution may override depending on config
    - Returns whether execution is allowed
    `,

    schema: MaintenanceWindowSchema,
  },
);
