import { z } from "zod";
import { getAuthSession } from "@/utils/auth-utils";
import { ActionResponse, ErrorCodes, FieldErrors } from "@/types/action-types";
import { Result } from "@/utils/response-utils";
import { Session } from "@clerk/nextjs/server";

/**
 *@template TInput - The shape of data after zod validation.
 *@template TOutput - The shape of data after zod validation.
 **/
export function createSafeAction<TInput, TOutput>(
  schema: z.ZodSchema<TInput>,
  handler: (data: TInput, session: Session | null) => Promise<TOutput>,
) {
  return async (formData: FormData): Promise<ActionResponse<TOutput>> => {
    try {
      const session = await getAuthSession();
      const rawValues = Object.fromEntries(formData.entries());
      const validatedFields = schema.safeParse(rawValues);
      if (!validatedFields.success) {
        return {
          success: false,
          message: "Invalid Input Fields",
          errors: z.treeifyError(
            validatedFields.error,
          ) as FieldErrors as FieldErrors,
          code: ErrorCodes.VALIDATION_ERROR,
        };
      }
      const result = await handler(
        validatedFields.data,
        session as Session | null,
      );
      return Result.success(result);
    } catch (error) {
      console.log(error);
      // console.error(error);
      if (error instanceof Error) {
        // Map specific errors to our Enum codes
        if (error.message === "FORBIDDEN") {
          return Result.error(ErrorCodes.FORBIDDEN, "Access denied.");
        }
      }
      return Result.error(
        ErrorCodes.INTERNAL_ERROR,
        "An unexpected error occurred.",
      );
    }
  };
}
