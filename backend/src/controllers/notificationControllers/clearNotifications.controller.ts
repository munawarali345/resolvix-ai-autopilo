// ================================================================
// CLEAR NOTIFICATIONS CONTROLLER
// ================================================================
//
// Purpose:
// Deletes all notifications.
//
// Flow:
//
// 1. Call Notification Service
// 2. Return deleted count
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { clearNotifications } from '../../services/notificationService/notification.service.js';

// ================================================================
// CLEAR NOTIFICATIONS
// ================================================================
export const clearNotificationsController = async (
  _req: Request,

  res: Response,

  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------------------
    // Clear all notifications
    // ------------------------------------------------------------
    const deletedCount = await clearNotifications();

    // ------------------------------------------------------------
    // Return success response
    // ------------------------------------------------------------
    res.status(200).json({
      success: true,

      message: 'Notifications cleared successfully.',

      deletedCount,
    });
  } catch (error) {
    next(error);
  }
};
