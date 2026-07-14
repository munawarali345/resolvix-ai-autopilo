// ================================================================
// NOTIFICATION TYPES
// ================================================================
//
// Purpose:
// Shared notification domain types.
//
// Used by:
//
// - Notification Model
// - Notification Service
// - Socket Events
// - Notification APIs
//
// ================================================================

// ------------------------------------------------
// Notification Severity
// ------------------------------------------------

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

// ------------------------------------------------
// Notification Status
// ------------------------------------------------

export type NotificationStatus = 'unread' | 'read';

// ------------------------------------------------
// Notification
// ------------------------------------------------

export interface Notification {
  _id?: string;

  // Related Incident
  incidentId: string;

  // Short notification title
  title: string;

  // Detailed notification message
  message: string;

  // Notification importance
  severity: NotificationSeverity;

  // Notification recipients
  recipients: string[];

  // Read / Unread
  status: NotificationStatus;

  // Creation timestamp
  createdAt?: Date;

  // Last update timestamp
  updatedAt?: Date;
}

// ================================================================
// CREATE NOTIFICATION INPUT
// ================================================================
//
// Used when creating a new notification.
//
// Database-only fields like status, createdAt and updatedAt
// are generated automatically.
// ================================================================

export interface createNotificationInput {
  incidentId: string;

  title: string;

  message: string;

  severity: NotificationSeverity;

  recipients: string[];
}
