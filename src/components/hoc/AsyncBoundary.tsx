import { PropsWithChildren, ReactNode } from 'react';

interface AsyncBoundaryProps {
  isLoading?: boolean;
  loadingFallback?: ReactNode;
  isError?: boolean;
  errorFallback?: ReactNode;
}

const AsyncBoundary = ({
  children,
  isLoading,
  loadingFallback,
  isError,
  errorFallback,
}: PropsWithChildren<AsyncBoundaryProps>) => {
  if (isError && errorFallback) {
    return errorFallback;
  }

  if (isLoading && loadingFallback) {
    return loadingFallback;
  }

  return children;
};

export default AsyncBoundary;
