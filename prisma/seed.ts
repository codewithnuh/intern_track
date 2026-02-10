import db from "@/lib/db";
import { createClerkClient } from "@clerk/nextjs/server";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function main() {
  console.log("🌱 Starting customized seed...");

  // 1. Define your Admin Data
  const adminEmail = "codewithnuh@gmail.com";

  // 2. Step: Check or Create in Clerk
  // This ensures the "Auth" side is ready
  let clerkUser;
  const existingUsers = await clerk.users.getUserList({
    emailAddress: [adminEmail],
  });

  if (existingUsers.data.length > 0) {
    clerkUser = existingUsers.data[0];
    console.log(`ℹ️ Admin already exists in Clerk: ${clerkUser.id}`);
  } else {
    clerkUser = await clerk.users.createUser({
      emailAddress: [adminEmail],
      password: "akjslkdjkwlejkajskdjaskl", // Change this on first login
      publicMetadata: { role: "ADMIN" },
      skipLegalChecks: true,
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
    });
    console.log(`✅ New Admin created in Clerk: ${clerkUser.id}`);
  }

  // 3. Step: Sync to Database using Clerk ID
  const admin = await db.user.upsert({
    where: { clerkId: clerkUser.id }, // Using the Clerk ID as the unique key
    update: {
      role: "ADMIN", // Ensure the role is correct if the user existed
    },
    create: {
      clerkId: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      email: clerkUser.emailAddresses[0].emailAddress,
      role: "ADMIN",
    },
  });

  console.log("🚀 Seed complete:", { adminId: admin.id });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await db.$disconnect();
    process.exit(1);
  });
