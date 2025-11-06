import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { getCafesSchema } from '../validators/cafeValidator';
import { getCafes } from '../controllers/cafeController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.get("/", validateRequest(getCafesSchema), asyncHandler(getCafes));

export default router;