// ================================================================
// USER ROUTES
// ================================================================
//
// Purpose:
// User related API endpoints define karna.
//
// Routes sirf request ko controller tak bhejti hain.
// Business logic service layer me hoti hai.
//
// ================================================================

import { Router } from 'express';

import * as userController from '../../controllers/userControllers/user.controller.js';

import {
  authMiddleware,
  authorize,
} from '../../middlewares/auth.middleware.js';

const router: Router = Router();

// ================================================================
// GET CURRENT USER
// GET /api/users/me
// ================================================================
//
// Logged in user ki profile return karega.
//
// Auth middleware token verify karega.
//

router.get('/me', authMiddleware, userController.getCurrentUser);

// ================================================================
// GET ALL USERS
// GET /api/users
// ================================================================
//
// Admin panel ke liye users list.
//
// Abhi auth middleware laga hai.
// Role check middleware baad me add karenge.
//

router.get('/', authMiddleware, authorize('admin'), userController.getAllUsers);

// ================================================================
// UPDATE USER ROLE
// PATCH /api/users/:id/role
// ================================================================
//
// Admin kisi user ka role change karega.
//
// Example:
// admin -> viewer
// viewer -> admin
//

router.patch(
  '/:id/role',
  authMiddleware,
  authorize('admin'),
  userController.updateUserRole,
);

// ================================================================
// DELETE USER
// DELETE /api/users/:id
// ================================================================
//
// Admin user delete karega.
//

router.delete(
  '/:id',
  authMiddleware,
  authorize('admin'),
  userController.deleteUser,
);

export default router;
