import { type Ref, type RefCallback, useMemo } from 'react';

/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 * @see https://floating-ui.com/docs/useMergeRefs
 */
export function useMergeRefs<Instance>(
  refs: Array<Ref<Instance> | undefined>
): RefCallback<Instance> | null {
  return useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null;
    }

    return value => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<Instance | null>).current = value;
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
