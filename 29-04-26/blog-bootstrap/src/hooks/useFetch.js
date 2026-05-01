import { useState, useEffect, useCallback } from 'react';

const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  // 1. Memoize the fetch function so it doesn't change on every render
  const executeFetch = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: err.message });
    }
  }, [url]); // Only recreate if the URL changes

  // 2. Trigger fetch on mount or URL change
  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  // 3. Spread state to return { data, loading, error } + refetch
  return { ...state, refetch: executeFetch };
};

export default useFetch;