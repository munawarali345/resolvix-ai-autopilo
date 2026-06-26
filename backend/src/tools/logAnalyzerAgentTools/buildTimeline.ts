// ================================================================
// BUILD TIMELINE TOOL
// ================================================================
//
// Purpose:
// Logs ko timestamp ke basis par chronological order me arrange karna.
// Logs ko timestamp ke hisab se sort karna.
// ================================================================

import { Log, TimelineItem } from '../../types/index.js';

// ================================================================
// Build Incident Timeline
// ================================================================
export const buildTimeline = (logs: Log[]): TimelineItem[] => {
  // ------------------------------------------------
  // STEP 1
  // Original logs mutate na hon
  // ------------------------------------------------
  const clonedLogs = [...logs];

  // ------------------------------------------------
  // STEP 2
  // Oldest → Newest sort karo
  // ------------------------------------------------
  // Timestamp ascending order me sort karo.
  const sortedLogs = clonedLogs.sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  // ------------------------------------------------
  // STEP 3
  // Timeline structure build karo
  // ------------------------------------------------
  return sortedLogs.map((log) => ({
    timestamp: log.timestamp,

    service: log.service,

    level: log.level,

    message: log.message,
  }));
};
