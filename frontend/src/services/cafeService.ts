import type {
  GetCafesQuery,
  CafeListItem,
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

  const data = await response.json() as CafeListItem[];
  return data;
}

export async function deleteCafe(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/cafes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete cafe');
  }
}