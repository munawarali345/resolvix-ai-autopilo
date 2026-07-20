import { ExecutionContext } from '../../../../types/index.js';

import { findDatabase, findCache } from './util.helper.js';

// ================================================================
// HANDLE PERFORMANCE COMMAND
// ================================================================

export async function handlePerformanceCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a performance command
  // ------------------------------------------------

  if (
    !normalizedCommand.startsWith('top') &&
    !normalizedCommand.startsWith('ps aux') &&
    !normalizedCommand.startsWith('sar -r') &&
    !normalizedCommand.startsWith('free -m') &&
    !normalizedCommand.startsWith('kubectl top pods') &&
    !normalizedCommand.startsWith('enable-cache-mode')
  ) {
    return false;
  }

  const database = findDatabase('postgresql');

  const cache = findCache('redis');

  // ------------------------------------------------
  // top
  // ------------------------------------------------

  if (normalizedCommand === 'top') {
    await delay(context.duration);

    context.stdout = [
      'top - System Performance',

      `CPU Usage: ${database?.cpuUsage ?? 0}%`,

      `Memory Usage: ${database?.memoryUsage ?? 0}%`,

      `Redis Memory: ${cache?.usedMemoryMB ?? 0} MB`,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // top -o %MEM
  // ------------------------------------------------

  if (normalizedCommand.startsWith('top -o %mem')) {
    await delay(context.duration);

    context.stdout = [
      'PID    COMMAND              %MEM',

      '3021   postgres            18.2',

      '1854   redis-server        12.4',

      '2218   payment-service      7.9',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // top -o %CPU
  // ------------------------------------------------

  if (normalizedCommand.startsWith('top -o %cpu')) {
    await delay(context.duration);

    context.stdout = [
      'PID    COMMAND              %CPU',
      '2218   payment-service      68.4',
      '3021   postgres             24.1',
      '1854   redis-server          8.3',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // ps aux --sort=-%mem
  // ------------------------------------------------

  if (normalizedCommand.startsWith('ps aux --sort=-%mem')) {
    await delay(context.duration);

    context.stdout = [
      'USER     PID   %CPU   %MEM   COMMAND',

      'postgres 3021   6.2    18.2   postgres',

      'redis    1854   2.1    12.4   redis-server',

      'node     2218   5.8     7.9   payment-service',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // ps aux --sort=-%cpu
  // ------------------------------------------------

  if (normalizedCommand.startsWith('ps aux --sort=-%cpu')) {
    await delay(context.duration);

    context.stdout = [
      'USER      PID   %CPU   %MEM   COMMAND',
      'node      2218   68.4    7.9   payment-service',
      'postgres  3021   24.1   18.2   postgres',
      'redis     1854    8.3   12.4   redis-server',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // sar -r 1 10
  // ------------------------------------------------

  if (normalizedCommand.startsWith('sar -r')) {
    await delay(context.duration);

    context.stdout = [
      'kbmemfree kbmemused %memused',

      '4012312   4182000    51.0',

      '3998210   4196102    51.2',

      '3984408   4209904    51.4',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // free -m
  // ------------------------------------------------

  if (normalizedCommand.startsWith('free -m')) {
    await delay(context.duration);

    context.stdout = [
      '              total   used   free',

      'Mem:          8192   4096   4096',

      'Swap:         2048      0   2048',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // kubectl top pods
  // ------------------------------------------------

  if (normalizedCommand.startsWith('kubectl top pods')) {
    await delay(context.duration);

    context.stdout = [
      'NAME                 CPU(cores)   MEMORY(bytes)',
      'api-gateway          420m         512Mi',
      'payment-service      180m         280Mi',
      'user-service         95m          190Mi',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // enable-cache-mode
  // ------------------------------------------------

  if (normalizedCommand.startsWith('enable-cache-mode')) {
    await delay(context.duration);

    context.stdout = [
      'Cache mode enabled successfully.',
      'Traffic will now be served from Redis cache.',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Unsupported Performance Command
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Unsupported performance command "${command}"`;

  return true;
}
