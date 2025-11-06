import type {
  GetCafesQuery,
  CafeListItem,
  CreateCafeDto,
} from '@cafe-app/shared-types';

const BASE_URL = 'http://localhost:5000/api';

export async function fetchCafes(query: GetCafesQuery): Promise<CafeListItem[]> {
  const params = new URLSearchParams();
  if (query.location) {
    params.append('location', query.location);
  }

  const response = await fetch(`${BASE_URL}/cafes?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cafes');
  }

  return response.json() as Promise<CafeListItem[]>;
}

export async function fetchCafeById(id: string): Promise<CafeListItem> {
  const response = await fetch(`${BASE_URL}/cafes/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cafe');
  }

  return response.json() as Promise<CafeListItem>;
}

export async function createCafe(cafe: CreateCafeDto & { logo?: File }): Promise<CafeListItem> {
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

  return response.json() as Promise<CafeListItem>;
}

export async function updateCafe(id: string, cafe: CreateCafeDto & { logo?: File }): Promise<CafeListItem> {
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

  return response.json() as Promise<CafeListItem>;
}

export async function deleteCafe(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/cafes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete cafe');
  }
}