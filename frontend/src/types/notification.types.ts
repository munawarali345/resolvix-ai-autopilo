// ================================================================
// NOTIFICATION TYPES
// ================================================================
//
// Purpose:
// Frontend notification module types.
//
// Backend:
// Notification model response
//
// Used by:
// - Notification Service
// - React Query Hooks
// - Zustand Store
// - Notification UI
//
// ================================================================

// ================================================================
// NOTIFICATION SEVERITY
// ================================================================

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

// ================================================================
// NOTIFICATION STATUS
// ================================================================

export type NotificationStatus = 'unread' | 'read';

// ================================================================
// NOTIFICATION
// ================================================================
//
// Backend:
//
// {
//   _id,
//   incidentId,
//   title,
//   message,
//   severity,
//   recipients,
//   status,
//   createdAt,
//   updatedAt
// }
//
// ================================================================

export interface Notification {
  _id: string;

  // Related incident

  incidentId: string;

  // Notification title

  title: string;

  // Notification message

  message: string;

  // Importance level

  severity: NotificationSeverity;

  // Who receives notification

  recipients: string[];

  // Read state

  status: NotificationStatus;

  createdAt: Date;

  updatedAt: Date;
}

// ================================================================
// CREATE NOTIFICATION INPUT
// ================================================================
//
// Normally frontend se create nahi hoga.
// Ye backend executor create karega.
//
// Lekin type rakh sakte hain future use ke liye.
//
// ================================================================

export interface CreateNotificationInput {
  incidentId: string;

  title: string;

  message: string;

  severity: NotificationSeverity;

  recipients: string[];
}

// ================================================================
// SOCKET NOTIFICATION EVENT
// ================================================================
//
// Backend socket:
//
// io.emit(
//   "notification:new",
//    savedNotification
// )
//
// Ye frontend socket listener use karega.
//
// ================================================================

export type NotificationSocketEvent = Notification;
