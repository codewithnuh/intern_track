export type Action =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "approve"
  | "manage";

export type Resource =
  | "Intern"
  | "Mentor"
  | "Task"
  | "Project"
  | "Attendance"
  | "LeaveRequest"
  | "Feedback"
  | "Department";
export type Permission = `${Action}:${Resource}` | "*";
