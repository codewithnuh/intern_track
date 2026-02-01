import { getAuthSession } from "@/utils/auth-utils";

export default async function DashboardPage() {
  const isSessionActive = await getAuthSession();
  
  console.log(isSessionActive);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
