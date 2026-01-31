export type FieldErrors = Record<string, string[]>;
export enum ErrorCodes {
  UNAUTHORIZED = 303,
  FORBIDDEN = 403,
  VALIDATION_ERROR = 400,
  INTERNAL_ERROR = 500,
  NOT_FOUND = 404,
  NOT_IMPLEMENTED = 501,
}

export type ActionResponse<T> =
  | {
      success: true;
      data?: T;
      message: string;
    }
  | {
      success: false;
      message: string;
      errors: FieldErrors;
      code: ErrorCodes;
    };
