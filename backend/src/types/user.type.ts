
export type UserRole = "admin" | "viewer";

export type User = {
  _id?: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
};

// Backend only (with password)
export type UserWithPassword = User & {
  password: string;
};