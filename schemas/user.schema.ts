import { z } from "zod";

// ==========================================
// 1. ENUMS (Mirrors Prisma Enums)
// ==========================================
export const RoleEnum = z.enum(["INTERN", "ADMIN", "MENTOR", "HR"]);

// Handles the HR User Review Workflow
export const UserStatusEnum = z.enum([
  "PENDING_ONBOARDING",
  "PENDING_APPROVAL",
  "ACTIVE",
  "REJECTED",
  "SUSPENDED",
]);

// Handles Request-based Workflows (Leave, etc.)
export const ApprovalStatusEnum = z.enum(["PENDING", "APPROVED", "REJECTED"]);

export const TaskStatusEnum = z.enum([
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
]);

// ==========================================
// 2. CORE IDENTITY (User Model)
// ==========================================
export const UserSchema = z.object({
  id: z.uuid(),
  clerkId: z.string(), // Clerk IDs are strings, not UUIDs
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  role: RoleEnum.default("INTERN"),
  status: UserStatusEnum.default("PENDING_ONBOARDING"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ==========================================
// 3. SPECIALIZED PROFILES
// ==========================================
export const InternProfileSchema = z.object({
  id: z.string().uuid(), // user_id
  university: z.string().min(2, "University name is required"),
  mentorId: z.string().uuid().nullable().optional(),
});

export const MentorProfileSchema = z.object({
  id: z.string().uuid(), // user_id
  departmentId: z.string().uuid(),
});

// ==========================================
// 4. FUNCTIONAL SCHEMAS (Server Action Inputs)
// ==========================================

// Intern Onboarding Form
export const InternOnboardingSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  university: z.string().min(2, "University is required"),
});

// Leave Request Form
export const CreateLeaveRequestSchema = z
  .object({
    internId: z.uuid(),
    startDate: z.coerce.date({ error: "Start date is required" }),
    endDate: z.coerce.date({ error: "End date is required" }),
    reason: z.string().min(5, "Please provide a valid reason"),
    status: ApprovalStatusEnum.default("PENDING"),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be before start date",
    path: ["endDate"],
  });

// HR Review Action
export const UserReviewSchema = z.object({
  userId: z.uuid(),
  status: z.enum(["ACTIVE", "REJECTED"]), // HR only picks these two
});

// Task Creation
export const CreateTaskSchema = z.object({
  title: z.string().min(3, "Title too short"),
  projectId: z.uuid(),
  assigneeId: z.uuid(),
  status: TaskStatusEnum.default("TODO"),
});

// Feedback
export const FeedbackSchema = z.object({
  content: z.string().min(10, "Feedback must be more detailed"),
  rating: z.number().int().min(1).max(5),
  internId: z.uuid(),
  reviewerId: z.uuid(),
});

// ==========================================
// 5. TYPES
// ==========================================
export type User = z.infer<typeof UserSchema>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
export type ApprovalStatus = z.infer<typeof ApprovalStatusEnum>;
export type InternProfile = z.infer<typeof InternProfileSchema>;
export type LeaveRequestInput = z.infer<typeof CreateLeaveRequestSchema>;
export type Role = z.infer<typeof RoleEnum>;
