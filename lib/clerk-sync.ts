import { UserStatus } from "@/schemas/user.schema";
import { clerkClient } from "@clerk/nextjs/server";
export const ClerkSyncService = {
  async syncMetadata(
    clerkId: string,
    data: { role: string; status: UserStatus },
  ) {
    const client = await clerkClient();

    try {
      await client.users.updateUserMetadata(clerkId, {
        publicMetadata: {
          role: data.role,
          onboardingStatus: data.status,
        },
      });
      console.log(`Successfully synced Clerk metadata for ${clerkId}`);
    } catch (error) {
      console.error("Failed to sync Clerk metadata:", error);
      // In a real app, you might want to log this to a service like Sentry
    }
  },
};
