import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export type UserRole = "ADMIN" | "INTERN" | "MENTOR" | "HR";
export async function getAuthSession() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const dbUser = await db.user.findUnique({
    where: { clerkId },
    include: {
      intern: true, // Join the Intern profile
      mentor: true, // Join the Mentor profile
    },
  });

  if (!dbUser) return { clerkId, dbUser: null };

  return {
    clerkId,
    id: dbUser.id,
    role: dbUser.role,
    status: dbUser.status,
    // Provide a helper to get the specific profile ID
    profileId: dbUser.intern?.id || dbUser.mentor?.id,
  };
}
