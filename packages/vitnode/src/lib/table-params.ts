/**
 * The three primitives every table's URL parameters are read through.
 *
 * Only the parts that are genuinely the same everywhere: which of a repeated
 * parameter counts, how a value that is not a string becomes one, and what a
 * usable page size is. Which columns may be sorted by, whether there is a
 * search box, what the default page size is and which statuses a filter
 * accepts are each table's own policy and stay with that table.
 */

/** The first value for a key, since only one can reach the API. */
export const readFirstValue = (
  value: null | string | string[] | undefined,
): string => {
  if (Array.isArray(value)) return value[0] ?? "";

  return value ?? "";
};

/**
 * A search value of unknown provenance, as the string the API would see.
 *
 * `undefined` for anything that has no single sensible spelling - an object, a
 * `null`, a `NaN` - so the caller's own validation decides what to do with the
 * absence rather than being handed `"[object Object]"`.
 */
export const asSearchValue = (value: unknown): string | undefined => {
  const one = Array.isArray(value) ? (value[0] as unknown) : value;

  if (typeof one === "string") return one;
  if (typeof one === "number") {
    return Number.isFinite(one) ? String(one) : undefined;
  }
  if (typeof one === "boolean") return String(one);

  return undefined;
};

/**
 * A page size the API will accept, clamped to `max`, or nothing.
 *
 * Digits only: `"1e3"`, `"1.5"` and `"-1"` are not page sizes a URL should be
 * able to ask for, and a rejection here means the caller falls back to its own
 * default rather than passing a number the route would refuse.
 */
export const readPageSize = (raw: string, max: number): string | undefined => {
  if (!/^\d+$/.test(raw)) return undefined;

  const size = Number(raw);
  if (!Number.isSafeInteger(size) || size < 1) return undefined;

  return String(Math.min(size, max));
};
