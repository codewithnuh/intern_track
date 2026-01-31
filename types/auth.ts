import type { ClerkAPIError, ClerkAPIResponseError } from "@clerk/types";

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
  meta?: Record<string, unknown>;
}

export interface ClerkErrorResponse {
  errors: ClerkAPIError[];
}

// Helper function to extract error message from Clerk errors
export function getClerkErrorMessage(
  error: unknown,
): error is ClerkAPIResponseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray((error as ClerkErrorResponse).errors)
  );
}

// Helper function to create AuthError from Clerk error
export function parseClerkError(error: unknown): AuthError {
  const message = getClerkErrorMessage(error)
    ? (error as ClerkErrorResponse).errors[0]?.message || "Unknown error"
    : "Unknown error";

  const clerkError = getClerkErrorMessage(error)
    ? (error as ClerkErrorResponse).errors[0]
    : undefined;

  return {
    message,
    code: clerkError?.code,
    field: clerkError?.meta?.paramName,
    meta: clerkError?.meta,
  };
}
