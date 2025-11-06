import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllEmployees = async () => {
  return await prisma.employee.findMany({
    include: {
      cafe: true
    },
    orderBy: {
      startDate: 'asc'
    }
  });
};

export const getEmployeesByCafe = async (cafeId: string) => {
  return await prisma.employee.findMany({
    where: {
      cafeId
    },
    include: {
      cafe: true
    },
    orderBy: {
      startDate: 'asc'
    }
  });
};

export const createEmployee = async (data: {
  id: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  gender: 'Male' | 'Female';
  startDate: Date;
  cafeId: string;
}) => {
  return await prisma.employee.create({
    data,
    include: {
      cafe: true
    }
  });
};

export const updateEmployee = async (id: string, data: {
  name?: string;
  emailAddress?: string;
  phoneNumber?: string;
  gender?: 'Male' | 'Female';
  startDate?: Date;
  cafeId?: string;
}) => {
  return await prisma.employee.update({
    where: { id },
    data,
    include: {
      cafe: true
    }
  });
};

export const deleteEmployee = async (id: string) => {
  return await prisma.employee.delete({
    where: { id }
  });
};