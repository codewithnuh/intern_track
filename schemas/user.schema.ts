import { z } from "zod";

// ============================================================================
// 1. ENUMS (mirroring Prisma enums)
// ============================================================================
export const Role = z.enum(["INTERN", "ADMIN"]);
export type Role = z.infer<typeof Role>;

export const Status = z.enum([
  "PENDING_ONBOARDING",
  "PENDING_APPROVAL",
  "ACTIVE",
  "DISAPPROVED",
]);
export type Status = z.infer<typeof Status>;

// ============================================================================
// 2. DATABASE SCHEMA (exact Prisma model representation)
// Use this when validating Prisma query results or for type-safe DB operations
// ============================================================================
export const UserSchema = z.object({
  id: z.uuid(),
  clerkId: z.uuid(),
  email: z.email(),
  name: z.string(),
  role: Role,
  status: Status,
  createdAt: z.date(),
  updatedAt: z.date(),
  disapprovedAt: z.date().nullable(),
  university: z.string().nullable(),
  major: z.string().nullable(),
  skills: z.array(z.string()), // Required array (can be empty)
  resumeUrl: z.url().nullable(),
  portfolioUrl: z.url().nullable(),
  department: z.string().nullable(),
  startDate: z.date().nullable(),
});

// ============================================================================
// 3. API INPUT SCHEMAS (for route validation)
// JSON doesn't support Date objects, so we use coercion or string validation
// ============================================================================

// For POST /users - Create new user
export const CreateUserSchema = z.object({
  email: z.email("Invalid email format"),
  name: z.string().min(1).max(100).optional().default(""),
  clerkId: z.uuid().optional(), // Has @default in DB
  role: Role.optional().default("INTERN"),
  status: Status.optional().default("PENDING_ONBOARDING"),
  university: z.string().max(100).optional(),
  major: z.string().max(100).optional(),
  skills: z.array(z.string().max(50)).max(20).default([]), // Max 20 skills, 50 chars each
  resumeUrl: z.url().optional(),
  portfolioUrl: z.url().optional(),
  department: z.string().max(50).optional(),
  startDate: z.coerce.date().optional(), // Accepts ISO 8601 strings
});

// For PATCH /users/:id - Partial updates
export const UpdateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  role: Role.optional(),
  status: Status.optional(),
  university: z.string().max(100).nullable().optional(),
  major: z.string().max(100).nullable().optional(),
  skills: z.array(z.string().max(50)).max(20).optional(),
  resumeUrl: z.url().nullable().optional(),
  portfolioUrl: z.url().nullable().optional(),
  department: z.string().max(50).nullable().optional(),
  startDate: z.coerce.date().nullable().optional(),
  disapprovedAt: z.coerce.date().nullable().optional(), // Set when status becomes DISAPPROVED
});

// ============================================================================
// 4. STRICT API SCHEMA (if you prefer string timestamps over coercion)
// ============================================================================
export const CreateUserApiSchema = z.object({
  email: z.email(),
  name: z.string().optional(),
  clerkId: z.uuid().optional(),
  role: Role.optional(),
  status: Status.optional(),
  skills: z.array(z.string()).optional(),
  resumeUrl: z.url().optional(),
  portfolioUrl: z.url().optional(),
  startDate: z.iso.datetime().optional(), // ISO 8601 strict
});

// ============================================================================
// 5. BUSINESS LOGIC SCHEMAS (specific workflow validations)
// ============================================================================

// Specific transition for approval workflow
export const ApproveUserSchema = z.object({
  status: z.literal("ACTIVE"),
  department: z.string().min(1), // Required when approving
  startDate: z.coerce.date(),
});

// Specific transition for rejection
export const DisapproveUserSchema = z.object({
  status: z.literal("DISAPPROVED"),
  disapprovedAt: z.coerce.date().default(() => new Date()),
});

// ============================================================================
// 6. TYPE EXPORTS
// ============================================================================
export type User = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

// Prisma-compatible types (if you need exact matches)
export type UserCreateInput = z.infer<typeof CreateUserSchema>;
export type UserUpdateInput = z.infer<typeof UpdateUserSchema>;
