// ye kam kia he k regie=ster ka bad tokens ni milnge token email verifiy hu jane k
// bad login k bad milnge

import bcryptjs from 'bcryptjs';
import { User } from '../models/index.js';
import {
  generateTokensService,
  verifyRefreshTokenService,
  generateEmailVerificationToken,
} from './token.service.js';
import { sendVerificationEmail } from './email.service.js';
import { AuthResponse } from '../types/auth.type.js';
import type { User as UserType } from '../types/user.type.js';
import { Document } from 'mongoose';
import { RegisterResponse } from '../types/auth.type.js';
import crypto from 'crypto';
import { sendResetPasswordEmail } from './email.service.js';

import { createAuditLog } from './audit.service.js';
import { AuditAction } from '../types/audit.type.js';

/**
 * ========================
 * AUTH SERVICE (BUSINESS LOGIC)
 * ========================
 * Sirf user + auth flow yahan rahega
 */

type UserDocument = UserType & Document;

// helper function for avoiding repeatation
const saveRefreshToken = async (user: UserDocument, refreshToken: string) => {
  const hashedToken = await bcryptjs.hash(refreshToken, 10);

  user.refreshToken = hashedToken;

  await user.save();
};

// ========================
// REGISTER USER
// REGISTER = only account create + email send
// ========================
export const registerUserService = async (
  email: string,
  password: string,
  name: string,
): Promise<RegisterResponse> => {
  // 1. check user exist
  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error('Email already exists');

  // 2. hash password
  const hashedPassword = await bcryptjs.hash(password, 10);

  // 3. Generate email verification token
  const verificationToken = generateEmailVerificationToken();

  // 4. Expire after 1 hour
  const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

  // 4. CREATE USER
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    role: 'viewer',

    // email verification fields
    isVerified: false,
    verificationToken,
    verificationTokenExpires,
  });

  // 5. Send verification email
  await sendVerificationEmail(user.email, verificationToken);

  return {
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified || false,
    },

    message: 'Please check your email for verification',
  };
};

// ========================
// LOGIN USER
// ========================
export const loginUserService = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new Error('Invalid credentials');

  // Check if account is locked
  if (user.lockUntil && user.lockUntil > new Date()) {
    throw new Error('Account temporarily locked.Try again in 15 minutes.');
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    // Increment failed login attempts
    user.loginAttempts = (user.loginAttempts || 0) + 1;

    // Lock account after 5 failed attempts
    if (user.loginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    }

    // Check email verification first
    if (!user.isVerified) {
      throw new Error('Please verify your email first');
    }

    await user.save();

    await createAuditLog({
      userId: user._id.toString(),

      action: AuditAction.ACCOUNT_LOCKED,

      metadata: {
        attempts: user.loginAttempts,
      },
    });

    throw new Error('Invalid credentials');
  }

  // Reset failed attempts after successful login
  user.loginAttempts = 0;

  user.lockUntil = null;

  const { accessToken, refreshToken } = generateTokensService(
    user._id.toString(),
    user.email,
    user.role,
  );

  // Hash refresh token before saving in DB
  // Agar DB leak ho jaye to raw refresh token expose na ho
  await saveRefreshToken(user, refreshToken);

  //  successfully login hu ne k bad log hu jaiga
  await createAuditLog({
    userId: user._id.toString(),
    action: AuditAction.LOGIN,
  });

  return {
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified || false,
    },
    accessToken,
    refreshToken,
  };
};

// ========================
// REFRESH TOKEN
// ========================
export const refreshTokensService = async (refreshToken: string) => {
  // Verify refresh token JWT signature
  const decoded = verifyRefreshTokenService(refreshToken);

  // Find user by decoded userId
  const user = await User.findById(decoded.userId);

  if (!user || !user.refreshToken) {
    throw new Error('Invalid refresh token');
  }

  // Compare incoming token with hashed token stored in DB
  const isValidRefreshToken = await bcryptjs.compare(
    refreshToken,

    user.refreshToken,
  );

  if (!isValidRefreshToken) {
    throw new Error('Invalid refresh token');
  }

  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } = generateTokensService(
    user._id.toString(),
    user.email,
    user.role,
  );

  // Hash newly generated refresh token
  // Refresh token rotation ke baad naya token DB me hash form me save hoga
  await saveRefreshToken(user, newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

// ========================
// LOGOUT USER
// ========================
export const logoutUserService = async (
  refreshToken: string,
): Promise<void> => {
  // Verify refresh token and get userId
  const decoded = verifyRefreshTokenService(refreshToken);

  // Find user by ID
  const user = await User.findById(decoded.userId);

  if (!user) {
    return;
  }

  // Remove stored refresh token
  user.refreshToken = null;

  await user.save();

  await createAuditLog({
    userId: user._id.toString(),

    action: AuditAction.LOGOUT,
  });
};

// ========================
// VERIFY EMAIL
// Email se jo token aya hai usko verify karna hai
// http://localhost:3000/verify-email?token=abc123
// ========================
export const verifyEmailService = async (token: string): Promise<void> => {
  const user = await User.findOne({
    // Kis user ka verificationToken = abc123 hai?
    verificationToken: token,
  });

  if (!user) {
    // Agar token DB me mila hi nahi to

    throw new Error('Invalid verification token');
  }

  // already verified check
  if (user.isVerified) {
    throw new Error('Email already verified');
  }

  // Check expiry
  // Ye expiry check hai
  if (
    !user.verificationTokenExpires || // Expiry date hai bhi ya nahi?
    user.verificationTokenExpires < new Date()
  ) {
    throw new Error('Verification token expired');
  }

  // Mark verified -> Ab user officially verified hai
  user.isVerified = true;

  // Cleanup -> Purana token delete. take link dubra use na ho
  // verifified hu gya token ki need ni he ab
  user.verificationToken = null;

  // Expiry bhi hata do.
  // expiry token ki thi token delet to exiry ki need ni
  user.verificationTokenExpires = null;

  // Saari changes DB me save.
  await user.save();

  await createAuditLog({
    userId: user._id.toString(),

    action: AuditAction.EMAIL_VERIFIED,
  });
};

// ========================
// FORGOT PASSWORD
// ========================
export const forgotPasswordService = async (email: string): Promise<void> => {
  // 1. find user
  const user = await User.findOne({ email });

  // security: don't reveal user existence
  if (!user) return;

  // 2. generate reset token (secure random)
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 3. expiry (15 minutes)
  const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

  // 4. save in DB
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpires;

  await user.save();

  // 5. send email
  await sendResetPasswordEmail(user.email, resetToken);

  await createAuditLog({
    userId: user._id.toString(),

    action: AuditAction.FORGOT_PASSWORD,
  });
};

// ========================
// RESET PASSWORD
// ========================
export const resetPasswordService = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  // 1. find user by token
  const user = await User.findOne({
    resetPasswordToken: token,
  });

  if (!user) {
    throw new Error('Invalid reset token');
  }

  // 2. check expiry
  if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
    throw new Error('Reset token expired');
  }

  // 3. hash new password
  const hashedPassword = await bcryptjs.hash(newPassword, 10);

  // 4. update password
  user.password = hashedPassword;

  // 5. cleanup token fields
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  // 6. save user
  await user.save();

  await createAuditLog({
    userId: user._id.toString(),

    action: AuditAction.RESET_PASSWORD,
  });
};
