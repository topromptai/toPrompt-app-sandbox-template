import { QueryClient } from '@tanstack/react-query';

/**
 * Pre-configured TanStack Query client.
 *
 * Defaults:
 * - staleTime: 5 minutes (data stays fresh for 5 min before refetching)
 * - retry: 2 attempts on failure
 * - refetchOnWindowFocus: false (mobile apps don't have window focus events)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
