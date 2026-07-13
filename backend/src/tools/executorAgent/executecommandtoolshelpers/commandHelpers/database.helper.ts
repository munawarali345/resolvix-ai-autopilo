import { ExecutionContext } from '../../../../types/index.js';

import { findDatabase } from './util.helper.js';

// ================================================================
// HANDLE DATABASE COMMAND
// ================================================================

export async function handleDatabaseCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a database command
  // ------------------------------------------------

  if (
    !normalizedCommand.startsWith('show processlist') &&
    !normalizedCommand.startsWith('select * from pg_stat_activity') &&
    !normalizedCommand.startsWith('select pg_terminate_backend')
  ) {
    return false;
  }

  // ------------------------------------------------
  // SHOW PROCESSLIST
  // ------------------------------------------------

  if (normalizedCommand.startsWith('show processlist')) {
    const database = findDatabase('postgresql');

    if (!database) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = 'Database not found.';

      return true;
    }

    await delay(context.duration);

    context.stdout = [
      'Id   User      State     Time',

      '101  postgres  active    2',

      '102  app_user  idle      15',

      `Total Connections: ${database.activeConnections}`,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // pg_stat_activity
  // ------------------------------------------------

  if (normalizedCommand.startsWith('select * from pg_stat_activity')) {
    const database = findDatabase('postgresql');

    if (!database) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = 'Database not found.';

      return true;
    }

    await delay(context.duration);

    context.stdout = [
      'pid   usename    state',

      '201   postgres   active',

      '202   app_user   idle',

      `Active Connections: ${database.activeConnections}`,

      `CPU Usage: ${database.cpuUsage}%`,

      `Memory Usage: ${database.memoryUsage}%`,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // pg_terminate_backend
  // ------------------------------------------------

  if (normalizedCommand.startsWith('select pg_terminate_backend')) {
    const database = findDatabase('postgresql');

    if (!database) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = 'Database not found.';

      return true;
    }

    await delay(context.duration);

    if (database.activeConnections > 0) {
      database.activeConnections--;
    }

    database.updatedAt = new Date();

    context.stdout = [
      'pg_terminate_backend',

      '--------------------',

      't',

      `Remaining Connections: ${database.activeConnections}`,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Unsupported Database Command
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Unsupported database command "${command}"`;

  return true;
}
