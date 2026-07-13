import { ExecutionContext } from '../../../../types/index.js';

import { findCache } from './util.helper.js';

// ================================================================
// HANDLE CACHE COMMAND
// ================================================================

export async function handleCacheCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a cache command
  // ------------------------------------------------

  if (
    !normalizedCommand.startsWith('redis-cli info memory') &&
    !normalizedCommand.startsWith('redis-cli flushdb')
  ) {
    return false;
  }

  // ------------------------------------------------
  // Find Cache
  // ------------------------------------------------

  const cache = findCache('redis');

  if (!cache) {
    context.success = false;

    context.exitCode = 1;

    context.stderr = 'Redis cache not found.';

    return true;
  }

  // ------------------------------------------------
  // INFO MEMORY
  // ------------------------------------------------

  if (normalizedCommand.startsWith('redis-cli info memory')) {
    await delay(context.duration);

    context.stdout = [
      '# Memory',

      `used_memory_human:${cache.usedMemoryMB}M`,

      `maxmemory_human:${cache.maxMemoryMB}M`,

      `keyspace_hits:${cache.hitRate}%`,

      `keys:${cache.keys}`,
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // FLUSHDB
  // ------------------------------------------------

  if (normalizedCommand.startsWith('redis-cli flushdb')) {
    await delay(context.duration);

    cache.keys = 0;

    cache.usedMemoryMB = 0;

    cache.updatedAt = new Date();

    context.stdout = [
      'OK',

      'Database flushed successfully.',

      'Keys remaining: 0',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Unsupported Cache Command
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Unsupported cache command "${command}"`;

  return true;
}
