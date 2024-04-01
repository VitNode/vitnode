/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * Source: https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/plugins/CodeActionMenuPlugin/utils.ts
 */
import { debounce, type DebouncedFunc } from "lodash";
import { useMemo, useRef } from "react";

export function useDebounce<T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
  maxWait?: number
): DebouncedFunc<(...args: Parameters<T>) => void> {
  const funcRef = useRef<T | null>(null);
  funcRef.current = fn;

  return useMemo(
    (): DebouncedFunc<(...args: Parameters<T>) => void> =>
      debounce(
        (...args: Parameters<T>): void => {
          if (funcRef.current) {
            funcRef.current(...args);
          }
        },
        ms,
        { maxWait }
      ),
    [ms, maxWait]
  );
}
