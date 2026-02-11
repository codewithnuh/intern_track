"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <SignOutButton>
      <Button
        variant={"secondary"}
        className="w-full gap-2 cursor-pointer transition-colors"
        aria-label="Log out of your account"
      >
        <LogOut width={20} height={20} />
        Log Out
      </Button>
    </SignOutButton>
  );
}
