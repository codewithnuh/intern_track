import {
  UserFull as User,
  TaskFull as Task,
  AttendanceFull as Attendance,
  InternFull as Intern,
  LeaveRequestFull as LeaveRequest,
  MentorFull as Mentor,
  FeedbackFull as Feedback,
  ProjectFull as Project,
  DepartmentFull as Department,
} from "@/schemas/user.schema";

export const policies = {
  Intern: (user: User, intern: Intern) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "MENTOR") return intern.mentorId === user.id;
    if (user.role === "INTERN") return intern.id === user.id;
    return false;
  },
  Task: (user: User, task: Task) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "MENTOR") {
      return !!(
        user.mentor && user.mentor.departmentId === task.project.departmentId
      );
    }
    return false;
  },
  Attendance: (user: User, attendance: Attendance) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "INTERN") return attendance.internId === user.id;
    if (user.role === "MENTOR") return attendance.intern.mentorId === user.id;
    return false;
  },
  LeaveRequest: (user: User, leave: LeaveRequest) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "MENTOR") return leave.intern.mentorId === user.id;
    if (user.role === "INTERN") return leave.internId === user.id;
    return false;
  },
  Mentor: (user: User, mentor: Mentor) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "MENTOR") return mentor.id === user.id;
    return false;
  },
  Feedback: (user: User, feedback: Feedback) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "MENTOR") return feedback.intern.mentorId === user.id;
    if (user.role === "INTERN") return feedback.internId === user.id;
    return false;
  },
  Project: (user: User, project: Project) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "MENTOR")
      return project.departmentId === user.mentor?.departmentId;
    return false;
  },
  Department: (user: User, department: Department) => {
    if (user.role === "ADMIN") return true;
    if (user.role === "MENTOR")
      return department.id === user.mentor?.departmentId;
    return false;
  },
};
