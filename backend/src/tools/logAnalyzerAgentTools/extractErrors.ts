// ================================================================
// EXTRACT ERRORS TOOL
// ================================================================
//
// Purpose:
// Incident logs me se sirf ERROR level logs extract karna.
// ================================================================

import { Log } from '../../types/index.js';

// ================================================================
// Extract Error Logs
// ================================================================
export const extractErrors = (logs: Log[]): Log[] => {
  // Sirf ERROR level logs return karo.
  return logs.filter((log) => log.level === 'ERROR');
};
