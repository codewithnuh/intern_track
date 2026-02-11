import { UserStatus, Role } from "@/schemas/user.schema";
// src/types/globals.d.ts

declare global {
  interface CustomJwtSessionClaims {
    // 2. This must match the key you set in the Clerk Dashboard
    metadata: {
      role?: Role;
      status?: UserStatus;
    };
  }
  interface UserPublicMetadata {
    role?: Role;
    status?: UserStatus;
  }
}

export {};
