import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: false,
      retryDelay: (attemptIndex) => {
        const baseDelay = 1000 * 2 ** attemptIndex;
        const jitter = Math.random() * 1000;
        const delayWithJitter = baseDelay + jitter;

        console.log(`Retrying... Attempt #${attemptIndex}, Delay: ${delayWithJitter}ms (with jitter)`);
        return delayWithJitter;
      },
    },
  },
});
