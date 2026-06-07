
export type LogLevel = "ERROR" | "WARN" | "INFO";

export type Log = {
  _id?: string;
  incidentId: string;
  service: "api" | "database" | "worker" | "cache" | "scheduler";
  level: LogLevel;
  message: string;
  timestamp: Date;
};