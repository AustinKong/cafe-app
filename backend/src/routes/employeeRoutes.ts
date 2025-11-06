import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { getEmployeesSchema, createEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema, getEmployeeSchema } from "@cafe-app/shared-types";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } from '../controllers/employeeController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.get("/", validateRequest(getEmployeesSchema), asyncHandler(getEmployees));
router.get("/:id", validateRequest(getEmployeeSchema), asyncHandler(getEmployeeById));
router.post("/", validateRequest(createEmployeeSchema), asyncHandler(createEmployee));
router.put("/:id", validateRequest(updateEmployeeSchema), asyncHandler(updateEmployee));
router.delete("/:id", validateRequest(deleteEmployeeSchema), asyncHandler(deleteEmployee));

export default router;