"use client";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent } from "@/components/ui/card";
import { useSignUp } from "@clerk/nextjs";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { OTPForm } from "./otp-form";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(255),
  lastName: z.string().min(2).max(255),
  email: z.email().min(2).max(255),
  password: z.string().min(8).max(255),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [verifying, setVerifying] = useState(false);
  const { isLoaded, setActive, signUp } = useSignUp();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
      onBlur: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      await signUp?.create({
        firstName: value.firstName,
        lastName: value.lastName,
        emailAddress: value.email,
        password: value.password,
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerifying(true);
      console.log("Verification started");
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {verifying ? (
        <OTPForm />
      ) : (
        <Card className="overflow-hidden p-0">
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
                    className="w-full cursor-pointer"
                    form="sign-up"
                  >
                    Create Account
                  </Button>
                </Field>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-4 mr-2"
                    >
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Apple
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-4 mr-2"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign in
                  </a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
