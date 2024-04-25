import { useState, useEffect, useCallback } from 'react';
import { API } from '../services/api';

interface QueryResult<T> {
  data: T | undefined;
  loading: boolean;
  error: string | null;
}


function useQuery<T>(url: string): QueryResult<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await API.get<T>(url);
      setData(result.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    return () => {
      setData(undefined);
      setLoading(false);
      setError(null);
    };
  }, [fetchData]);

  return { data, loading, error };
}

export default useQuery;
