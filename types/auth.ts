import type { ClerkAPIError } from "@clerk/types";


export interface AuthError {
  message: string;
  code?: string;
  field?: string;
  meta?: Record<string, any>;
}

export interface ClerkErrorResponse {
  errors: ClerkAPIError[];
}

// Helper function to extract error message from Clerk errors
export function getClerkErrorMessage(error: any): string {
  if (typeof error === "string") return error;
  
  if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0].message || "An error occurred";
  }
  
  if (error?.message) return error.message;
  
  return "An unexpected error occurred";
}

// Helper function to create AuthError from Clerk error
export function parseClerkError(error: any): AuthError {
  const message = getClerkErrorMessage(error);
  
  const clerkError = error?.errors?.[0];
  
  return {
    message,
    code: clerkError?.code,
    field: clerkError?.meta?.paramName,
    meta: clerkError?.meta,
  };
}