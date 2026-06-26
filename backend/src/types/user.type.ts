export type UserRole = 'admin' | 'viewer';

export type User = {
  _id?: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;

  refreshToken?: string | null;

  isVerified: boolean;
  verificationToken?: string | null;
  verificationTokenExpires?: Date | null;

  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;

  loginAttempts?: number;
  lockUntil?: Date | null;
};

// Backend only (with password)
export type UserWithPassword = User & {
  password: string;
};
