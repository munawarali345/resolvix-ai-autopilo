// ================================================================
// USER CONTROLLER
// ================================================================
//
// Purpose:
// User related HTTP requests handle karta hai.
//
// Responsibilities:
// 1. Current user fetch karna.
// 2. Admin ke liye users list dena.
// 3. User role update karna.
// 4. User delete karna.
//
// Controller sirf request/response handle karta hai.
// Business logic service me hoti hai.
//
// ================================================================
import { Request, Response, NextFunction } from 'express';

import {
  getUserByIdService,
  getAllUsersService,
  updateUserRoleService,
  deleteUserService,
} from '../../services/user.service.js';

// ================================================================
// GET CURRENT USER
// GET /api/users/me
// ================================================================
//
// Middleware se userId milega.
// Service database se user nikal degi.
//
// ================================================================
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,

        message: 'Unauthorized',
      });

      return;
    }

    const user = await getUserByIdService(userId);

    if (!user) {
      res.status(404).json({
        success: false,

        message: 'User not found',
      });

      return;
    }

    res.status(200).json({
      success: true,

      message: 'User fetched successfully',

      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================================================================
// GET ALL USERS
// GET /api/users
// ================================================================
//
// Admin panel ke liye users list.
//
// ================================================================

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await getAllUsersService();

    res.status(200).json({
      success: true,

      message: 'Users fetched successfully',

      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================================================================
// UPDATE USER ROLE
// PATCH /api/users/:id/role
// ================================================================
//
// Admin user ka role change karega.
//
// ================================================================

export const updateUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const { role } = req.body;

    const user = await updateUserRoleService(id, role);

    if (!user) {
      res.status(404).json({
        success: false,

        message: 'User not found',
      });

      return;
    }

    res.status(200).json({
      success: true,

      message: 'User role updated',

      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================================================================
// DELETE USER
// DELETE /api/users/:id
// ================================================================
//
// Admin user delete karega.
//
// ================================================================

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await deleteUserService(id);

    if (!deleted) {
      res.status(404).json({
        success: false,

        message: 'User not found',
      });

      return;
    }

    res.status(200).json({
      success: true,

      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
