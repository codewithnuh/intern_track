import { protectRole } from "@/lib/rbac";

export default async function DashboardPage() {
  await protectRole(["ADMIN"]);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
