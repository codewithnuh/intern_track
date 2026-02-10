import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Container } from "./container";
import { Settings, LogOut, User } from "lucide-react";

export const Navbar: React.FC = async () => {
  const user = await currentUser();
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-charcoal/80 backdrop-blur-xl">
      <Container>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Link href={"/"}>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </Link>
            </div>
            <span className="text-2xl font-black tracking-tight">
              Intern-track
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-slate-400">
            {["Features", "Solutions", "Developers", "Pricing"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer transition-opacity hover:opacity-80">
                    {user?.hasImage ? (
                      <AvatarImage
                        src={user.imageUrl}
                        alt={`${user.firstName}'s profile`}
                      />
                    ) : (
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Default profile"
                      />
                    )}
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {user?.firstName?.charAt(0) || "CN"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent
                  className="w-64 p-4 mt-2 shadow-lg rounded-lg border-border"
                  align="end"
                  sideOffset={8}
                >
                  {/* User Info Header */}
                  <div className="p-4 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {user?.hasImage ? (
                          <AvatarImage
                            src={user.imageUrl}
                            alt={user.firstName || "User"}
                          />
                        ) : (
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="Profile"
                          />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {user?.firstName?.charAt(0) || "CN"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {user?.firstName || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.emailAddresses[0].emailAddress ||
                            "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors w-full"
                    >
                      <User className="h-4 w-4" />
                      View Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors w-full"
                    >
                      {/*<Setting07Icon/>*/}
                      <Settings width={20} height={20} />
                      Settings
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="px-3 py-1">
                    <div className="h-px bg-border" />
                  </div>

                  {/* Logout - Danger Action */}
                  <div className="p-1">
                    <form method="post">
                      <Button
                        variant={"secondary"}
                        type="submit"
                        className="w-full gap-2 cursor-pointer transition-colors"
                        aria-label="Log out of your account"
                      >
                        <LogOut width={20} height={20} />
                        Log Out
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Button variant="ghost" className="hidden sm:inline-flex">
                  <Link href={"/sign-in"}> Log In</Link>
                </Button>
                <Button variant="secondary" size="lg">
                  <Link href={"/sign-up"}> Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};
