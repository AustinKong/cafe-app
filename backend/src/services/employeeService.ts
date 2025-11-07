import { PrismaClient, Employee, Cafe } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { IEmployeeService } from '../interfaces/IEmployeeService';
import { TYPES } from '../types';

@injectable()
export class EmployeeService implements IEmployeeService {
  constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

  getAllEmployees() {
    return this.prisma.employee.findMany({
      include: {
        cafe: true
      },
      orderBy: {
        startDate: 'asc'
      }
    });
  }

  getEmployeesByCafeName(cafeName: string) {
    return this.prisma.employee.findMany({
      where: {
        cafe: {
          name: {
            contains: cafeName,
            mode: 'insensitive'
          }
        }
      },
      include: {
        cafe: true
      },
      orderBy: {
        startDate: 'asc'
      }
    });
  }

  createEmployee(data: {
    name: string;
    emailAddress: string;
    phoneNumber: string;
    gender: 'Male' | 'Female';
    startDate: Date;
    cafeId: string;
  }) {
    const id = `UI${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const dataWithId = { ...data, id };

    return this.prisma.employee.create({
      data: dataWithId,
      include: {
        cafe: true
      }
    });
  }

  updateEmployee(id: string, data: {
    name?: string;
    emailAddress?: string;
    phoneNumber?: string;
    gender?: 'Male' | 'Female';
    startDate?: Date;
    cafeId?: string;
  }) {
    return this.prisma.employee.update({
      where: { id },
      data,
      include: {
        cafe: true
      }
    });
  }

  deleteEmployee(id: string) {
    return this.prisma.employee.delete({
      where: { id }
    });
  }

  getEmployeeById(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        cafe: true
      }
    });
  }
}