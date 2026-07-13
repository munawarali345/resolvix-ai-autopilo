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

// ================================================================
// SEND NOTIFICATION
// ================================================================

export async function notificationProvider(
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
