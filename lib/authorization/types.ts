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
  | "Attendace"
  | "LeaveRequest"
  | "Feedback";
export type Permission = `${Action}:${Resource}` | "*";
