

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

// ApiResponse<T> me T kyun?

// Tumne pucha tha:

// export type ApiResponse<T> = {
//   success: boolean;
//   message: string;
//   data?: T;
// }

// Ye generic type hai.

// Iska matlab:

// Agar

// ApiResponse<Incident>

// to

// data

// Incident

// ban jayega.

// Agar

// ApiResponse<Report>

// to

// data

// Report

// ban jayega.

// Agar

// ApiResponse<DashboardOverview>

// to

// data

// DashboardOverview

// ban jayega.

// Yani ek hi wrapper har API ke liye reuse ho raha hai.

// Isi liye <T> use kiya hai.
