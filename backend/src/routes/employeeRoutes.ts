import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { getEmployeesSchema, createEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema } from "@cafe-app/shared-types";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.get("/", validateRequest(getEmployeesSchema), asyncHandler(getEmployees));
router.post("/", validateRequest(createEmployeeSchema), asyncHandler(createEmployee));
router.put("/:id", validateRequest(updateEmployeeSchema), asyncHandler(updateEmployee));
router.delete("/:id", validateRequest(deleteEmployeeSchema), asyncHandler(deleteEmployee));

export default router;