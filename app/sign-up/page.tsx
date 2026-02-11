import { SignupForm } from "@/components/auth/sign-up";
import { Clipboard } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh my-20 flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Link href={"/"}>
              <Clipboard />
            </Link>
          </div>
          <p className="text-primary-foreground font-extrabold text-2xl">
            InternTrack
          </p>
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
