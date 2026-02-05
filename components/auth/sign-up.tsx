"use client";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent } from "@/components/ui/card";
import { useSignUp } from "@clerk/nextjs";
import { AuthError } from "@/types/auth";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { OTPForm } from "../otp-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your toast library
import { handleAuthError } from "@/utils/auth-error-handler";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(255),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(255),
  email: z.email({ message: "Please enter a valid email." }).max(255),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(255),
});

type SignupFormSchema = z.infer<typeof formSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const { isLoaded, setActive, signUp } = useSignUp();

  // Handle signup
  const onSignup = async (value: SignupFormSchema) => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      await signUp.create({
        firstName: value.firstName,
        lastName: value.lastName,
        emailAddress: value.email,
        password: value.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
      toast.success("Verification code sent to your email!");
    } catch (err) {
      const { message } = handleAuthError(err);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const onVerify = async (code: string) => {
    if (!isLoaded) return;
    setIsLoading(true);
    setAuthError(null); // Clear previous errors

    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt?.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        toast.success("Account created successfully!");
        router.push("/dashboard");
      } else {
        // Fallback for unexpected statuses
        setAuthError({ message: "Verification failed. Please try again." });
      }
    } catch (err) {
      const { message } = handleAuthError(err);
      // Extract clerk code if available
      const code = isClerkAPIResponseError(err)
        ? err.errors[0]?.code
        : undefined;
      setAuthError({ message, code });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resending code
  const onResendCode = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      toast.success("New verification code sent!");
    } catch (err) {
      const { message } = handleAuthError(err);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }: { value: SignupFormSchema }) => {
      await onSignup(value);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {verifying ? (
        <OTPForm
          onVerify={onVerify}
          onResend={onResendCode}
          isLoading={isLoading}
          error={authError}
          onBack={() => setVerifying(false)}
        />
      ) : (
        <Card className="overflow-hidden p-0 bg-muted/60 backdrop:blur-2xl shadow-md">
          <CardContent className="p-0">
            <form
              id="sign-up"
              className="p-6 md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">
                    Create your InternTrack account
                  </h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to create your account
                  </p>
                </div>

                {error && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}

                {/* First Name & Last Name Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <form.Field name="firstName">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor="firstName">
                            First Name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="John"
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
                  <form.Field name="lastName">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                          <Input
                            id={field.name}
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Doe"
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
                </div>

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
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          type="password"
                          disabled={isLoading}
                          required
                        />
                        <FieldDescription>
                          Must be at least 8 characters long.
                        </FieldDescription>
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
                    variant={"default"}
                    className="w-full cursor-pointer"
                    form="sign-up"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="/sign-in" className="underline underline-offset-4">
                    Sign in
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}
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
