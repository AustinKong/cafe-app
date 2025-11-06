import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { getCafesSchema, createCafeSchema, updateCafeSchema, deleteCafeSchema } from '../validators/cafeValidator';
import { getCafes, createCafe, updateCafe, deleteCafe } from '../controllers/cafeController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.get("/", validateRequest(getCafesSchema), asyncHandler(getCafes));
router.post("/", validateRequest(createCafeSchema), asyncHandler(createCafe));
router.put("/:id", validateRequest(updateCafeSchema), asyncHandler(updateCafe));
router.delete("/:id", validateRequest(deleteCafeSchema), asyncHandler(deleteCafe));

export default router;