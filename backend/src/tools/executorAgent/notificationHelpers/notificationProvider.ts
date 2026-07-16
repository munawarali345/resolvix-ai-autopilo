// ================================================================
// NOTIFICATION PROVIDER
// ================================================================
//
// Purpose:
// Simulates sending execution notifications.
//
// This provider NEVER sends real notifications.
//
// In production this provider will be replaced by:
//
// - Webhook
// - Slack
// - Microsoft Teams
// - Email
//
// ================================================================

import {
  NotificationChannel,
  NotificationOutput,
} from '../../../types/executorTools.type.js';

import { logService } from '../../../types/index.js';

import { createNotification } from '../../../services/notificationService/notification.service.js';

import { getSocketServer } from '../../../socket/socket.server.js';

// ================================================================
// SEND NOTIFICATION
// ================================================================

export async function notificationProvider(

  incidentId: string,

  executionStatus: string,

  affectedServices: logService[],
  
): Promise<NotificationOutput> {
  // --------------------------------------------------------------
  // Determine notification channel.
  // --------------------------------------------------------------

  let notificationChannel: NotificationChannel = 'none';

  if (
    executionStatus === 'completed' ||
    executionStatus === 'rolled_back' ||
    executionStatus === 'failed'
  ) {
    notificationChannel = 'webhook';
  }

  // --------------------------------------------------------------
  // Build notification recipients.
  //
  // Fake webhook endpoints are generated for each affected service.
  //
  // In production these will come from a notification
  // registry or service ownership database.
  // --------------------------------------------------------------

  const recipients = affectedServices.map((service) => `webhook://${service}`);

  // --------------------------------------------------------------
  // Simulate webhook delivery.
  // --------------------------------------------------------------

  const notificationSent =
    notificationChannel === 'webhook' && recipients.length > 0;

  // --------------------------------------------------------------
  // Build notification document.
  // --------------------------------------------------------------

  let severity: 'info' | 'success' | 'warning' | 'error';

  if (executionStatus === 'completed') {
    severity = 'success';
  } else if (executionStatus === 'rolled_back') {
    severity = 'warning';
  } else {
    severity = 'error';
  }

  const notificationDocument = {
    incidentId,

    title: `Execution ${executionStatus}`,

    message: `Execution finished with status: ${executionStatus}.`,

    severity,

    recipients,
  };

  // --------------------------------------------------------------
  // notification Service call
  // Save notification.
  // --------------------------------------------------------------
  const savedNotification = await createNotification(notificationDocument);

  // --------------------------------------------------------------
  // Get the globally initialized Socket.IO server instance.
  // --------------------------------------------------------------
  const io = getSocketServer();

  // --------------------------------------------------------------
  // Broadcast the notification to all connected dashboard clients.
  // --------------------------------------------------------------
  io.emit('notification:new', savedNotification);

  // --------------------------------------------------------------
  // Determine failure reason.
  // --------------------------------------------------------------

  let failureReason: string | null = null;

  if (!notificationSent) {
    failureReason = 'Unable to deliver notification.';
  }

  // --------------------------------------------------------------
  // Return notification result.
  // --------------------------------------------------------------

  return {
    notificationSent,

    notificationChannel,

    recipients,

    failureReason,
  };
}

export default notificationProvider;

// Executor Agent
//         │
//         ▼
// notificationTool
//         │
//         ▼
// notificationProvider()
//         │
//         ├── Build notification
//         ├── Save notification in MongoDB
//         ├── Emit notification via Socket.IO
//         └── Return NotificationOutput
//                 │
//                 ▼
// Executor Agent
