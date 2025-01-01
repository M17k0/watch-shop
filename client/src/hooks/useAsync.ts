import { DependencyList, useEffect } from 'react';
import { useAsyncAction } from './useAsyncAction';

export function useAsync<Result>(
  action: () => Promise<Result>,
  dependencies: DependencyList = [],
) {
  const { data, error, loading, trigger } = useAsyncAction(action);

  useEffect(() => {
    trigger();
  }, [trigger, ...dependencies]);

  return { data, error, loading, trigger };
}
