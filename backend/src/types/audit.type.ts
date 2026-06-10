
export enum AuditAction {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  RESET_PASSWORD = "RESET_PASSWORD",
  ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
}

export interface AuditLog {

  userId?: string;

  action: AuditAction;

  ipAddress?: string;

  userAgent?: string;

  metadata?: Record<string, any>;

  createdAt?: Date;

}