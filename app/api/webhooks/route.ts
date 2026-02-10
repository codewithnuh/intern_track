import { UserService } from "@/dal/user.service";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { error } from "three";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;
    if (eventType == "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0]?.email_address;
      try {
        await UserService.createInitialAccount({
          email: email,
          name: `${first_name} ${last_name}`,
          clerkId: id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return NextResponse.json({ message: "User created" }, { status: 201 });
      } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
      }
    } else if (eventType == "user.deleted") {
      try {
        const { id } = evt.data;
        if (!id) throw new Error("Id is undefined");
        await UserService.delete(id);
        return NextResponse.json({ message: "User Deleted" }, { status: 200 });
      } catch (err) {
        console.log(err);
        NextResponse.json({ error: err }, { status: 400 });
      }
    }

    console.log("Webhook payload:", evt.data);
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
