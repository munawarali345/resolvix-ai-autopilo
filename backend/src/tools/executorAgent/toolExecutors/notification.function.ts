// ================================================================
// SEND NOTIFICATION FUNCTION
// ================================================================
//
// Purpose:
// Sends execution notification using the notification provider.
//
// This function NEVER sends notifications directly.
//
// Responsibilities:
//
// - Delegate notification delivery
// - Return notification result
//
// ================================================================

import { notificationProvider } from '../notificationHelpers/notificationProvider.js';

import { NotificationOutput } from '../../../types/executorTools.type.js';

import { logService } from '../../../types/index.js';

// ================================================================
// SEND NOTIFICATION
// ================================================================

export async function sendNotification(
  incidentId: string,

  executionStatus: string,

  affectedServices: logService[],
): Promise<NotificationOutput> {
  // --------------------------------------------------------------
  // Delegate notification delivery.
  // --------------------------------------------------------------

  return notificationProvider(
    incidentId,

    executionStatus,

    affectedServices,
  );
}
