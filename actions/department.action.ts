"use server";
import { createSafeAction } from "@/utils/create-safe-action";
import { DepartmentSchema } from "@/schemas/user.schema";
import { DepartmentService } from "@/dal/department.service";
import { authorize } from "@/lib/authorization";
import { UserService } from "@/dal/user.service";
import { currentUser } from "@clerk/nextjs/server";
import { UserFull } from "@/schemas/user.schema";

export const createDepartmentAction = createSafeAction(
  DepartmentSchema,
  async (data) => {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("No User Found");
    }
    const user = await UserService.getById(clerkUser.id);

    if (!user) {
      throw new Error("User not found or unauthorized");
    }
    const authorizedUser = {
      ...user,
      clerkId: clerkUser.id,
      status: "ACTIVE" as const, // Assuming an active user is performing this action
    };
    await authorize(authorizedUser as UserFull, "create", "Department");
    return await DepartmentService.create(data);
  },
);
export const updateDepartmentAction = createSafeAction(
  DepartmentSchema,
  async (data) => {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("No User Found");
    }
    const user = await UserService.getById(clerkUser.id);

    if (!user) {
      throw new Error("User not found or unauthorized");
    }
    const authorizedUser = {
      ...user,
      clerkId: clerkUser.id,
      status: "ACTIVE" as const, // Assuming an active user is performing this action
    };
    await authorize(authorizedUser as UserFull, "update", "Department");
    if (!data.id) throw new Error("Please Provide proper data");
    const dept = await DepartmentService.update(data.id, data);
    return dept;
  },
);
