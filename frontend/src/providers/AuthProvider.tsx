// ================================================================
// AUTH PROVIDER
// ================================================================
//
// Purpose:
// App start hone par existing authentication restore karna.
//
// Responsibilities:
// 1. Refresh token check karna.
// 2. Current user fetch karna.
// 3. Zustand auth store update karna.
// 4. Auth initialization complete karna.
//
// Flow:
//
// App Load
//    ↓
// AuthProvider
//    ↓
// refreshToken()
//    ↓
// getCurrentUser()
//    ↓
// setUser()
//    ↓
// App Render
//
// ================================================================

'use client';

import { useEffect, useState, ReactNode } from 'react';

import { refreshToken } from '@/services/auth.service';

import { getCurrentUser } from '@/services/user.service';

import { useAuthStore } from '@/stores/auth.store';

// ================================================================
// Provider Props
// ================================================================

interface AuthProviderProps {
  children: ReactNode;
}

// ================================================================
// Auth Provider Component
// ================================================================

export function AuthProvider({ children }: AuthProviderProps) {
  // Ye batata hai auth check complete hua ya nahi
  const [initialized, setInitialized] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  // ==============================================================
  // Restore Authentication
  // ==============================================================
  //
  // App start hone par chalega.
  // App mount hone par ek dafa chalega.
  // Backend cookie check karega.
  //
  // Agar token valid hua:
  // user restore hoga.
  //
  // ==============================================================

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        // Step 1:
        // Refresh token cookie check hogi
        //
        // Agar refresh token valid hai
        // to naya access token milega
        await refreshToken();

        // Step 2:
        // Ab current logged in user fetch karo

        const response = await getCurrentUser();

        // Backend se user aya to store me save
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        // Agar token nahi mila
        // ya user login nahi hai
        //
        // To kuch nahi karna
        // default state user:null rahegi

        console.error('Authentication restore failed', error);
      } finally {
        // Auth checking complete
        setInitialized(true);
      }
    };

    restoreAuth();
  }, [setUser]);

  // ==============================================================
  // Wait Until Authentication Check Complete
  // ==============================================================

  if (!initialized) {
    return null;
  }

  return children;
}

// // ================================================================
// // Custom Hook
// // ================================================================
// //
// // Components me use karne ke liye.
// //
// // Example:
// //
// // const {initialized}=useAuth();
// //
// // ================================================================

// export function useAuth(){

//   const context = useContext(AuthContext);

//   if(!context){

//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );

//   }

//   return context;

// }
