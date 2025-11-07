import { extractTypedLocals, Request, Response } from "../middleware/validateRequest";
import { getAllEmployees, getEmployeesByCafeName, createEmployee as createEmployeeService, updateEmployee as updateEmployeeService, deleteEmployee as deleteEmployeeService, getEmployeeById as getEmployeeByIdService } from "../services/employeeService";
import { getEmployeesSchema, createEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema, getEmployeeSchema, GetEmployeesResponse, GetEmployeeResponse, CreateEmployeeResponse, UpdateEmployeeResponse } from "@cafe-app/shared-types"
import ApiError from "../utils/apiError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const MS_DAY = 1000 * 60 * 60 * 24;

export async function getEmployees(req: Request, res: Response) {
  try {
    const { query } = extractTypedLocals(res, getEmployeesSchema);
    const { cafe } = query;

    let employees;
    if (cafe) {
      employees = await getEmployeesByCafeName(cafe);
    } else {
      employees = await getAllEmployees();
    }

    const now = new Date();
    const response: GetEmployeesResponse = employees.map((employee) => {
      const startDate = new Date(employee.startDate);
      const daysWorked = Math.floor((now.getTime() - startDate.getTime()) / MS_DAY);

      return {
        ...employee,
        daysWorked,
        cafe: employee.cafe.name,
      };
    });

    return res.json(response);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new ApiError(500, "Database error occurred");
    }
    throw error;
  }
};

export async function createEmployee(req: Request, res: Response) {
  try {
    const { body } = extractTypedLocals(res, createEmployeeSchema);

    const newEmployee = await createEmployeeService(body);

    const response: CreateEmployeeResponse = {
      id: newEmployee.id,
      name: newEmployee.name,
      emailAddress: newEmployee.emailAddress,
      phoneNumber: newEmployee.phoneNumber,
      gender: newEmployee.gender,
      startDate: newEmployee.startDate.toISOString(),
      cafeId: newEmployee.cafeId
    };

    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = (error.meta as any)?.target;
        if (Array.isArray(target) && target.includes('emailAddress')) {
          throw new ApiError(409, "An employee with this email address already exists");
        }
        if (Array.isArray(target) && target.includes('id')) {
          throw new ApiError(409, "An employee with this ID already exists");
        }
        throw new ApiError(409, "A unique constraint violation occurred");
      }
      if (error.code === 'P2003') {
        throw new ApiError(400, "Invalid cafe ID provided");
      }
      throw new ApiError(500, "Database error occurred");
    }
    throw error;
  }
};

export async function getEmployeeById(req: Request, res: Response) {
  try {
    const { params } = extractTypedLocals(res, getEmployeeSchema);
    const { id } = params;

    const employee = await getEmployeeByIdService(id);

    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    const response: GetEmployeeResponse = {
      id: employee.id,
      name: employee.name,
      emailAddress: employee.emailAddress,
      phoneNumber: employee.phoneNumber,
      gender: employee.gender,
      startDate: employee.startDate.toISOString(),
      cafeId: employee.cafe.id
    };

    return res.json(response);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new ApiError(500, "Database error occurred");
    }
    throw error;
  }
};

export async function updateEmployee(req: Request, res: Response) {
  try {
    const { params, body } = extractTypedLocals(res, updateEmployeeSchema);
    const { id } = params;

    const updatedEmployee = await updateEmployeeService(id, body);

    const response: UpdateEmployeeResponse = {
      id: updatedEmployee.id,
      name: updatedEmployee.name,
      emailAddress: updatedEmployee.emailAddress,
      phoneNumber: updatedEmployee.phoneNumber,
      gender: updatedEmployee.gender,
      startDate: updatedEmployee.startDate.toISOString(),
      cafeId: updatedEmployee.cafeId
    };

    return res.json(response);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = (error.meta as any)?.target;
        if (Array.isArray(target) && target.includes('emailAddress')) {
          throw new ApiError(409, "An employee with this email address already exists");
        }
        if (Array.isArray(target) && target.includes('id')) {
          throw new ApiError(409, "An employee with this ID already exists");
        }
        throw new ApiError(409, "A unique constraint violation occurred");
      }
      if (error.code === 'P2003') {
        throw new ApiError(400, "Invalid cafe ID provided");
      }
      if (error.code === 'P2025') {
        throw new ApiError(404, "Employee not found");
      }
      throw new ApiError(500, "Database error occurred");
    }
    throw error;
  }
};

export async function deleteEmployee(req: Request, res: Response) {
  try {
    const { params } = extractTypedLocals(res, deleteEmployeeSchema);
    const { id } = params;

    await deleteEmployeeService(id);

    return res.status(204).send();
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new ApiError(404, "Employee not found");
      }
      throw new ApiError(500, "Database error occurred");
    }
    throw error;
  }
};