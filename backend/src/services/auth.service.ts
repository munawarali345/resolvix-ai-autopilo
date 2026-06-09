
import bcryptjs from "bcryptjs";
import { User } from "../models/model.index.js";
import { generateTokensService, verifyRefreshTokenService } from "./token.service.js";
import { AuthResponse } from "../types/auth.type.js";
import type { User as UserType } from "../types/user.type.js";
import { Document } from "mongoose";


/**
 * ========================
 * AUTH SERVICE (BUSINESS LOGIC)
 * ========================
 * Sirf user + auth flow yahan rahega
 */

type UserDocument = UserType & Document;


// helper function for avoiding repeatation
const saveRefreshToken = async (user: UserDocument, refreshToken: string) => {

  const hashed = await bcryptjs.hash(refreshToken, 10);

  user.refreshToken = hashed;

  await user.save();

};

// ========================
// REGISTER USER
// ========================
export const registerUserService = async (
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> => {

  // check user exist
  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("Email already exists");

  // hash password
  const hashedPassword = await bcryptjs.hash(password, 10);

  // create user
  const user = await User.create({

    email,
    password: hashedPassword,
    name,
    role: "viewer",

  });

  // generate tokens (from token service)
  const { accessToken, refreshToken } = generateTokensService(
    
    user._id.toString(),
    user.email,
    user.role

  );

   // Hash refresh token before saving in DB
  // Agar DB leak ho jaye to raw refresh token expose na ho
  await saveRefreshToken(user, refreshToken);


  return {
    
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
    accessToken,
    refreshToken,

  };

};

// ========================
// LOGIN USER
// ========================
export const loginUserService = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
    
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const { accessToken, refreshToken } = generateTokensService(

    user._id.toString(),
    user.email,
    user.role

  );

   // Hash refresh token before saving in DB
  // Agar DB leak ho jaye to raw refresh token expose na ho
   await saveRefreshToken(user, refreshToken);


  return {
    
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
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

    throw new Error("Invalid refresh token");

  }

  // Compare incoming token with hashed token stored in DB
  const isValidRefreshToken = await bcryptjs.compare(

    refreshToken,

    user.refreshToken

  );

  if (!isValidRefreshToken) {

    throw new Error("Invalid refresh token");

  }

  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } = generateTokensService(

    user._id.toString(),
    user.email,
    user.role

  );

  // Hash newly generated refresh token
  // Refresh token rotation ke baad naya token DB me hash form me save hoga
  await saveRefreshToken(user, refreshToken);

  return { accessToken, refreshToken: newRefreshToken };

};

// ========================
// LOGOUT USER
// ========================
export const logoutUserService = async (
  refreshToken: string
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

};