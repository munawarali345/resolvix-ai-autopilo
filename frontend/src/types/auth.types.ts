// ================================================================
// AUTH TYPES
// ================================================================
//
// Purpose:
// Frontend authentication related types.
//
// Backend JWT, password, refresh token waghera frontend
// ko nahi chahiye.
//
// Frontend sirf user aur auth state handle karega.
//
// ================================================================

// ================================================================
// User Role
// ================================================================

export type UserRole = 'admin' | 'viewer';

// ================================================================
// User Object
// ================================================================

export interface User {
  // MongoDB id
  _id: string;

  // User email
  email: string;

  // Display name
  name: string;

  // Permission role
  role: UserRole;

  // Email verification status
  isVerified: boolean;

  // Created date
  createdAt?: string;

  // Updated date
  updatedAt?: string;
}

// ================================================================
// Register Request
// ================================================================

export interface RegisterRequest {
  email: string;

  password: string;

  name: string;
}

// ================================================================
// Register Response Data
// ================================================================
//
// Backend register response:
//
// data:{
//    user:{
//       email,
//       name,
//       role,
//       isVerified
//    }
// }
//
// ================================================================

export interface RegisterResponse {
  user: {
    email: string;

    name: string;

    role: UserRole;

    isVerified: boolean;
  };
}

// ================================================================
// Login Request
// ================================================================

export interface LoginRequest {
  email: string;

  password: string;
}

// ================================================================
// Auth Response Data
// ================================================================
//
// Backend:
//
// data:{
//    user:{}
// }
//
// ================================================================

export interface AuthResponseData {
  user: User;
}

// ================================================================
// Auth Store State
// ================================================================

export interface AuthState {
  user: User | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  error: string | null;
}
