import { extractTypedLocals, Request, Response } from "../middleware/validateRequest";
import { getAllCafes, getCafeByLocation } from "../services/cafeService";
import { getCafesSchema } from "../validators/cafeValidator";

export async function getCafes(req: Request, res: Response) {
  const { query } = extractTypedLocals(res, getCafesSchema);
  const { location } = query;

  let cafes;
  if (location) {
    cafes = await getCafeByLocation(location);
  } else {
    cafes = await getAllCafes();
  }

  const response = cafes.map((cafe) => ({
    id: cafe.id,
    name: cafe.name,
    description: cafe.description,
    employees: cafe._count.employees,
    logo: cafe.logo,
    location: cafe.location,
  }));

  return res.json(response);
};
