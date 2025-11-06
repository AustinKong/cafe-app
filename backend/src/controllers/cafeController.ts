import { extractTypedLocals, Request, Response } from "../middleware/validateRequest";
import { getAllCafes, getCafeByLocation, createCafe as createCafeService, updateCafe as updateCafeService, deleteCafe as deleteCafeService, getCafeById } from "../services/cafeService";
import { getCafesSchema, getCafeSchema, createCafeSchema, updateCafeSchema, deleteCafeSchema, CafeListItem } from "@cafe-app/shared-types"
import ApiError from "../utils/apiError";

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

export async function getCafes(req: Request, res: Response) {
  const { query } = extractTypedLocals(res, getCafesSchema);
  const { location } = query;

  let cafes;
  if (location) {
    cafes = await getCafeByLocation(location);
  } else {
    cafes = await getAllCafes();
  }

  const response: CafeListItem[] = cafes.map((cafe) => ({
    id: cafe.id,
    name: cafe.name,
    description: cafe.description,
    employees: cafe._count.employees,
    logo: cafe.logo,
    location: cafe.location,
  }));

  return res.json(response);
};

export async function getCafe(req: Request, res: Response) {
  const { params } = extractTypedLocals(res, getCafeSchema);
  const { id } = params;

  const cafe = await getCafeById(id);

  if (!cafe) {
    throw new ApiError(404, "Cafe not found");
  }

  return res.json(cafe);
};

export async function createCafe(req: Request, res: Response) {
  const { body } = extractTypedLocals(res, createCafeSchema);

  const logoPath = (req as any).file ? `${BASE_URL}/data/${(req as any).file.filename}` : undefined;

  const newCafe = await createCafeService({ ...body, logo: logoPath });

  return res.status(201).json(newCafe);
};

export async function updateCafe(req: Request, res: Response) {
  const { params, body } = extractTypedLocals(res, updateCafeSchema);
  const { id } = params;

  const logoPath = (req as any).file ? `${BASE_URL}/data/${(req as any).file.filename}` : undefined;

  const updatedCafe = await updateCafeService(id, { ...body, logo: logoPath });

  return res.json(updatedCafe);
};

export async function deleteCafe(req: Request, res: Response) {
  const { params } = extractTypedLocals(res, deleteCafeSchema);
  const { id } = params;

  await deleteCafeService(id);

  return res.status(204).send();
};
