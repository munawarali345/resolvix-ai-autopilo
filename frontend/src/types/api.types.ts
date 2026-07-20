// ================================================================
// API RESPONSE TYPES
// ================================================================
//
// Purpose:
// Ye file backend ke common API response types define karti hai.
//
// Backend ke almost saare endpoints isi structure me response bhejte hain.
//
// Example:
//
// {
//   success: true,
//   message: "...",
//   data: {...}
// }
//
// Isliye hum isko ek hi jagah define karte hain.
//
// ================================================================

// ================================================================
// Generic API Response
// ================================================================

export interface ApiResponse<T> {
  success: boolean;

  message: string;

  data?: T;

  // Optional error message
  error?: string;
}

// ================================================================
// API Error Response
// ================================================================

export interface ApiErrorResponse {
  success: false;

  message: string;
}
