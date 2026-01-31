import { db } from "@/lib/db";

import { ErrorCodes } from "@/types/action-types";
import { UserCreateInput } from "@/schemas/user.schema";

export class ServiceError extends Error {
  constructor(
    public code: ErrorCodes,
    message: string,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export const UserService = {
  /**
   * Creates a new user in the database.
   * Note: This accepts the TInput we defined in the Zod schema.
   */
  async create(data: UserCreateInput) {
    const existingUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      throw new ServiceError(
        ErrorCodes.VALIDATION_ERROR,
        "Email already exists",
      );
    }
    try {
      const user = await db.user.create({
        data,
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
      });
      return user;
    } catch (error) {
      if (error) {
        throw new ServiceError(
          ErrorCodes.INTERNAL_ERROR,
          "Failed to create user",
        );
      }
    }

    return {};
  },
};
