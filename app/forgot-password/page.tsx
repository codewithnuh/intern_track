"use client";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import Link from "next/link";
import { OTPForm } from "@/components/otp-form";
import { useRouter } from "next/navigation";
import { AuthError } from "@/types/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [verifiedOTP, setVerifiedOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const { isLoaded, setActive, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onVerify = async (code: string) => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      const attempt = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });

      if (attempt?.status === "needs_new_password") {
        setVerifiedOTP(true);
        toast.success("Code verified! Please set your new password.");
      } else {
        setError({ message: "Verification failed. Please try again." });
        toast.error("Invalid verification code");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError({
          message: err.errors?.[0]?.message || "Verification failed.",
        });
        toast.error(err.errors?.[0]?.message || "Verification failed");
      } else {
        setError({ message: "Verification failed." });
        toast.error("Verification failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onResendCode = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      toast.success("New verification code sent!");
    } catch (error) {
      if (isClerkAPIResponseError(error)) toast.error(error.message);
      else
        setError({
          message: "An unexpected error occurred. Please try again later.",
        });
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setEmailSent(true);
      toast.success("OTP email sent!");
    } catch (err) {
      if (isClerkAPIResponseError(err))
        toast.error(err.errors?.[0]?.message || "Failed to send reset email");
      else if (err instanceof Error) toast.error(err.message);
      else toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError({ message: "Passwords do not match" });
      toast.error("Passwords do not match");
      return;
    }

    // Validate password length
    if (newPassword.length < 8) {
      setError({ message: "Password must be at least 8 characters" });
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!isLoaded) return;

    setIsLoading(true);

    try {
      const result = await signIn?.resetPassword({
        password: newPassword,
      });

      if (result?.status === "complete") {
        // Set the active session
        await setActive({ session: result.createdSessionId });
        toast.success("Password reset successful!");
        router.push("/dashboard");
      } else {
        setError({ message: "Unable to reset password. Please try again." });
        toast.error("Password reset failed");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError({
          message: err.errors?.[0]?.message || "Failed to reset password",
        });
        toast.error(err.errors?.[0]?.message || "Failed to reset password");
      } else {
        setError({
          message: "An unexpected error occurred. Please try again later.",
        });
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            IT
          </div>
          InternTrack
        </Link>

        {verifiedOTP ? (
          // Reset Password Form
          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleResetPassword}>
                <FieldGroup>
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-bold">Set new password</h1>
                    <p className="text-muted-foreground text-sm">
                      Enter your new password below
                    </p>
                  </div>

                  {error && (
                    <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                      {error.message}
                    </div>
                  )}

                  <Field>
                    <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      disabled={isLoading}
                      required
                      minLength={8}
                    />
                    <FieldDescription>
                      Must be at least 8 characters long
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      disabled={isLoading}
                      required
                      minLength={8}
                    />
                  </Field>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !newPassword || !confirmPassword}
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </Button>

                  <FieldDescription className="text-center">
                    Remember your password?{" "}
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        ) : emailSent ? (
          // OTP Verification Form
          <OTPForm
            onResend={onResendCode}
            onVerify={onVerify}
            isLoading={isLoading}
            error={error}
            onBack={() => {
              setEmailSent(false);
              setError(null);
            }}
          />
        ) : (
          // Email Input Form
          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-bold">Forgot password?</h1>
                    <p className="text-muted-foreground text-sm">
                      Enter your email and we&apos;ll send you a reset code
                    </p>
                  </div>

                  {error && (
                    <FieldError className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                      {error.message}
                    </FieldError>
                  )}

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      disabled={isLoading}
                      required
                    />
                  </Field>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? "Sending..." : "Send reset code"}
                  </Button>

                  <FieldDescription className="text-center">
                    Remember your password?{" "}
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
