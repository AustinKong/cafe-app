import { z } from 'zod';

const ID_VALIDATOR = z.string().regex(/^UI[A-Za-z0-9]{7}$/, "ID must be in format UIXXXXXXX where X is alphanumeric");
const PHONE_VALIDATOR = z.string().regex(/^[89]\d{7}$/, "Phone number must be 8 digits starting with 8 or 9");

const EMPLOYEE_BODY_VALIDATOR = z.object({
  name: z.string().min(6, "Name must be 6-10 characters").max(10, "Name must be 6-10 characters"),
  emailAddress: z.email(),
  phoneNumber: PHONE_VALIDATOR,
  gender: z.enum(['Male', 'Female']),
  startDate: z.string().transform(str => new Date(str)),
  cafeId: z.uuid()
});

export const getEmployeesSchema = {
  query: z.object({
    cafe: z.string().optional(),
  })
}

export const createEmployeeSchema = {
  body: z.object({
    id: ID_VALIDATOR,
    ...EMPLOYEE_BODY_VALIDATOR.shape
  })
}

export const updateEmployeeSchema = {
  params: z.object({
    id: ID_VALIDATOR,
  }),
  body: EMPLOYEE_BODY_VALIDATOR
}

export const deleteEmployeeSchema = {
  params: z.object({
    id: ID_VALIDATOR,
  })
}

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema.body>;
export type UpdateEmployeeDto = z.infer<typeof updateEmployeeSchema.body>;
export type GetEmployeesQuery = z.infer<typeof getEmployeesSchema.query>;
