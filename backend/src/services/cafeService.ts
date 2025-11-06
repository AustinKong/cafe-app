import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function getAllCafes() {
  return prisma.cafe.findMany({
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
}

export function getCafeByLocation(location: string) {
  return prisma.cafe.findMany({
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
}

export function createCafe(data: {
  name: string;
  description: string;
  location: string;
  logo?: string;
}) {
  return prisma.cafe.create({
    data
  });
}

export function updateCafe(id: string, data: {
  name?: string;
  description?: string;
  location?: string;
  logo?: string;
}) {
  return prisma.cafe.update({
    where: { id },
    data
  });
}

export function deleteCafe(id: string) {
  return prisma.cafe.delete({
    where: { id }
  });
}
