
// src/services/audit.service.ts
// ========================
// Audit Service - Audit Logs Create Karne Ke Liye
// ========================

import { AuditLogModel } from "../models/audit.model.js";
import { AuditLog } from "../types/audit.type.js";

// ========================
// Create Audit Log
// ========================
export const createAuditLog = async (
  data: AuditLog
): Promise<void> => {

  await AuditLogModel.create({

    userId: data.userId,

    action: data.action,

    ipAddress: data.ipAddress,

    userAgent: data.userAgent,

    metadata: data.metadata,

  });

};