import { z } from 'zod';

const CAFE_BODY_VALIDATOR = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500),
  location: z.string().max(100),
});

export const getCafesSchema = {
  query: z.object({
    location: z.string().optional(),
  })
}

export const createCafeSchema = {
  body: CAFE_BODY_VALIDATOR
}

export const updateCafeSchema = {
  params: z.object({
    id: z.uuid(),
  }),
  body: CAFE_BODY_VALIDATOR
}

export const deleteCafeSchema = {
  params: z.object({
    id: z.uuid(),
  })
}

export type CreateCafeDto = z.infer<typeof createCafeSchema.body>;
export type UpdateCafeDto = z.infer<typeof updateCafeSchema.body>;
export type GetCafesQuery = z.infer<typeof getCafesSchema.query>;