import { useState, useCallback } from 'react';
import { API } from '../services/api';

type MutationFunction<T> = (data: string) => Promise<T>;

interface UseMutationOptions<T> {
  onSuccess?: (data: T) => void;
}

function useMutation<T>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options?: UseMutationOptions<T>
): [MutationFunction<T>, { loading: boolean; error: string | null }] {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (body: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await API.request<T>({
        url: endpoint,
        method,
        data: body,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (options?.onSuccess) {
        options.onSuccess(result.data);
      }
      return result.data;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, options]);

  return [mutate, { loading, error }];
}

export default useMutation;
