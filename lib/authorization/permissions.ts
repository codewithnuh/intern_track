import { Role } from "@/schemas/user.schema";
import type { Permission } from "@/lib/authorization/types";
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: ["*"],
  HR: ["read:Intern", "approve:Intern", "manage:LeaveRequest", "read:Project"],
  MENTOR: [
    "read:Intern",
    "create:Task",
    "update:Task",
    "delete:Task",
    "create:Feedback",
    "read:Project",
  ],
  INTERN: ["read:Intern", "update:Task", "read:Project", "create:LeaveRequest"],
};
