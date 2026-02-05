import { UserFull as User } from "@/schemas/user.schema";
import { ROLE_PERMISSIONS } from "./permissions";
import { policies } from "./policies";
import { Action, Resource } from "@/lib/authorization/types";
import type { ResourceDataMap, UserFull } from "@/schemas/user.schema";

export async function authorize<K extends keyof ResourceDataMap>(
  user: User,
  action: Action,
  resource: Resource,
  data?: ResourceDataMap[K],
) {
  // 1. Check Global Admin
  if (user.role === "ADMIN") return true;

  // 2. Check RBAC (Does this role ever have this permission?)
  const permissions =
    ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || [];
  console.log(permissions);
  const hasBasePermission =
    permissions.includes(`${action}:${resource}`) || permissions.includes("*");

  if (!hasBasePermission) {
    throw new Error(
      `Forbidden: You do not have permission to ${action} ${resource}`,
    );
  }

  // 3. Check Policy (Context/Ownership)
  // Only check policy if data is provided
  if (data) {
    const policyFn = policies[resource] as (
      u: UserFull,
      d: ResourceDataMap[K],
    ) => boolean | undefined;
    if (policyFn && !policyFn(user, data)) {
      throw new Error(`Forbidden: You do not own this ${resource}`);
    }
  }

  return true;
}
