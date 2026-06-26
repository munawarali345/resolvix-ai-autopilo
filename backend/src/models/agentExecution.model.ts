// src/models/agentExecution.model.ts
// ========================
// Agent Execution Model - Database Schema
// ========================

import mongoose, { Schema, Document } from 'mongoose';
import { AgentExecution } from '../types/index.js';

// Agent execution document type
type AgentExecutionDocument = AgentExecution & Document;

// Agent execution schema
const agentExecutionSchema = new Schema<AgentExecutionDocument>(
  {
    incidentId: {
      type: String,
      required: [true, 'Incident ID is required'],
      index: true,
    },

    agentName: {
      type: String,
      enum: [
        'orchestrator',
        'detection',
        'log-analysis',
        'root-cause',
        'fix',
        'risk-validator',
        'executor',
        'reporter',
      ],
      required: [true, 'Agent name is required'],
    },

    status: {
      type: String,
      enum: ['running', 'success', 'failed'],
      default: 'running',
      required: true,
    },

    input: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },

    output: {
      type: Schema.Types.Mixed,
      default: null,
    },

    error: {
      type: String,
      default: null,
    },

    executionTime: {
      type: Number,
      default: 0,
      required: [true, 'Execution time is required'],
    },

    startedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// ========================
// Indexes
// ========================

// Incident ki executions
agentExecutionSchema.index({
  incidentId: 1,
  createdAt: -1,
});

// Agent status tracking
agentExecutionSchema.index({
  agentName: 1,
  status: 1,
});

// Recent executions
agentExecutionSchema.index({
  startedAt: -1,
});

// Model export
export const AgentExecutionModel = mongoose.model<AgentExecutionDocument>(
  'AgentExecution',
  agentExecutionSchema,
);
