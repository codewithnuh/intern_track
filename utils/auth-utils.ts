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
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      console.warn(
        "getAuthSession: No Clerk user ID found or user not authenticated.",
      );
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
      console.warn(
        `getAuthSession: User with Clerk ID "${clerkId}" found but not in database.`,
      );
      // User exists in Clerk but not in DB - you might want to create them or handle this as an error.
      return null;
    }

    return {
      clerkId,
      id: dbUser.id,
      role: dbUser.role as UserRole,
      status: dbUser.status,
      profileId: dbUser.intern?.id || dbUser.mentor?.id,
    };
  } catch (error) {
    // Catch any unexpected errors from auth() or db operations
    console.error(
      "getAuthSession: An unexpected error occurred while fetching session:",
      error,
    );
    return null;
  }
}
