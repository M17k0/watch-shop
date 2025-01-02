import { useRef, useCallback } from 'react';

export function useThrottled<Args extends unknown[]>(action: (...args: Args) => void, timeMs: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionRef = useRef(action);
  actionRef.current = action;

  return useCallback((...args: Args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => actionRef.current(...args), timeMs);
  }, [timeMs]);
}
