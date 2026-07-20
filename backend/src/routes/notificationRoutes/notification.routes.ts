// ================================================================
// NOTIFICATION ROUTES
// ================================================================
//
// Purpose:
// Defines all notification related API endpoints.
//
// ================================================================

import { Router } from 'express';

import {
  getNotificationsController,
  markNotificationAsReadController,
  deleteNotificationController,
  clearNotificationsController,
} from '../../controllers/index.js';

const router: Router = Router();

// ================================================================
// GET ALL NOTIFICATIONS
// ================================================================
router.get('/', getNotificationsController);

// ================================================================
// MARK NOTIFICATION AS READ
// ================================================================
router.patch('/:id/read', markNotificationAsReadController);

// ================================================================
// DELETE SINGLE NOTIFICATION
// ================================================================
router.delete('/:id', deleteNotificationController);

// ================================================================
// CLEAR ALL NOTIFICATIONS
// ================================================================
router.delete('/', clearNotificationsController);

export default router;
