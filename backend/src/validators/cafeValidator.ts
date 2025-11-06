import { z } from 'zod';

export const getCafesSchema = {
  query: z.object({
    location: z.string().optional(),
  })
}