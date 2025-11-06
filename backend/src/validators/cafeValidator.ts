import { z } from 'zod';

export const getCafesSchema = {
  query: z.object({
    location: z.string().optional(),
  })
}

export const createCafeSchema = {
  body: z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    logo: z.string().optional(),
  })
}

export const updateCafeSchema = {
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    logo: z.string().optional(),
  })
}

export const deleteCafeSchema = {
  params: z.object({
    id: z.uuid(),
  })
}