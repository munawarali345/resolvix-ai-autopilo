
// src/models/user.model.ts
// ========================
// User Model - Database Schema
// ========================

import mongoose, { Schema, Document } from "mongoose";
import { UserWithPassword } from "../types/user.type.js";

// User document type - Mongoose ke liye
type UserDocument = UserWithPassword & Document;

// User schema - database structure
const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email zaroori hai"],        // Email mandatory
      unique: true,                                  // Duplicate email nahi allowed
      lowercase: true,                               // Lowercase mein store karo
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Valid email daal",                         // Email format validate
      ],
    },
    password: {
      type: String,
      required: [true, "Password zaroori hai"],     // Password mandatory
      minlength: 8,                                  // Minimum 8 characters
      select: false,                                 // By default password return na karo
    },
    name: {
      type: String,
      required: [true, "Name zaroori hai"],         // Name mandatory
      trim: true,                                    // Spaces remove karo
    },
    role: {
      type: String,
      enum: ["admin", "viewer"],
      default: "viewer",
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
userSchema.index({ createdAt: -1 });           // createdAt field par index bana do, aur
                                              // newest records pehle rakhne wali sorting optimize karo."      

// User model create karo
export const UserModel = mongoose.model<UserDocument>("User", userSchema);