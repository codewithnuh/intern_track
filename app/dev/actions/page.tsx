"use client";

import { createDepartmentAction } from "@/actions/department.action";

export default function TestPage() {
  async function test() {
    const formData = new FormData();
    formData.append("name", "Updated NAME");

    const res = await createDepartmentAction(formData);
    console.log(res);
  }

  return (
    <div className="mt-20">
      <button onClick={test}>Test Create Department</button>;
    </div>
  );
}
