// ================================================================
// NOTIFICATION LANGCHAIN TOOL
// ================================================================
//
// Purpose:
// Exposes the notification function as a LangChain Tool.
//
// Business logic lives in:
//
// sendNotification.function.ts
//
// ================================================================

import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { sendNotification } from '../toolExecutors/notification.function.js';

// ================================================================
// TOOL INPUT SCHEMA
// ================================================================

const NotificationToolSchema = z.object({
  executionStatus: z.enum(['completed', 'rolled_back', 'failed']),

  incidentId: z.string(),

  affectedServices: z.array(
    z.enum([
      'api-gateway',
      'database',
      'user-service',
      'order-service',
      'payment-service',
      'cache',
      'monitoring',
      'deployment',
      'authentication',
      'health-check',
      'logging',
      'analytics-engine',
      'system',
    ]),
  ),
});

// ================================================================
// TOOL METADATA
// ================================================================

const metadata = {
  name: 'notification_Tool',

  description: `

Send execution notification after the remediation workflow completes.

Use this tool as the final step of the Executor Agent.

Purpose:

- Notify affected service owners
- Deliver execution status
- Produce notification result

Rules:

- Never execute infrastructure.
- Never modify execution results.
- Send notifications only after execution status is determined.

Returns:

- notification status
- notification channel
- notification recipients
- failure reason

`,

  schema: NotificationToolSchema,
};

// ================================================================
// LANGCHAIN TOOL
// ================================================================

export const notificationTool = tool(

  async ({ executionStatus,affectedServices,incidentId}) => {

    return sendNotification(

      incidentId,

      executionStatus,

      affectedServices,

    );
  },

  metadata,
);
