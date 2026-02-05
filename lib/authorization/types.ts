export type Action =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "approve"
  | "manage";

export type Resources =
  | "Intern"
  | "Mentor"
  | "Task"
  | "Project"
  | "Attendace"
  | "LeaveRequest"
  | "Feedback";
export type Permission = `${Action}:${Resources}` | "*";
