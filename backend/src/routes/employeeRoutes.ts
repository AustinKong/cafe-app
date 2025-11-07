import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import {
  getEmployeesSchema,
  createEmployeeSchema,
  updateEmployeeSchema,
  deleteEmployeeSchema,
  getEmployeeSchema,
} from "@cafe-app/shared-types";
import { EmployeeController } from "../controllers/employeeController";
import asyncHandler from "../utils/asyncHandler";

export function createEmployeeRouter(employeeController: EmployeeController) {
  const router = Router();

  router.get(
    "/",
    validateRequest(getEmployeesSchema),
    asyncHandler(employeeController.getEmployees.bind(employeeController))
  );
  router.get(
    "/:id",
    validateRequest(getEmployeeSchema),
    asyncHandler(employeeController.getEmployeeById.bind(employeeController))
  );
  router.post(
    "/",
    validateRequest(createEmployeeSchema),
    asyncHandler(employeeController.createEmployee.bind(employeeController))
  );
  router.put(
    "/:id",
    validateRequest(updateEmployeeSchema),
    asyncHandler(employeeController.updateEmployee.bind(employeeController))
  );
  router.delete(
    "/:id",
    validateRequest(deleteEmployeeSchema),
    asyncHandler(employeeController.deleteEmployee.bind(employeeController))
  );

  return router;
}
