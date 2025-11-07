import type {
  GetCafesRequestQuery,
  GetCafesResponse,
  GetCafeResponse,
  CreateCafeRequestBody,
  CreateCafeResponse,
  UpdateCafeResponse,
} from '@cafe-app/shared-types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function fetchCafes(query: GetCafesRequestQuery): Promise<GetCafesResponse> {
  const url = new URL(`${BASE_URL}/cafes`);
  if (query.location) {
    url.searchParams.append('location', query.location);
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error('Failed to fetch cafes');
  }

  return response.json() as Promise<GetCafesResponse>;
}

export async function fetchCafeById(id: string): Promise<GetCafeResponse> {
  const response = await fetch(`${BASE_URL}/cafes/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cafe');
  }

  return response.json() as Promise<GetCafeResponse>;
}

export async function createCafe(cafe: CreateCafeRequestBody & { logo?: File }): Promise<CreateCafeResponse> {
  const formData = new FormData();
  formData.append('name', cafe.name);
  formData.append('description', cafe.description);
  formData.append('location', cafe.location);
  if (cafe.logo) {
    formData.append('logo', cafe.logo);
  }

  const response = await fetch(`${BASE_URL}/cafes`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create cafe');
  }

  return response.json() as Promise<CreateCafeResponse>;
}

export async function updateCafe(id: string, cafe: CreateCafeRequestBody & { logo?: File }): Promise<UpdateCafeResponse> {
  const formData = new FormData();
  formData.append('name', cafe.name);
  formData.append('description', cafe.description);
  formData.append('location', cafe.location);
  if (cafe.logo) {
    formData.append('logo', cafe.logo);
  }

  const response = await fetch(`${BASE_URL}/cafes/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update cafe');
  }

  return response.json() as Promise<UpdateCafeResponse>;
}

export async function deleteCafe(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/cafes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete cafe');
  }
}