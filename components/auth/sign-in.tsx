"use client";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent } from "@/components/ui/card";
import { useSignIn } from "@clerk/nextjs";
import { handleAuthError } from "@/utils/auth-error-handler";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { OTPForm } from "../otp-form";
import { AuthError } from "@/types/auth";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).max(255),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(255),
});

type SignInFormSchema = z.infer<typeof formSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const { isLoaded, setActive, signIn } = useSignIn();
  const [show2FA, setShow2FA] = useState(false);
  // Handle sign in
  const onSignIn = async (value: SignInFormSchema) => {
    if (!isLoaded) return;

    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn.create({
        identifier: value.email,
        password: value.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Welcome back!");
        router.push("/dashboard");
      } else if (result.status == "needs_second_factor") {
        await signIn.prepareSecondFactor({ strategy: "email_code" });
        setShow2FA(true);
        toast.info("Please check your email for a verification code.");
      } else {
        // Handle other statuses if needed (e.g., needs 2FA)
        console.log("Sign in status:", result.status);
        setAuthError({
          message: "Unable to complete sign in. Please try again.",
        });
      }
    } catch (err) {
      const { message } = handleAuthError(err);
      setAuthError({ message });
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  const onVerify2FA = async (code: string) => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code: code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err) {
      const { message } = handleAuthError(err);
      setAuthError({ message });
    } finally {
      setIsLoading(false);
    }
  };
  const onResendCode = async () => {
    if (!isLoaded) return;
    try {
      await signIn.prepareSecondFactor({ strategy: "email_code" });
      toast.info("A new code has been sent.");
    } catch (err) {
      if (err instanceof Error) {
        setAuthError({ message: err.message });
      } else {
        setAuthError({ message: "Failed to resend code." });
      }
      toast.error(authError?.message);
    }
  };
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }: { value: SignInFormSchema }) => {
      await onSignIn(value);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden bg-muted/60 backdrop:blur-md p-0">
        <CardContent className="p-0">
          {show2FA ? (
            <OTPForm
              onVerify={onVerify2FA}
              onResend={onResendCode}
              isLoading={isLoading}
              error={authError} // Ensure this matches the AuthError type
              onBack={() => setShow2FA(false)}
              className="border-none shadow-none bg-transparent" // Style it to fit in your card
            />
          ) : (
            <form
              id="sign-in"
              className="p-6 md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Sign in to InternTrack</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your credentials to access your account
                  </p>
                </div>

                {authError && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {authError.message}
                  </div>
                )}

                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          type="email"
                          placeholder="m@example.com"
                          disabled={isLoading}
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="password">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex items-center justify-between">
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                          <Link
                            href="/forgot-password"
                            className="text-sm underline-offset-4 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          type="password"
                          disabled={isLoading}
                          required
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <Field>
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    form="sign-in"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our{" "}
        <a href="/terms" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
