import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { ApiError } from './api-client';

// Create and configure the query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Cache time: how long unused data stays in cache
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Retry failed requests
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError;

        // Don't retry on 4xx errors (client errors)
        if (
          axiosError.response?.status &&
          axiosError.response.status >= 400 &&
          axiosError.response.status < 500
        ) {
          return false;
        }

        // Retry up to 2 times for 5xx errors
        return failureCount < 2;
      },

      // Refetch on window focus (good for data consistency)
      refetchOnWindowFocus: false,

      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Error handling for mutations
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>;
        console.error(
          'Mutation error:',
          axiosError.response?.data?.message || 'An error occurred'
        );
      },
    },
  },
});

// Helper function to extract error message
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message || error.message || 'An error occurred'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
}
