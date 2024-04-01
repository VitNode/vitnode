import {
  type Ref,
  type RefCallback,
  useMemo,
  type MutableRefObject
} from "react";

/**
 * Merges an array of refs into a single memoized callback ref or `null`.
 * @see https://floating-ui.com/docs/useMergeRefs
 */
export function useMergeRefs<Instance>(
  refs: Array<Ref<Instance> | undefined>
): RefCallback<Instance> | null {
  return useMemo((): RefCallback<Instance> | null => {
    if (refs.every((ref): boolean => ref == null)) {
      return null;
    }

    return (value): void => {
      refs.forEach((ref): void => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          (ref as MutableRefObject<Instance | null>).current = value;
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
