// NOTIFICATION SERVICE
// ================================================================
//
// Purpose:
// Handles all notification database operations.
//
// Responsibilities:
//
// 1. Create notification
// 2. Get notifications
// 3. Mark notification as read
// 4. Delete notification
//
// ================================================================

import { NotificationModel } from '../../models/notification.model.js';

import { Notification, createNotificationInput } from '../../types/index.js';

// ================================================================
// MAIN FUNCTION
// CREATE NOTIFICATION
// ================================================================
export const createNotification = async (
  notification: createNotificationInput,
): Promise<Notification> => {
  // ------------------------------------------------------------
  // Create notification document
  // ------------------------------------------------------------
  const createdNotification = await NotificationModel.create(notification);

  // ------------------------------------------------------------
  // Return saved notification
  // ------------------------------------------------------------
  return createdNotification;
};

// ================================================================
// GET ALL NOTIFICATIONS
// ================================================================
//
// Returns all notifications sorted by newest first.
//
// ================================================================
export const getNotifications = async (): Promise<Notification[]> => {
  // ------------------------------------------------------------
  // Fetch notifications
  // ------------------------------------------------------------
  const notifications = await NotificationModel.find().sort({ createdAt: -1 });

  // ------------------------------------------------------------
  // Return notifications
  // ------------------------------------------------------------
  return notifications;
};

// ================================================================
// MARK NOTIFICATION AS READ
// ================================================================
//
// Updates notification status to "read".
//
// ================================================================
export const markNotificationAsRead = async (
  notificationId: string,
): Promise<Notification | null> => {
  // ------------------------------------------------------------
  // Update notification status
  // ------------------------------------------------------------
  const updatedNotification = await NotificationModel.findByIdAndUpdate(
    notificationId,

    {
      status: 'read',
    },

    {
      new: true, // mongo update k bad old document return krta he new: true kerne se updated bejga
    },
  );

  // ------------------------------------------------------------
  // Return updated notification
  // ------------------------------------------------------------
  return updatedNotification;
};

// ================================================================
// DELETE NOTIFICATION
// ================================================================
//
// Deletes a notification document.
//
// ================================================================
export const deleteNotification = async (
  notificationId: string,
): Promise<Notification | null> => {
  // ------------------------------------------------------------
  // Delete notification
  // ------------------------------------------------------------
  const deletedNotification =
    await NotificationModel.findByIdAndDelete(notificationId);

  // ------------------------------------------------------------
  // Return deleted notification
  // ------------------------------------------------------------
  return deletedNotification;
};

// ================================================================
// CLEAR ALL NOTIFICATIONS
// ================================================================
//
// Deletes all notification documents.
//
// ================================================================
export const clearNotifications = async (): Promise<number> => {
  // ------------------------------------------------------------
  // Delete all notifications
  // ------------------------------------------------------------
  const result = await NotificationModel.deleteMany({}); // condition empty measn delete all

  // ------------------------------------------------------------
  // Return deleted document count
  // ------------------------------------------------------------
  return result.deletedCount ?? 0;
};

// deletedCount kya hai?

// Mongo return karta hai

// const result = await deleteMany({});

// Result

// {
//   acknowledged:true,

//   deletedCount:18
// }

// Hum sirf

// deletedCount

// return kar rahe hain.

// Taake controller bol sake

// 18 notifications deleted.
