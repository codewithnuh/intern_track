"use client";

import { deleteDepartmentAction } from "@/actions/department.action";

export default function TestPage() {
  async function test() {
    const formData = new FormData();
    formData.append("id", "b3e26d08-3dc6-41f9-8104-696868095682");
    // formData.append("name", "Updated NAME");

    const res = await deleteDepartmentAction(formData);
    console.log(res);
  }

  return <button onClick={test}>Test Create Department</button>;
}
