// src/models/audit.model.ts
// ========================
// Audit Log Model - Database Schema
// ========================

import mongoose, { Schema, Document } from 'mongoose';
import { AuditLog, AuditAction } from '../types/audit.type.js';

// Audit document type - Mongoose ke liye
type AuditLogDocument = AuditLog & Document;

// Audit schema - database structure
const auditLogSchema = new Schema<AuditLogDocument>(
  {
    userId: {
      type: String,
      default: null,
    },

    action: {
      type: String,
      enum: Object.values(AuditAction),
      required: [true, 'Action zaroori hai'],
    },

    ipAddress: {
      type: String,
      default: null,
    },

    userAgent: {
      type: String,
      default: null,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },

  {
    timestamps: true,
  },
);

// Index for faster queries
auditLogSchema.index({ userId: 1 }); // User ki sari activity dikhao

auditLogSchema.index({ action: 1 }); // User ki sari activity dikhao, Sirf PASSWORD_RESET events dikhao

auditLogSchema.index({ createdAt: -1 }); // Latest logs pehle dikhao

// Audit model create karo
export const AuditLogModel = mongoose.model<AuditLogDocument>(
  'AuditLog',
  auditLogSchema,
);
