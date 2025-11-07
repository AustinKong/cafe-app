import { PrismaClient, Cafe, Employee } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { ICafeService } from '../interfaces/ICafeService';
import { TYPES } from '../types';

@injectable()
export class CafeService implements ICafeService {
  constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

  getAllCafes() {
    return this.prisma.cafe.findMany({
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

  getCafeById(id: string) {
    return this.prisma.cafe.findUnique({
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

  getCafeByLocation(location: string) {
    return this.prisma.cafe.findMany({
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

  createCafe(data: { name: string; description: string; location: string; logo?: string }) {
    return this.prisma.cafe.create({
      data,
      include: {
        employees: true
      }
    });
  }

  updateCafe(id: string, data: { name?: string; description?: string; location?: string; logo?: string }) {
    return this.prisma.cafe.update({
      where: { id },
      data,
      include: {
        employees: true
      }
    });
  }

  deleteCafe(id: string) {
    return this.prisma.cafe.delete({
      where: { id }
    });
  }
}
