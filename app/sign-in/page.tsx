import { SignInForm } from "@/components/auth/sign-in";

export default function SignInPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            IT
          </div>
          InternTrack
        </a>
        <SignInForm />
      </div>
    </div>
  );
}
