import type { CreateEmployeeRequestBody, GetEmployeesRequestQuery, GetEmployeesResponse, GetEmployeeResponse, CreateEmployeeResponse, UpdateEmployeeResponse } from '@cafe-app/shared-types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function fetchEmployees(query: GetEmployeesRequestQuery): Promise<GetEmployeesResponse> {
  const url = new URL(`${BASE_URL}/employees`);
  if (query.cafe) {
    url.searchParams.append('cafe', query.cafe);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }

  return response.json() as Promise<GetEmployeesResponse>;
}

export async function deleteEmployee(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }
}

export async function fetchEmployeeById(id: string): Promise<GetEmployeeResponse> {
  const response = await fetch(`${BASE_URL}/employees/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch employee');
  }

  return response.json() as Promise<GetEmployeeResponse>;
}

export async function createEmployee(employee: CreateEmployeeRequestBody): Promise<CreateEmployeeResponse> {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error('Failed to create employee');
  }

  return response.json() as Promise<CreateEmployeeResponse>;
}

export async function updateEmployee(id: string, employee: CreateEmployeeRequestBody): Promise<UpdateEmployeeResponse> {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error('Failed to update employee');
  }

  return response.json() as Promise<UpdateEmployeeResponse>;
}
