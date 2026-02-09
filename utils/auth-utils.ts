// utils/auth-utils.ts

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export type UserRole = "ADMIN" | "INTERN" | "MENTOR" | "HR";

export type AuthSession = {
  clerkId: string;
  id: string;
  role: UserRole;
  status: string;
  profileId?: string;
} | null;

export async function getAuthSession(): Promise<AuthSession> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: { clerkId },
    include: {
      intern: true,
      mentor: true,
    },
  });

  if (!dbUser) {
    // User exists in Clerk but not in DB - you might want to create them
    return null;
  }

  return {
    clerkId,
    id: dbUser.id,
    role: dbUser.role as UserRole,
    status: dbUser.status,
    profileId: dbUser.intern?.id || dbUser.mentor?.id,
  };
}
