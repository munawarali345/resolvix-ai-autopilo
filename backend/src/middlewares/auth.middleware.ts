// ================================================================================
// Authentication Middleware - JWT Token Verification
// ================================================================================
// Purpose: Protect routes by verifying JWT access tokens
// Middleware chain me use hoga: req => verify token => attach user => next()

import { Request, Response, NextFunction } from "express";
import { verifyAccessTokenService } from "../services/token.service.js";
import { JWTPayload } from "../types/auth.type.js";
import { UserRole } from "../types/user.type.js";
import logger from "../lib/logger.js";

// Extend Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

// ================================================================================
// Main Auth Middleware Function
// ================================================================================
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  // // Step 1: Extract Authorization header
  // const authHeader = req.headers.authorization;

  // // Step 2: Check if header exists
  // if (!authHeader) {

  //   logger.warn("Missing Authorization header");

  //   res.status(401).json({

  //     success: false,

  //     message: "Authorization header missing",

  //   });

  //   return;

  // }

  // // Step 3: Validate Bearer format
  // if (!authHeader.startsWith("Bearer ")) {

  //   logger.warn("Invalid Authorization header format");

  //   res.status(401).json({

  //     success: false,

  //     message: "Invalid Authorization header format - use 'Bearer <token>'",

  //   });

  //   return;

  // }

  // // Step 4: Extract token from header
  // const token = authHeader.substring(7); // Remove "Bearer " prefix

  // if (!token) {

  //   logger.warn("Empty token in Authorization header");

  //   res.status(401).json({

  //     success: false,

  //     message: "Token missing in Authorization header",

  //   });

  //   return;

  // }

  // Step 1: Try access token from HTTP Only Cookie
  let token = req.cookies?.accessToken;

  // Step 2: Fallback to Authorization Header agar cookie se token ni mila to ye chalega
  if (!token) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

      logger.warn("Missing authentication token");

      res.status(401).json({

        success: false,

        message: "Authentication token missing",

      });

      return;

    }

    if (!authHeader.startsWith("Bearer ")) {

      logger.warn("Invalid Authorization header format");

      res.status(401).json({

        success: false,

        message: "Invalid Authorization header format",

      });

      return;

    }

    token = authHeader.substring(7);

  }

  // Step 3: Final token validation
  if (!token) {

    logger.warn("Empty authentication token");

    res.status(401).json({

      success: false,

      message: "Authentication token missing",

    });

    return;

  }


  try {
    // Step 5: Verify JWT token
    const user = verifyAccessTokenService(token);

    // Step 6: Attach user to request object
    req.user = user;

    // Step 7: Continue to next handler
    next();

  } catch (error) {

    // Step 8: Token verification failed

    logger.warn("Invalid token attempt", { error });

    res.status(401).json({

      success: false,

      message: "Invalid or expired token",

    });
  }
};

// ================================================================================
// Role-Based Access Control Middleware
// ================================================================================
export const authorize = (...allowedRoles: UserRole[]) => {

  return (req: Request, res: Response, next: NextFunction): void => {

    if (!req.user) {

      res.status(401).json({

        success: false,

        message: "User not authenticated",

      });

      return;

    }

    if (!allowedRoles.includes(req.user.role)) {

      logger.warn("Unauthorized access attempt", { 

        userId: req.user.userId,

        role: req.user.role,

        requiredRoles: allowedRoles 

      });

      res.status(403).json({

        success: false,

        message: "Access denied - insufficient permissions",

      });
      
      return;
    }

    next();
  };
};

// ================================================================================
// Combined Middleware Aliases
// ================================================================================
export const authenticate = authMiddleware;
export const protect = authMiddleware;
