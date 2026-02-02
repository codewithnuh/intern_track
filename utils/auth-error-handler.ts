import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
interface AuthErrorResult {
  message: string;
}
/**
 * Senior Tip: This function handles the "Side Effects" (toasts)
 * and returns the "Value" (message string) for local component state.
 */
export function handleAuthError(err: unknown): AuthErrorResult {
  let message = "An unexpected error occurred.";

  if (isClerkAPIResponseError(err)) {
    // Clerk errors are often an array; we usually want the first one for the UI
    message =
      err.errors?.[0]?.longMessage || err.errors?.[0]?.message || message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return { message };
}
