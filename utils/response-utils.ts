import { ActionResponse, ErrorCodes, FieldErrors } from "@/types/action-types";

export const Result = {
  /**
   * Returns a successful response.
   * T is inferred from the data passed in.
   *
   */
  success: <T>(data: T, message = "Success"): ActionResponse<T> => ({
    success: true,
    data,
    message,
  }),

  /**
   * Returns a validation error (e.g., from Zod)
   */
  validationError: (
    errors: FieldErrors,
    message = "Invalid input",
  ): ActionResponse<never> => ({
    success: false,
    message,
    errors,
    code: ErrorCodes.VALIDATION_ERROR,
  }),

  /**
   * Returns a generic error (Auth, Forbidden, Server Error)
   */
  error: (
    code: ErrorCodes,
    message: string,
    errors: FieldErrors = {},
  ): ActionResponse<never> => ({
    success: false,
    message,
    errors,
    code,
  }),
};
