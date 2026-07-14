// ================================================================
// MARK NOTIFICATION AS READ CONTROLLER
// ================================================================
//
// Purpose:
// Marks a notification as read.
//
// Flow:
//
// 1. Read notification id from request params
// 2. Call Notification Service
// 3. Return updated notification
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { markNotificationAsRead } from '../../services/notificationService/notification.service.js';

// ================================================================
// MARK NOTIFICATION AS READ
// ================================================================
export const markNotificationAsReadController = async (
  req: Request,

  res: Response,

  next: NextFunction,
): Promise<void> => {
  try {
    // ------------------------------------------------------------
    // Read notification id
    // ------------------------------------------------------------
    const notificationId = req.params.id;

    // ------------------------------------------------------------
    // Mark notification as read
    // ------------------------------------------------------------
    const notification = await markNotificationAsRead(notificationId);

    // ------------------------------------------------------------
    // Notification not found
    // ------------------------------------------------------------
    if (!notification) {
      res.status(404).json({
        success: false,

        message: 'Notification not found.',
      });

      return;
    }

    // ------------------------------------------------------------
    // Return updated notification
    // ------------------------------------------------------------
    res.status(200).json({
      success: true,

      message: 'Notification marked as read successfully.',

      data: notification,
    });
  } catch (error) {
    next(error);
  }
};
