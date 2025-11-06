import type { EmployeeListItem, GetEmployeesQuery } from '@cafe-app/shared-types';

const BASE_URL = 'http://localhost:5000/api';

export async function fetchEmployees(query: GetEmployeesQuery): Promise<EmployeeListItem[]> {
  const url = new URL(`${BASE_URL}/employees`);
  if (query.cafe) {
    url.searchParams.append('cafe', query.cafe);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }

  return response.json() as Promise<EmployeeListItem[]>;
}

export async function deleteEmployee(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }
}

export async function fetchEmployeeById(id: string): Promise<EmployeeListItem> {
  const response = await fetch(`${BASE_URL}/employees/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch employee');
  }

  return response.json() as Promise<EmployeeListItem>;
}
