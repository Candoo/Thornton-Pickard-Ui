import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { camerasApi } from '../api/cameras.api';
import type { CameraFilters, CameraFormData } from '../types';

/**
 * Hook to fetch paginated cameras with optional filters
 */
export function useCameras(filters?: CameraFilters, page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['cameras', filters, page, pageSize],
    queryFn: () => camerasApi.getAll(filters, page, pageSize),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch a single camera by ID
 */
export function useCameraDetail(id: number) {
  return useQuery({
    queryKey: ['cameras', id],
    queryFn: () => camerasApi.getById(id),
    enabled: !!id, // Only run query if ID exists
  });
}

/**
 * Hook to create a new camera
 */
export function useCreateCamera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CameraFormData) => camerasApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch cameras list
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
    },
  });
}

/**
 * Hook to update an existing camera
 */
export function useUpdateCamera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CameraFormData> }) =>
      camerasApi.update(id, data),
    onSuccess: (data) => {
      // Invalidate cameras list
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
      
      // Update the specific camera in cache
      queryClient.setQueryData(['cameras', data.id], data);
    },
  });
}

/**
 * Hook to delete a camera
 */
export function useDeleteCamera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => camerasApi.delete(id),
    onSuccess: () => {
      // Invalidate cameras list to refetch
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
    },
  });
}