import { z } from "zod";

/* =====================================================
   ENUMS
===================================================== */

export const RoleSchema = z.enum(["INTERN", "ADMIN", "MENTOR", "HR"]);
export type Role = z.infer<typeof RoleSchema>;

export const UserStatusSchema = z.enum([
  "PENDING_ONBOARDING",
  "PENDING_APPROVAL",
  "ACTIVE",
  "REJECTED",
  "SUSPENDED",
]);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const ApprovalStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);
export type ApprovalStatus = z.infer<typeof ApprovalStatusSchema>;

export const TaskStatusSchema = z.enum([
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

/* =====================================================
   BASE MODELS (NO RELATIONS)
===================================================== */

export const UserSchema = z.object({
  id: z.string().uuid(),
  clerkId: z.string(),
  name: z.string(),
  email: z.string().email(),

  role: RoleSchema,
  status: UserStatusSchema,

  createdAt: z.date(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof UserSchema>;

export const InternSchema = z.object({
  id: z.string().uuid(),
  university: z.string(),

  mentorId: z.string().uuid().nullable(),

  updatedAt: z.date(),
});
export type Intern = z.infer<typeof InternSchema>;

export const MentorSchema = z.object({
  id: z.string().uuid(),
  departmentId: z.string().uuid(),

  updatedAt: z.date(),
});
export type Mentor = z.infer<typeof MentorSchema>;

export const DepartmentSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
});
export type Department = z.infer<typeof DepartmentSchema>;

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),

  departmentId: z.string().uuid(),

  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const ProjectAssignmentSchema = z.object({
  internId: z.string().uuid(),
  projectId: z.string().uuid(),
  assignedAt: z.date(),
});
export type ProjectAssignment = z.infer<typeof ProjectAssignmentSchema>;

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),

  status: TaskStatusSchema,

  projectId: z.string().uuid(),
  assigneeId: z.string().uuid(),

  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Task = z.infer<typeof TaskSchema>;

export const AttendanceSchema = z.object({
  id: z.string().uuid(),

  checkIn: z.date(),
  checkOut: z.date().nullable(),

  internId: z.string().uuid(),
});
export type Attendance = z.infer<typeof AttendanceSchema>;

export const FeedbackSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),

  rating: z.number().int().min(1).max(5),

  internId: z.string().uuid(),
  reviewerId: z.string().uuid(),

  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Feedback = z.infer<typeof FeedbackSchema>;

export const LeaveRequestSchema = z.object({
  id: z.string().uuid(),

  internId: z.string().uuid(),

  startDate: z.date(),
  endDate: z.date(),

  reason: z.string(),
  status: ApprovalStatusSchema,

  createdAt: z.date(),
  updatedAt: z.date(),
});
export type LeaveRequest = z.infer<typeof LeaveRequestSchema>;

export const AuditLogSchema = z.object({
  id: z.string().uuid(),

  actorId: z.string().uuid(),

  action: z.string(),
  entity: z.string(),
  entityId: z.string(),

  createdAt: z.date(),
});
export type AuditLog = z.infer<typeof AuditLogSchema>;

/* =====================================================
   RELATION TYPES (Declare First)
===================================================== */

export type DepartmentFull = Department & {
  projects: ProjectFull[];
  mentors: MentorFull[];
};

export type MentorFull = Mentor & {
  user: User;
  department: Department;
  interns: InternFull[];
};

export type InternFull = Intern & {
  user: User;
  mentor: MentorFull | null;

  projects: ProjectAssignment[];
  tasks: TaskFull[];

  attendance: Attendance[];
  feedback: Feedback[];
  leaveRequests: LeaveRequest[];
};

export type ProjectFull = Project & {
  department: Department;

  tasks: TaskFull[];
  interns: ProjectAssignment[];
};

export type TaskFull = Task & {
  project: Project & {
    department: Department;
  };

  assignee: Intern & {
    user: User;
  };
};

export type FeedbackFull = Feedback & {
  intern: Intern;
  reviewer: User;
};

export type LeaveRequestFull = LeaveRequest & {
  intern: Intern;
};

export type AuditLogFull = AuditLog & {
  actor: User;
};

export type UserFull = User & {
  intern: InternFull | null;
  mentor: MentorFull | null;

  auditLogs: AuditLog[];
  feedbacksGiven: Feedback[];
};
export type AttendanceFull = Attendance & {
  intern: Intern;
};
/* =====================================================
   RELATION SCHEMAS (Fully Typed)
===================================================== */

export const DepartmentFullSchema: z.ZodType<DepartmentFull> = z.lazy(() =>
  DepartmentSchema.extend({
    projects: z.array(ProjectFullSchema),
    mentors: z.array(MentorFullSchema),
  }),
);

export const MentorFullSchema: z.ZodType<MentorFull> = z.lazy(() =>
  MentorSchema.extend({
    user: UserSchema,
    department: DepartmentSchema,
    interns: z.array(InternFullSchema),
  }),
);

export const InternFullSchema: z.ZodType<InternFull> = z.lazy(() =>
  InternSchema.extend({
    user: UserSchema,
    mentor: MentorFullSchema.nullable(),

    projects: z.array(ProjectAssignmentSchema),
    tasks: z.array(TaskFullSchema),

    attendance: z.array(AttendanceSchema),
    feedback: z.array(FeedbackSchema),
    leaveRequests: z.array(LeaveRequestSchema),
  }),
);

export const ProjectFullSchema: z.ZodType<ProjectFull> = z.lazy(() =>
  ProjectSchema.extend({
    department: DepartmentSchema,
    tasks: z.array(TaskFullSchema),
    interns: z.array(ProjectAssignmentSchema),
  }),
);

export const TaskFullSchema: z.ZodType<TaskFull> = z.lazy(() =>
  TaskSchema.extend({
    project: ProjectSchema.extend({
      department: DepartmentSchema,
    }),

    assignee: InternSchema.extend({
      user: UserSchema,
    }),
  }),
);

export const FeedbackFullSchema: z.ZodType<FeedbackFull> = z.lazy(() =>
  FeedbackSchema.extend({
    intern: InternSchema,
    reviewer: UserSchema,
  }),
);

export const LeaveRequestFullSchema: z.ZodType<LeaveRequestFull> = z.lazy(() =>
  LeaveRequestSchema.extend({
    intern: InternSchema,
  }),
);

export const AuditLogFullSchema: z.ZodType<AuditLogFull> = z.lazy(() =>
  AuditLogSchema.extend({
    actor: UserSchema,
  }),
);

export const UserFullSchema: z.ZodType<UserFull> = z.lazy(() =>
  UserSchema.extend({
    intern: InternFullSchema.nullable(),
    mentor: MentorFullSchema.nullable(),

    auditLogs: z.array(AuditLogSchema),
    feedbacksGiven: z.array(FeedbackSchema),
  }),
);

export type ResourceDataMap = {
  Task: TaskFull; // Including relations
  // Project: Project;
  Intern: Intern;
  LeaveRequest: LeaveRequest;
  Attendance: AttendanceFull; // Add specific types as you build them
};
