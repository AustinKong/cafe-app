import { Cafe, Employee } from '@prisma/client';

export interface ICafeService {
  getAllCafes(): Promise<(Cafe & { _count: { employees: number } })[]>;
  getCafeById(
    id: string
  ): Promise<
    (Cafe & { _count: { employees: number }; employees: Employee[] }) | null
  >;
  getCafeByLocation(
    location: string
  ): Promise<(Cafe & { _count: { employees: number } })[]>;
  createCafe(data: {
    name: string;
    description: string;
    location: string;
    logo?: string;
  }): Promise<Cafe & { employees: Employee[] }>;
  updateCafe(
    id: string,
    data: {
      name?: string;
      description?: string;
      location?: string;
      logo?: string;
    }
  ): Promise<Cafe & { employees: Employee[] }>;
  deleteCafe(id: string): Promise<Cafe>;
}