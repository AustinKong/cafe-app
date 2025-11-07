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

export const getCafeSchema = {
  params: z.object({
    id: z.uuid(),
  })
};

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

export type GetCafesRequestQuery = z.infer<typeof getCafesSchema.query>;
export type GetCafeRequestParams = z.infer<typeof getCafeSchema.params>;
export type CreateCafeRequestBody = z.infer<typeof createCafeSchema.body>;
export type UpdateCafeRequestParams = z.infer<typeof updateCafeSchema.params>;
export type UpdateCafeRequestBody = z.infer<typeof updateCafeSchema.body>;
export type DeleteCafeRequestParams = z.infer<typeof deleteCafeSchema.params>;

export interface CafeListItem {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  location: string;
  employees: number;
}

export interface CafeDetail {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  location: string;
  employees: {
    id: string;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    gender: string;
    startDate: string;
  }[];
}

export type GetCafesResponse = CafeListItem[];
export type GetCafeResponse = CafeDetail;
export type CreateCafeResponse = CafeDetail;
export type UpdateCafeResponse = CafeDetail;
export type DeleteCafeResponse = void;