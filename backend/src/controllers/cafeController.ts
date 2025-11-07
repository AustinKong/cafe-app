import { extractTypedLocals, Request, Response } from "../middleware/validateRequest";
import { getCafesSchema, getCafeSchema, createCafeSchema, updateCafeSchema, deleteCafeSchema, GetCafesResponse, GetCafeResponse, CreateCafeResponse, UpdateCafeResponse } from "@cafe-app/shared-types"
import ApiError from "../utils/apiError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { injectable, inject } from 'inversify';
import { ICafeService } from '../interfaces/ICafeService';
import { TYPES } from '../types';

const getBaseUrl = (req: Request) => `${req.protocol}://${req.get('host')}`;

@injectable()
export class CafeController {
  constructor(@inject(TYPES.ICafeService) private cafeService: ICafeService) {}

  async getCafes(req: Request, res: Response) {
    try {
      const { query } = extractTypedLocals(res, getCafesSchema);
      const { location } = query;

      let cafes;
      if (location) {
        cafes = await this.cafeService.getCafeByLocation(location);
      } else {
        cafes = await this.cafeService.getAllCafes();
      }

      const response: GetCafesResponse = cafes.map((cafe) => ({
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        employees: cafe._count.employees,
        logo: cafe.logo,
        location: cafe.location,
      }));

      return res.json(response);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ApiError(500, "Database error occurred");
      }
      throw error;
    }
  };

  async getCafe(req: Request, res: Response) {
    try {
      const { params } = extractTypedLocals(res, getCafeSchema);
      const { id } = params;

      const cafe = await this.cafeService.getCafeById(id);

      if (!cafe) {
        throw new ApiError(404, "Cafe not found");
      }

      const response: GetCafeResponse = {
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        logo: cafe.logo,
        location: cafe.location,
        employees: cafe.employees.map(employee => ({
          id: employee.id,
          name: employee.name,
          emailAddress: employee.emailAddress,
          phoneNumber: employee.phoneNumber,
          gender: employee.gender,
          startDate: employee.startDate.toISOString(),
        }))
      };

      return res.json(response);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ApiError(500, "Database error occurred");
      }
      throw error;
    }
  };

  async createCafe(req: Request, res: Response) {
    try {
      const { body } = extractTypedLocals(res, createCafeSchema);

      const logoPath = (req as any).file ? `${getBaseUrl(req)}/data/${(req as any).file.filename}` : undefined;

      const newCafe = await this.cafeService.createCafe({ ...body, logo: logoPath });

      const response: CreateCafeResponse = {
        id: newCafe.id,
        name: newCafe.name,
        description: newCafe.description,
        logo: newCafe.logo,
        location: newCafe.location,
        employees: (newCafe as any).employees.map((employee: any) => ({
          id: employee.id,
          name: employee.name,
          emailAddress: employee.emailAddress,
          phoneNumber: employee.phoneNumber,
          gender: employee.gender,
          startDate: employee.startDate.toISOString(),
        }))
      };

      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ApiError(500, "Database error occurred");
      }
      throw error;
    }
  };

  async updateCafe(req: Request, res: Response) {
    try {
      const { params, body } = extractTypedLocals(res, updateCafeSchema);
      const { id } = params;

      const logoPath = (req as any).file ? `${getBaseUrl(req)}/data/${(req as any).file.filename}` : undefined;

      const updatedCafe = await this.cafeService.updateCafe(id, { ...body, logo: logoPath });

      const response: UpdateCafeResponse = {
        id: updatedCafe.id,
        name: updatedCafe.name,
        description: updatedCafe.description,
        logo: updatedCafe.logo,
        location: updatedCafe.location,
        employees: (updatedCafe as any).employees.map((employee: any) => ({
          id: employee.id,
          name: employee.name,
          emailAddress: employee.emailAddress,
          phoneNumber: employee.phoneNumber,
          gender: employee.gender,
          startDate: employee.startDate.toISOString(),
        }))
      };

      return res.json(response);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ApiError(404, "Cafe not found");
        }
        throw new ApiError(500, "Database error occurred");
      }
      throw error;
    }
  };

  async deleteCafe(req: Request, res: Response) {
    try {
      const { params } = extractTypedLocals(res, deleteCafeSchema);
      const { id } = params;

      await this.cafeService.deleteCafe(id);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ApiError(404, "Cafe not found");
        }
        throw new ApiError(500, "Database error occurred");
      }
      throw error;
    }
  };
}
