import { protectRole } from "@/utils/rbac";

export default async function DashboardPage() {
  await protectRole(["ADMIN"]);
  return (
    <div>
      <h1 className=" text-red-100">Dashboard</h1>
    </div>
  );
}
