// src/models/report.model.ts
// ========================
// Report Model - Database Schema
// ========================

import mongoose, { Schema, Document } from 'mongoose';
import { Report, ReportTimeline, ReportMetrics } from '../types/report.type.js';

// Report document type
type ReportDocument = Report & Document;

// Timeline sub-schema
const timelineSchema = new Schema<ReportTimeline>(
  {
    timestamp: {
      type: Date,
      required: true,
    },

    event: {
      type: String,
      required: true, // Kya event tha
    },

    agent: {
      type: String,
      required: true, // Kaunsa agent handle kiya
    },
  },

  { _id: false }, // Sub-document ko ID na de
);

// Metrics sub-schema
const metricsSchema = new Schema<ReportMetrics>(
  {
    detectionTime: {
      type: Number,
      required: true, // Detection mein kitna time (ms)
    },

    diagnosisTime: {
      type: Number,
      required: true, // Diagnosis mein kitna time (ms)
    },

    executionTime: {
      type: Number,
      required: true, // Fix execution mein kitna time (ms)
    },

    mttr: {
      type: Number,
      default: null,
    },

    totalTime: {
      type: Number,
      required: true, // Total time (ms)
    },
  },

  { _id: false }, // Sub-document ko ID na de
);

// Report schema
const reportSchema = new Schema<ReportDocument>(
  {
    incidentId: {
      type: String,
      required: [true, 'Incident ID zaroori hai'], // Kis incident ka report hai
      index: true, // Frequently queried
    },

    title: {
      type: String,
      required: [true, 'Report title zaroori hai'], // Report ka title
    },

    summary: {
      type: String,
      required: [true, 'Summary zaroori hai'], // Short summary
    },

    timeline: {
      type: [timelineSchema],
      required: true, // Incident ke steps
    },

    metrics: {
      type: metricsSchema,
      required: true, // Performance metrics
    },

    executiveSummary: {
      type: String,
      required: true,
    },

    technicalSummary: {
      type: String,
      required: true,
    },

    incidentStatus: {
      type: String,
      enum: ['RESOLVED', 'FAILED', 'ROLLED_BACK'],

      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true, // createdAt automatically
  },
);

// Index for faster queries
reportSchema.index({ incidentId: 1 });

export const ReportModel = mongoose.model<ReportDocument>(
  'Report',
  reportSchema,
);
