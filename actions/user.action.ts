"use server";

import { UserService } from "@/dal/user.service";
import { UserSchema } from "@/schemas/user.schema";
import { createSafeAction } from "@/utils/create-safe-action";

export const createUserAction = createSafeAction(UserSchema, async (data) => {
  return await UserService.create(data);
});
