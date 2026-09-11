import type { JsonValue } from "./types";

const describeValue = (value: unknown): string => {
  if (typeof value === "function") return "a function";
  if (typeof value === "symbol") return "a symbol";
  if (typeof value === "bigint") return "a bigint";
  if (typeof value === "number") return `the number ${String(value)}`;
  if (value instanceof Date) return "a Date";
  if (value instanceof Map) return "a Map";
  if (value instanceof Set) return "a Set";

  return `an instance of ${(value as object).constructor.name}`;
};

const isPlainObject = (value: object): boolean => {
  const prototype: unknown = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
};

export interface NonSerializableFinding {
  path: string;
  reason: string;
}

export const findNonSerializable = (
  value: unknown,
  path = "$",
  seen = new Set<object>(),
): NonSerializableFinding | null => {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value)
      ? null
      : { path, reason: `${describeValue(value)} is not valid JSON` };
  }

  if (typeof value !== "object") {
    return { path, reason: `${describeValue(value)} cannot be serialized` };
  }

  if (seen.has(value)) {
    return { path, reason: "a circular reference cannot be serialized" };
  }

  seen.add(value);

  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      if (item === undefined) {
        return {
          path: `${path}[${String(index)}]`,
          reason: "undefined inside an array cannot be serialized",
        };
      }

      const finding = findNonSerializable(
        item,
        `${path}[${String(index)}]`,
        seen,
      );

      if (finding) return finding;
    }

    seen.delete(value);

    return null;
  }

  if (!isPlainObject(value)) {
    return { path, reason: `${describeValue(value)} cannot be serialized` };
  }

  for (const [key, item] of Object.entries(value)) {
    if (item === undefined) continue;

    const finding = findNonSerializable(item, `${path}.${key}`, seen);

    if (finding) return finding;
  }

  seen.delete(value);

  return null;
};

export const isSerializable = (value: unknown): value is JsonValue =>
  value !== undefined && findNonSerializable(value) === null;

export const toSerializable = (value: unknown): JsonValue =>
  JSON.parse(JSON.stringify(value)) as JsonValue;
