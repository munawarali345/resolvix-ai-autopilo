// ================================================================
// User Service - Business Logic Layer
// ================================================================

import { User } from '../models/index.js';
import type { User as UserType } from '../types/user.type.js';

/**
 * ========================
 * GET USER BY ID
 * ========================
 */
export const getUserByIdService = async (
  userId: string,
): Promise<UserType | null> => {
  const user = await User.findById(userId);

  if (!user) return null;

  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    isVerified: user.isVerified || false,
    createdAt: user.createdAt?.toString(),
    updatedAt: user.updatedAt?.toString(),
  };
};

/**
 * ========================
 * GET ALL USERS (ADMIN PANEL)
 * ========================
 */
export const getAllUsersService = async (): Promise<UserType[]> => {
  const users = await User.find().sort({ createdAt: -1 });

  return users.map((user) => ({
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    isVerified: user.isVerified || false,
    createdAt: user.createdAt?.toString(),
    updatedAt: user.updatedAt?.toString(),
  }));
};

/**
 * ========================
 * UPDATE USER ROLE
 * ========================
 */
export const updateUserRoleService = async (
  userId: string,
  role: 'admin' | 'viewer',
): Promise<UserType | null> => {
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

  if (!user) return null;

  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    isVerified: user.isVerified || false,
    createdAt: user.createdAt?.toString(),
    updatedAt: user.updatedAt?.toString(),
  };
};

/**
 * ========================
 * DELETE USER (optional admin feature)
 * ========================
 */
export const deleteUserService = async (userId: string): Promise<boolean> => {
  const result = await User.findByIdAndDelete(userId);
  return !!result;
};
