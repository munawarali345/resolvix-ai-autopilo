// Ye file AI ko bhejne se pehle logs ko clean + structured metrics me convert karegi
// error count
// warning count
// error rate
// affected services
// top error

// ================================================================
// LOG ANALYZER UTILITY
// ================================================================
// Purpose:
// Raw logs ko analyze karke structured metrics banana
// Ye data AI (Qwen) ko detection ke liye diya jayega
// ================================================================

import { Log } from '../types/index.js';

// ================================================================
// Analyze Logs Function
// ================================================================
export const analyzeLogs = (logs: Log[]) => {
  // ------------------------------------------------
  // Step 1: Total logs count
  // ------------------------------------------------
  const totalLogs = logs.length;

  // ------------------------------------------------
  // Step 2: ERROR logs count
  // ------------------------------------------------
  const errorLogs = logs.filter((log) => log.level === 'ERROR').length;

  // ------------------------------------------------
  // Step 3: WARN logs count
  // ------------------------------------------------
  const warningLogs = logs.filter((log) => log.level === 'WARN').length;

  // ------------------------------------------------
  // Step 4: Error rate calculate (percentage)
  // ------------------------------------------------
  const errorRate = totalLogs === 0 ? 0 : (errorLogs / totalLogs) * 100;

  // ------------------------------------------------
  // Step 5: Warning rate calculate (percentage)
  // ------------------------------------------------
  const warningRate = totalLogs === 0 ? 0 : (warningLogs / totalLogs) * 100;

  // ------------------------------------------------
  // Step 6: Affected services nikalna (unique) kaun kaun si services logs me involved hain
  // ------------------------------------------------
  const affectedServices = [...new Set(logs.map((log) => log.service))];

  // ------------------------------------------------
  // Step 7: first error message "sab se pehla error kya mila logs me"
  // ------------------------------------------------
  const topError =
    logs.find((log) => log.level === 'ERROR')?.message || 'No error detected';

  // ------------------------------------------------
  // Step 8: Final structured return
  // ------------------------------------------------
  return {
    totalLogs,
    errorLogs,
    warningLogs,
    errorRate,
    warningRate,
    affectedServices,
    topError,
  };
};

// Step 1: sab services nikaalo
// logs.map(log => log.service)
// example: ["database", "user-service", "database", "api-gateway"]

// Step 2: duplicate remove karo
// new Set(...)
// Set duplicates remove karta hai:
// ["database", "user-service", "api-gateway"]

// Step 3: wapas array banao
// [...set]
