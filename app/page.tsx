"use client";
import { createDepartmentAction } from "@/actions/department.action";
import { useActionState } from "react";
import { ActionResponse } from "@/types/action-types";
import { Button } from "@/components/ui/button";
export default function Page() {
  const [state, formAction, isPending] = useActionState(
    async (
      prevState: ActionResponse<
        { id: string; name: string } | undefined
      > | null,
      formData: FormData,
    ) => {
      return createDepartmentAction(formData);
    },
    null,
  );
  return (
    <div>
      <h1>Welcome to Intern Track</h1>
      <p>Start your journey here!</p>
      <form action={formAction}>
        <input type="text" name="name" placeholder="Department Name" required />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Department"}
        </Button>
      </form>
    </div>
  );
}
