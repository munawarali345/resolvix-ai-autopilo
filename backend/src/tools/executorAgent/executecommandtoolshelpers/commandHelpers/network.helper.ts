import { ExecutionContext } from '../../../../types/index.js';

// ================================================================
// HANDLE NETWORK COMMAND
// ================================================================

export async function handleNetworkCommand(
  command: string,

  normalizedCommand: string,

  context: ExecutionContext,

  delay: (ms: number) => Promise<void>,
): Promise<boolean> {
  // ------------------------------------------------
  // Not a network command
  // ------------------------------------------------

  if (
    !normalizedCommand.startsWith('ping') &&
    !normalizedCommand.startsWith('netstat -rn') &&
    !normalizedCommand.startsWith('iptables -l')
  ) {
    return false;
  }

  // ------------------------------------------------
  // Ping
  // ------------------------------------------------

  if (normalizedCommand.startsWith('ping')) {
    const host = command.split(' ').pop()?.trim();

    if (!host) {
      context.success = false;

      context.exitCode = 1;

      context.stderr = 'Host is required.';

      return true;
    }

    await delay(context.duration);

    context.stdout = [
      `PING ${host}`,

      '64 bytes from host: icmp_seq=1 ttl=64 time=0.32 ms',

      '64 bytes from host: icmp_seq=2 ttl=64 time=0.29 ms',

      '',

      '--- ping statistics ---',

      '2 packets transmitted, 2 received, 0% packet loss',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Routing Table
  // ------------------------------------------------

  if (normalizedCommand.startsWith('netstat -rn')) {
    await delay(context.duration);

    context.stdout = [
      'Kernel IP routing table',

      'Destination     Gateway         Genmask         Flags',

      '0.0.0.0         192.168.1.1     0.0.0.0         UG',

      '192.168.1.0     0.0.0.0         255.255.255.0   U',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Firewall Rules
  // ------------------------------------------------

  if (normalizedCommand.startsWith('iptables -l')) {
    await delay(context.duration);

    context.stdout = [
      'Chain INPUT (policy ACCEPT)',

      'Chain FORWARD (policy ACCEPT)',

      'Chain OUTPUT (policy ACCEPT)',
    ].join('\n');

    return true;
  }

  // ------------------------------------------------
  // Unsupported Network Command
  // ------------------------------------------------

  context.success = false;

  context.exitCode = 1;

  context.stderr = `Unsupported network command "${command}"`;

  return true;
}
