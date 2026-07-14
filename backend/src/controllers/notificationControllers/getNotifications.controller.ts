// ================================================================
// GET NOTIFICATIONS CONTROLLER
// ================================================================
//
// Purpose:
// Handles fetching all notifications.
//
// Flow:
//
// 1. Call Notification Service
// 2. Return notifications
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { getNotifications } from '../../services/notificationService/notification.service.js';

// ================================================================
// GET NOTIFICATIONS
// ================================================================
export const getNotificationsController = async (
  _req: Request,

  res: Response,

  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------------------
    // service call
    // ------------------------------------------------------------
    const notifications = await getNotifications();

    // ------------------------------------------------------------
    // Return notifications
    // ------------------------------------------------------------
    res.status(200).json({
      success: true,

      message: 'Notifications fetched successfully.',

      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};
