export type LogLevel = 'ERROR' | 'WARN' | 'INFO';

// Saari allowed services ek jagah define karo
export const LOG_SERVICES = [
  'api-gateway',
  'database',
  'user-service',
  'order-service',
  'payment-service',
  'cache',
  'monitoring',
  'deployment',
  'authentication',
  'health-check',
  'logging',
  'analytics-engine',
  'system',
] as const; //as const lagane se TypeScript is array ko readonly bana deta hai aur har value ko literal type maan leta hai.

// Type automatically constant se ban jayegi
export type logService = (typeof LOG_SERVICES)[number];

export type Log = {
  _id?: string;
  incidentId?: string;
  service: logService;
  level: LogLevel;
  message: string;
  timestamp: Date;
};
