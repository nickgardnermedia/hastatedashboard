import { useState, useEffect, useCallback } from 'react';

export const useAutoRefresh = (interval: number, callback: () => Promise<void>) => {
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const refreshData = useCallback(async () => {
    await callback();
    setLastRefresh(Date.now());
  }, [callback]);

  useEffect(() => {
    const timer = setInterval(refreshData, interval);
    return () => clearInterval(timer);
  }, [refreshData, interval]);

  return { lastRefresh, refreshData };
};