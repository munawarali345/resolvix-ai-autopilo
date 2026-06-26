// src/models/log.model.ts
// ========================
// Log Model - Database Schema
// ========================

import mongoose, { Schema, Document } from 'mongoose';
import { Log, LOG_SERVICES } from '../types/log.type.js';

// Log document type
type LogDocument = Log & Document;

// Log schema
const logSchema = new Schema<LogDocument>(
  {
    incidentId: {
      type: String,
      index: true, // Frequently queried - index add karo
    },
    service: {
      type: String,
      required: [true, 'Service name zaroori hai'], // Kaunsi service se log aya
      enum: LOG_SERVICES, // Service types
    },
    level: {
      type: String,
      enum: ['ERROR', 'WARN', 'INFO'] as const, // Log levels
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Log message zaroori hai'], // Actual log message
    },
    timestamp: {
      type: Date,
      default: Date.now, // Current time default
      required: true,
      index: true, // Time-based queries ke liye index
    },
  },
  {
    timestamps: false, // Manual timestamp handle kar rahe hain
  },
);

// Composite index for efficient queries
logSchema.index({
  incidentId: 1,
  timestamp: -1, // Incident ke logs recent first
});

export const LogModel = mongoose.model<LogDocument>('Log', logSchema);
