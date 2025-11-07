import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import {
  getCafesSchema,
  getCafeSchema,
  createCafeSchema,
  updateCafeSchema,
  deleteCafeSchema,
} from "@cafe-app/shared-types";
import { CafeController } from "../controllers/cafeController";
import asyncHandler from "../utils/asyncHandler";
import upload from "../utils/multer";

export function createCafeRouter(cafeController: CafeController) {
  const router = Router();

  router.get(
    "/",
    validateRequest(getCafesSchema),
    asyncHandler(cafeController.getCafes.bind(cafeController))
  );
  router.get(
    "/:id",
    validateRequest(getCafeSchema),
    asyncHandler(cafeController.getCafe.bind(cafeController))
  );
  router.post(
    "/",
    upload.single("logo"),
    validateRequest(createCafeSchema),
    asyncHandler(cafeController.createCafe.bind(cafeController))
  );
  router.put(
    "/:id",
    upload.single("logo"),
    validateRequest(updateCafeSchema),
    asyncHandler(cafeController.updateCafe.bind(cafeController))
  );
  router.delete(
    "/:id",
    validateRequest(deleteCafeSchema),
    asyncHandler(cafeController.deleteCafe.bind(cafeController))
  );

  return router;
}
