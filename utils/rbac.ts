import { redirect } from "next/navigation";
import { getAuthSession, UserRole } from "@/utils/auth-utils";
/** * Ensures the user is authenticated and has the required role. * If not, it redirects or throws an error. */ export async function protectRole(
  allowedRoles: UserRole[],
) {
  const user = await getAuthSession();
  if (!user) {
    redirect("/sign-in");
  }
  if (!user.role || !allowedRoles.includes(user.role)) {
    redirect("/");
  }
  return user;
}
