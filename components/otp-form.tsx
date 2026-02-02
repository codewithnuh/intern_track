"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthError } from "@/types/auth";
import { useState } from "react";
// import type { AuthError } from "@/types/auth";

interface OTPFormProps extends React.ComponentProps<typeof Card> {
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
  error?: AuthError | null;
  onBack?: () => void;
}

export function OTPForm({
  onVerify,
  onResend,
  isLoading = false,
  error,
  onBack,
  ...props
}: OTPFormProps) {
  const [code, setCode] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      await onVerify(code);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    await onResend();
    setIsResending(false);
    setCode("");
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                {error.message}
                {error.code && (
                  <span className="block text-xs mt-1 opacity-70">
                    Error code: {error.code}
                  </span>
                )}
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <InputOTP
                maxLength={6}
                id="otp"
                value={code}
                onChange={(value) => setCode(value)}
                disabled={isLoading}
                required
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} autoFocus />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Button
                type="submit"
                disabled={isLoading || code.length !== 6}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>

              {onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={isLoading}
                  className="w-full"
                >
                  Back to Sign Up
                </Button>
              )}

              <FieldDescription className="text-center">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending || isLoading}
                  className="underline hover:text-primary disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend"}
                </button>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
