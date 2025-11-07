import { prisma } from '../utils/prismaClient';

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

export function createEmployee(data: {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  gender: 'Male' | 'Female';
  startDate: Date;
  cafeId: string;
}) {
  const id = `UI${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  const dataWithId = { ...data, id };

  return prisma.employee.create({
    data: dataWithId,
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

export function getEmployeeById(id: string) {
  return prisma.employee.findUnique({
    where: { id },
    include: {
      cafe: true
    }
  });
}