// ================================================================================
// Auth Controller - Request Handlers
// ================================================================================

import { Request, Response, NextFunction } from 'express';
import {
  registerUserService,
  loginUserService,
  refreshTokensService,
  logoutUserService,
  verifyEmailService,
  forgotPasswordService,
  resetPasswordService,
} from '../../services/auth.service.js';

// =====================================================
// REGISTER CONTROLLER
// =====================================================
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const result = await registerUserService(email, password, name);

    // =========================
    // SET HTTP ONLY COOKIES
    // =========================
    // res.cookie("accessToken", result.accessToken, {
    //   httpOnly: true,
    //   secure: false, // production me true (HTTPS)
    //   sameSite: "lax",
    //   maxAge: 60 * 60 * 1000, // 1 hour
    // });

    // res.cookie("refreshToken", result.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    res.status(201).json({
      success: true,
      message: result.message || 'Verification email sent',
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// LOGIN CONTROLLER
// =====================================================
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    // =========================
    // SET HTTP ONLY COOKIES
    // token ab cookie se jaa rhe he
    // browser me save
    // =========================
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false, // production me true (HTTPS)
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// REFRESH TOKEN CONTROLLER
// =====================================================
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // cookie se refresh token lo (NOT body)
    const refreshToken = req.cookies?.refreshToken;

    const result = await refreshTokensService(refreshToken);

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// LOGOUT CONTROLLER
// =====================================================
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // cookie se refresh token lo (NOT body)
    const refreshToken = req.cookies?.refreshToken;

    await logoutUserService(refreshToken);

    // clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// VERIFY EMAIL CONTROLLER
// ye controller kia karega user email me click krega
// GET /api/auth/verify-email?token=abc123
// =====================================================
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.query; // query se token nikalenge

    if (!token || typeof token !== 'string') {
      res.status(400).json({
        success: false,

        message: 'Verification token is required',
      });

      return;
    }

    await verifyEmailService(token); // service ko token de ker call ki service

    res.status(200).json({
      success: true,

      message: 'Email verified successfully',
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// FORGOT PASSWORD CONTROLLER
// =====================================================
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email } = req.body;

    await forgotPasswordService(email);

    res.status(200).json({
      success: true,
      message: 'If email exists, reset link has been sent',
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// RESET PASSWORD CONTROLLER
// =====================================================
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token, password } = req.body;

    await resetPasswordService(token, password);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    next(error);
  }
};
