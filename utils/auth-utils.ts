import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export type UserRole = "ADMIN" | "INTERN";
export async function getAuthSession() {
  const session = await auth();
  if (!session || !session.userId) {
    redirect("/sign-in");
  }
  const user = await db.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      id: true,
      role: true,
    },
  });

  return {
    dbId: user?.id,
    role: user?.role as UserRole | undefined,
  };
}

export type AuthSession = Awaited<ReturnType<typeof getAuthSession>>;
