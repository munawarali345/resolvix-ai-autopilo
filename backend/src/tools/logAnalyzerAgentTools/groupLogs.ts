// ================================================================
// GROUP LOGS TOOL
// ================================================================
//
// Purpose:
// Repeated log messages ko group karna aur count nikalna.
// ================================================================

import { Log, GroupedLog } from '../../types/index.js';

// ================================================================
// Group Logs
// ================================================================
export const groupLogs = (logs: Log[]): GroupedLog[] => {
  // Message => Count map
  const logMap = new Map<string, number>();

  // Har log process karo
  for (const log of logs) {
    // Existing count nikalo
    const currentCount = logMap.get(log.message) || 0;

    // Count update karo
    logMap.set(log.message, currentCount + 1);
  }

  // Final grouped array
  return Array.from(logMap.entries()).map(([message, count]) => ({
    message,
    count,
  }));
};
