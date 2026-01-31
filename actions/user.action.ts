"use server";

import { UserService } from "@/dal/user.service";
import { CreateUserSchema } from "@/schemas/user.schema";
import { createSafeAction } from "@/utils/create-safe-action";

export const createUserAction = createSafeAction(
  CreateUserSchema,
  async (data) => {
    return await UserService.create(data);
  },
);
