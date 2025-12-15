import { apiClient } from '@/lib/api-client';
import type { Camera, CameraFilters, PaginatedResponse } from '../types';

export const camerasApi = {
  getAll: (filters?: CameraFilters, page = 1, pageSize = 10) =>
    apiClient.get<PaginatedResponse<Camera>>('/api/v1/cameras', {
      params: { ...filters, page, page_size: pageSize },
    }),

  getById: (id: number) => apiClient.get<Camera>(`/api/v1/cameras/${id}`),

  create: (data: Omit<Camera, 'id' | 'created_at' | 'updated_at'>) =>
    apiClient.post<Camera>('/api/v1/cameras', data),

  update: (id: number, data: Partial<Camera>) =>
    apiClient.put<Camera>(`/api/v1/cameras/${id}`, data),

  delete: (id: number) => apiClient.delete(`/api/v1/cameras/${id}`),
};
