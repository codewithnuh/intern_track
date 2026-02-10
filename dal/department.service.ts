import { Department } from "@/schemas/user.schema";
import db from "@/lib/db";
import { ServiceError } from "./user.service";
import { ErrorCodes } from "@/types/action-types";

export const DepartmentService = {
  async create(data: Department) {
    try {
      const department = await db.department.create({
        data,
      });
      return department;
    } catch (error) {
      console.error(error);
      throw new ServiceError(
        ErrorCodes.INTERNAL_ERROR,
        "Failed to create department",
      );
    }
  },
  async update(id: string, data: Department) {
    try {
      const isDepartmentExist = await db.department.findFirst({
        where: {
          id,
        },
      });
      if (!isDepartmentExist)
        throw new Error("No department found with this id");
      const department = await db.department.update({
        where: {
          id,
        },
        data: data,
      });
      return department;
    } catch (error) {
      if (error instanceof Error) {
        throw new ServiceError(
          ErrorCodes.NOT_FOUND,
          "Failed to update department",
        );
      }
    }
  },
  async getDepartment(id: string) {
    try {
      const dept = await db.department.findFirst({
        where: {
          id,
        },
      });
      if (!dept) throw new Error("No Department Found");
      return dept;
    } catch (error) {
      if (error)
        throw new ServiceError(
          ErrorCodes.INTERNAL_ERROR,
          "Failed to retrieve department",
        );
    }
  },
  async getDepartments() {
    try {
      const departments = await db.department.findMany();
      if (!departments) throw new Error("No departments Found");
      return departments;
    } catch (error) {
      if (error)
        throw new ServiceError(
          ErrorCodes.INTERNAL_ERROR,
          "Failed to retireve Departments ",
        );
    }
  },
  async deleteDepartment(id: string) {
    try {
      return await db.department.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new ServiceError(ErrorCodes.NOT_FOUND, "Department not found");
      }

      throw new ServiceError(
        ErrorCodes.INTERNAL_ERROR,
        "Failed to delete department",
      );
    }
  },
};
