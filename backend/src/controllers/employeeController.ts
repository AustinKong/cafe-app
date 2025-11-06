import { extractTypedLocals, Request, Response } from "../middleware/validateRequest";
import { getAllEmployees, getEmployeesByCafeName, createEmployee as createEmployeeService, updateEmployee as updateEmployeeService, deleteEmployee as deleteEmployeeService } from "../services/employeeService";
import { getEmployeesSchema, createEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema, EmployeeListItem } from "@cafe-app/shared-types"

const MS_DAY = 1000 * 60 * 60 * 24;

export async function getEmployees(req: Request, res: Response) {
  const { query } = extractTypedLocals(res, getEmployeesSchema);
  const { cafe } = query;

  let employees;
  if (cafe) {
    employees = await getEmployeesByCafeName(cafe);
  } else {
    employees = await getAllEmployees();
  }

  const now = new Date();
  const response: EmployeeListItem[] = employees.map((employee) => {
    const startDate = new Date(employee.startDate);
    const daysWorked = Math.floor((now.getTime() - startDate.getTime()) / MS_DAY);

    return {
      id: employee.id,
      name: employee.name,
      email_address: employee.emailAddress,
      phone_number: employee.phoneNumber,
      days_worked: daysWorked,
      cafe: employee.cafe?.name || '',
    };
  });

  return res.json(response);
};

export async function createEmployee(req: Request, res: Response) {
  const { body } = extractTypedLocals(res, createEmployeeSchema);

  const newEmployee = await createEmployeeService(body);

  return res.status(201).json(newEmployee);
};

export async function updateEmployee(req: Request, res: Response) {
  const { params, body } = extractTypedLocals(res, updateEmployeeSchema);
  const { id } = params;

  const updatedEmployee = await updateEmployeeService(id, body);

  return res.json(updatedEmployee);
};

export async function deleteEmployee(req: Request, res: Response) {
  const { params } = extractTypedLocals(res, deleteEmployeeSchema);
  const { id } = params;

  await deleteEmployeeService(id);

  return res.status(204).send();
};