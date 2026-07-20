// ================================================================
// AUTH STORE
// ================================================================
//
// Purpose:
// Frontend authentication state management.
//
// Responsibilities:
// 1. Store user information.
// 2. Handle login/register/logout actions.
// 3. Manage loading and errors.
//
// NOTE:
// auth.service is used for API calls.
// Store does not communicate directly with backend.
//
// Flow:
//
// Component
//    ↓
// Auth Store
//    ↓
// Auth Service
//    ↓
// API Client
//    ↓
// Backend
//
// ================================================================

import { create } from 'zustand';

import { loginUser, registerUser, logoutUser } from '@/services/auth.service';

import type {
  AuthState,
  LoginRequest,
  RegisterRequest,
  User,
} from '@/types/auth.types';

// ================================================================
// Store Interface
// ================================================================

interface AuthStore extends AuthState {
  // User login action
  login: (data: LoginRequest) => Promise<User | undefined>;

  // New user registration action
  register: (data: RegisterRequest) => Promise<void>;

  // Logout and clear user session
  logout: () => Promise<void>;

  // Remove previous API errors
  clearError: () => void;

  setUser: (user: User) => void;
}

// ================================================================
// Zustand Store
// ================================================================
//
// This creates the actual global auth state.
//
// Components access from this store:
// - current user
// - login status
// - actions
//
// ================================================================

export const useAuthStore = create<AuthStore>((set) => ({
  // -------------------------
  // Initial State
  // -------------------------

  user: null,

  isAuthenticated: false,

  isLoading: false,

  error: null,

  // -------------------------
  // Login Action
  // -------------------------

  login: async (data) => {
    try {
      // Request start
      // UI loading show karegi
      set({ isLoading: true, error: null });

      // Service backend login API call karegi
      const response = await loginUser(data);

      const user = response.data?.user;

      // Login successful
      // Backend se aya hua user global state me save
      set({
        user: response.data?.user,

        isAuthenticated: true,

        isLoading: false,
      });

      return user;
    } catch (error) {
      // Agar API fail ho jaye
      set({
        isLoading: false,

        error: error instanceof Error ? error.message : 'Login failed',
      });
    }
  },

  // -------------------------
  // Register Action
  // -------------------------

  register: async (data) => {
    try {
      // Request start
      // UI loading show karegi
      set({ isLoading: true, error: null });

      // Backend register API call
      await registerUser(data);

      // Registration complete
      set({
        isLoading: false,
      });
    } catch (error) {
      // Agar API fail ho jaye
      set({
        isLoading: false,

        error: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  },

  // ==============================================================
  // Logout User
  // ==============================================================
  //
  // Backend cookies clear karega.
  //
  // Frontend state bhi reset hogi.
  //
  // ==============================================================

  logout: async () => {
    try {
      // Backend logout API
      await logoutUser();

      // Local auth state clear
      set({
        user: null,

        isAuthenticated: false,

        isLoading: false,
      });
    } catch (error) {
      // Agar API fail ho jaye
      set({
        error: error instanceof Error ? error.message : 'Logout failed',
      });
    }
  },

  // ==============================================================
  // Clear Error
  // ==============================================================
  //
  // Previous API error remove karta hai.
  //
  // Example:
  // Login failed message hata dena.
  //
  // ==============================================================

  clearError: () => {
    set({
      error: null,
    });
  },

  setUser: (user) => {
    set({
      user,

      isAuthenticated: true,

      isLoading: false,
    });
  },
}));
