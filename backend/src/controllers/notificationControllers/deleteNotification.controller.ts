// ================================================================
// DELETE NOTIFICATION CONTROLLER
// ================================================================
//
// Purpose:
// Deletes a notification.
//
// Flow:
//
// 1. Read notification id from request params
// 2. Call Notification Service
// 3. Return success response
//
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { deleteNotification } from '../../services/notificationService/notification.service.js';

// ================================================================
// DELETE NOTIFICATION
// ================================================================
export const deleteNotificationController = async (
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
    // Delete notification
    // ------------------------------------------------------------
    const notification = await deleteNotification(notificationId);

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
    // Return success response
    // ------------------------------------------------------------
    res.status(200).json({
      success: true,

      message: 'Notification deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
