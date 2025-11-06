import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function getAllEmployees() {
  return prisma.employee.findMany({
    include: {
      cafe: true
    },
    orderBy: {
      startDate: 'asc'
    }
  });
}

export function getEmployeesByCafeName(cafeName: string) {
  return prisma.employee.findMany({
    where: {
      cafe: {
        name: cafeName
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

export function createEmployee(data: {
  id: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  gender: 'Male' | 'Female';
  startDate: Date;
  cafeId: string;
}) {
  return prisma.employee.create({
    data,
    include: {
      cafe: true
    }
  });
}

export function updateEmployee(id: string, data: {
  name?: string;
  emailAddress?: string;
  phoneNumber?: string;
  gender?: 'Male' | 'Female';
  startDate?: Date;
  cafeId?: string;
}) {
  return prisma.employee.update({
    where: { id },
    data,
    include: {
      cafe: true
    }
  });
}

export function deleteEmployee(id: string) {
  return prisma.employee.delete({
    where: { id }
  });
}