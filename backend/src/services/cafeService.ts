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

export function getCafeById(id: string) {
  return prisma.cafe.findUnique({
    where: {
      id
    },
    include: {
      _count: {
        select: {
          employees: true
        }
      },
      employees: true
    }
  });
}

export function getCafeByLocation(location: string) {
  return prisma.cafe.findMany({
    where: {
      location: {
        contains: location,
        mode: 'insensitive'
      }
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
    data,
    include: {
      employees: true
    }
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
    data,
    include: {
      employees: true
    }
  });
}

export function deleteCafe(id: string) {
  return prisma.cafe.delete({
    where: { id }
  });
}
