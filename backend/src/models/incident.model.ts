
// src/models/incident.model.ts
// ========================
// Incident Model - Database Schema
// ========================

import mongoose, { Schema, Document } from "mongoose";
import { Incident } from "../types/incident.type.js";

// Incident document type
type IncidentDocument = Incident & Document;

// Incident schema
const incidentSchema = new Schema<IncidentDocument>(
  {
    title: {
      type: String,
      required: [true, "Incident title zaroori hai"],  // Title mandatory
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description zaroori hai"],     // Description mandatory
    },
    severity: {
      type: String,
      enum: ["critical", "high", "medium", "low"] as const,  // Severity levels
      default: "medium",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "rejected"] as const,  // Status options
      default: "open",
    },
    detectedAt: {
      type: Date,
      default: Date.now,                             // Current time default
      required: true,
    },
    rootCause: {
      type: String,
      default: null,                                 // Initially null - agent fill karega
    },
    fixApplied: {
      type: String,
      default: null,                                 // Initially null - agent apply karega
    },
    resolvedAt: {
      type: Date,
      default: null,                                 // Set hoga jab resolve hoga
    },
    mttr: {
      type: Number,                                 // Mean Time To Resolution (milliseconds)
      default: null,                                // Automatically calculate hoga
    },
  },
  {
    timestamps: true,                              // createdAt, updatedAt automatically
  }
);

// Indexes for faster queries
incidentSchema.index({ status: 1, createdAt: -1 }); // Status aur date par index
incidentSchema.index({ severity: 1 });               // Severity par index
incidentSchema.index({ detectedAt: -1 });            // Recent incidents find karne ke liye

export const IncidentModel = mongoose.model<IncidentDocument>(
  "Incident",
  incidentSchema
);