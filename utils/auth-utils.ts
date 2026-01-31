import { auth } from "@clerk/nextjs/server";

export async function getAuthSession() {
  const session = await auth();
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }
  return session;
}

export type AuthSession = Awaited<ReturnType<typeof getAuthSession>>;
