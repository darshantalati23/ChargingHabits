import { useState, useEffect } from 'react';

// Module-level cache variables
let cachedData = null;
let cachedError = null;
let fetchPromise = null;

export default function useData() {
  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData && !cachedError);
  const [error, setError] = useState(cachedError);

  useEffect(() => {
    // If data is already in cache, do not trigger a fetch or set loading to true
    if (cachedData || cachedError) {
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetch('/data/master_data.json')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((json) => {
          cachedData = json;
          return json;
        })
        .catch((err) => {
          cachedError = err.message;
          throw err;
        });
    }

    fetchPromise
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
