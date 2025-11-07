import { Employee, Cafe } from '@prisma/client';

export interface IEmployeeService {
  getAllEmployees(): Promise<(Employee & { cafe: Cafe })[]>;
  getEmployeesByCafeName(
    cafeName: string
  ): Promise<(Employee & { cafe: Cafe })[]>;
  createEmployee(data: {
    name: string;
    emailAddress: string;
    phoneNumber: string;
    gender: "Male" | "Female";
    startDate: Date;
    cafeId: string;
  }): Promise<Employee & { cafe: Cafe }>;
  updateEmployee(
    id: string,
    data: {
      name?: string;
      emailAddress?: string;
      phoneNumber?: string;
      gender?: "Male" | "Female";
      startDate?: Date;
      cafeId?: string;
    }
  ): Promise<Employee & { cafe: Cafe }>;
  deleteEmployee(id: string): Promise<Employee>;
  getEmployeeById(id: string): Promise<(Employee & { cafe: Cafe }) | null>;
}