import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCafes = async () => {
  return await prisma.cafe.findMany({
    include: {
      _count: {
        select: {
          employees: true
        }
      },
      employees: true
    },
    orderBy: {
      employees: {
        _count: 'desc'
      }
    }
  });
};

export const getCafeByLocation = async (location: string) => {
  return await prisma.cafe.findMany({
    where: {
      location
    },
    include: {
      _count: {
        select: {
          employees: true
        }
      },
      employees: true
    },
    orderBy: {
      employees: {
        _count: 'desc'
      }
    }
  });
};

export const createCafe = async (data: {
  name: string;
  description: string;
  location: string;
  logo?: string;
}) => {
  return await prisma.cafe.create({
    data
  });
};

export const updateCafe = async (id: string, data: {
  name?: string;
  description?: string;
  location?: string;
  logo?: string;
}) => {
  return await prisma.cafe.update({
    where: { id },
    data
  });
};

export const deleteCafe = async (id: string) => {
  return await prisma.cafe.delete({
    where: { id }
  });
};
