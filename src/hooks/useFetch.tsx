import apiClient from '@/apis/apiClient';
import axios, { AxiosError } from 'axios';
import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';

const useFetch = <T,>({ url, dependencies = [] }: { url: string; dependencies?: DependencyList }) => {
  const [payload, setPayload] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleApi = useCallback(
    async (url: string, method = 'GET', data = null) => {
      setLoading(true);
      setError(null);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      try {
        const response = await apiClient({
          method,
          url,
          data,
          signal,
        });

        setPayload(response.data.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else if (axios.isAxiosError(err)) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    },

    [url, ...dependencies],
  );

  useEffect(() => {
    handleApi(url);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, ...dependencies]);

  return { payload, error, loading, handleApi };
};

export default useFetch;
