
import { User } from "./user.type.js";

export type AuthRequest = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  user: Omit<User, "_id">;
  accessToken: string;
  refreshToken: string;
};

export type JWTPayload = {
  userId: string;
  email: string;
  role: "admin" | "viewer";
};

export type RegisterResponse = {
  user: {
    email: string;
    name: string;
    role: "admin" | "viewer";
    isVerified: boolean;
  };
  message: string;
};