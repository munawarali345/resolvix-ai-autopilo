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
    !normalizedCommand.startsWith('select pg_terminate_backend') &&
    !normalizedCommand.startsWith('select * from pg_stat_statements') &&
    !normalizedCommand.startsWith('select pg_cancel_backend') &&
    !normalizedCommand.startsWith('select * from slow_log')
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
  // pg_stat_statements
  // ------------------------------------------------

  if (normalizedCommand.startsWith('select * from pg_stat_statements')) {
    const database = findDatabase('postgresql');

    if (!database) {
      context.success = false;
      context.exitCode = 1;
      context.stderr = 'Database not found.';
      return true;
    }

    await delay(context.duration);

    context.stdout = [
      'query                      calls   total_time',
      'SELECT * FROM users        145     98 ms',
      'SELECT * FROM orders       72      55 ms',
      'UPDATE payments            18      33 ms',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // pg_cancel_backend
  // ------------------------------------------------

  if (normalizedCommand.startsWith('select pg_cancel_backend')) {
    const database = findDatabase('postgresql');

    if (!database) {
      context.success = false;
      context.exitCode = 1;
      context.stderr = 'Database not found.';
      return true;
    }

    await delay(context.duration);

    context.stdout = [
      'pg_cancel_backend',
      '-----------------',
      't',
      'Long running query cancelled successfully.',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // slow_log
  // ------------------------------------------------

  if (normalizedCommand.startsWith('select * from slow_log')) {
    await delay(context.duration);

    context.stdout = [
      'time                  duration    query',
      '12:01:22              3.2 sec     SELECT * FROM orders',
      '12:05:11              2.8 sec     UPDATE payments',
      '12:08:55              4.1 sec     SELECT * FROM users',
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
