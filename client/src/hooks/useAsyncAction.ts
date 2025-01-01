import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncAction<T> {
  data: T | undefined;
  loading: boolean;
  error: unknown;
}

export interface AsyncActionOptions {
  keepOldData: boolean;
}

const DEFAULT_OPTIONS: AsyncActionOptions = {
  keepOldData: false,
};

export function useAsyncAction<Params extends unknown[], Result>(
  action: (...args: Params) => Promise<Result>,
  options: Partial<AsyncActionOptions> = {},
) {
  const [state, setState] = useState<AsyncAction<Result>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const requestId = useRef(0);

  const optionsWithDefaults = { ...DEFAULT_OPTIONS, ...options };
  const optionsRef = useRef(optionsWithDefaults);
  optionsRef.current = optionsWithDefaults;

  const actionRef = useRef(action);
  actionRef.current = action;

  const perform = useCallback(async (...args: Params) => {
    requestId.current++;
    const requestIdSnapshot = requestId.current;

    setState(current => ({
      ...(optionsRef.current.keepOldData
        ? current
        : { data: undefined, error: undefined }),
      loading: true,
    }));

    try {
      const data = await actionRef.current(...args);

      if (requestId.current === requestIdSnapshot) {
        setState({
          data,
          loading: false,
          error: undefined,
        });
      }

      return data;
    } catch (error) {
      if (requestId.current === requestIdSnapshot) {
        setState({
          data: undefined,
          loading: false,
          error: error,
        });
      }

      throw error;
    }
  }, []);

  const trigger = useCallback(
    (...args: Params) => {
      perform(...args).catch(() => {});
    },
    [perform],
  );

  useEffect(() => {
    return () => {
      requestId.current += 1;
    };
  }, []);

  return { ...state, perform, trigger };
}
