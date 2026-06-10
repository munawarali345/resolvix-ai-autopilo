
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth.type.js";
import { env } from "../config/validateEnv.js";
import crypto from "crypto";

/**
 * ========================
 * TOKEN SERVICE (UTILITY LAYER)
 * ========================
 * Sirf JWT related kaam yahan hoga
 */

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

const jwtSecret = env.JWT_SECRET;

// ========================
// 1. Generate Tokens
// ========================
export const generateTokensService = (
  userId: string,
  email: string,
  role: string

): { accessToken: string; refreshToken: string } => {

  // Access Token (short life)
  const accessToken = jwt.sign(

    { userId, email, role },

    jwtSecret,

    {
      expiresIn: Number(env.ACCESS_TOKEN_EXPIRY),
      issuer: "resolvix-ai",
    }

  );

  // Refresh Token (long life)
  const refreshToken = jwt.sign(

    { userId },

    jwtSecret,

    {
      expiresIn: Number(env.REFRESH_TOKEN_EXPIRY),
      issuer: "resolvix-ai",
    }

  );

  return { accessToken, refreshToken };

};

// ========================
// 2. Verify Access Token
// ========================
export const verifyAccessTokenService = (token: string): JWTPayload => {

  return jwt.verify(token, jwtSecret) as JWTPayload;

};

// ========================
// 3. Verify Refresh Token
// ========================
export const verifyRefreshTokenService = (
  token: string
): { userId: string } => {

  const decoded = jwt.verify(token, jwtSecret) as any;

  return { userId: decoded.userId };

};

// // ========================
// // 4. Decode Token (debug only)
// // ========================
// export const decodeTokenService = (token: string) => {
//   return jwt.decode(token);
// };

// ========================
// 5. Check Expiry
// ========================
export const isTokenExpiredService = (token: string): boolean => {

  const decoded = jwt.decode(token) as any;

  if (!decoded?.exp) return true;

  const now = Math.floor(Date.now() / 1000);

  return decoded.exp < now;
  
};

// ========================
// 6. Generate Email Verification Token
// ========================
export const generateEmailVerificationToken = (): string => {

  return crypto.randomBytes(32).toString("hex");

};