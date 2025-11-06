import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { getCafesSchema, getCafeSchema, createCafeSchema, updateCafeSchema, deleteCafeSchema } from "@cafe-app/shared-types"
import { getCafes, getCafe, createCafe, updateCafe, deleteCafe } from '../controllers/cafeController';
import asyncHandler from '../utils/asyncHandler';
import upload from '../utils/multer';

const router = Router();

router.get("/", validateRequest(getCafesSchema), asyncHandler(getCafes));
router.get("/:id", validateRequest(getCafeSchema), asyncHandler(getCafe));
router.post("/", upload.single('logo'), validateRequest(createCafeSchema), asyncHandler(createCafe));
router.put("/:id", upload.single('logo'), validateRequest(updateCafeSchema), asyncHandler(updateCafe));
router.delete("/:id", validateRequest(deleteCafeSchema), asyncHandler(deleteCafe));

export default router;