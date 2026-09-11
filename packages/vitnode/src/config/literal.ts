export const toSingleQuotedLiteral = (value: string): string =>
  `'${value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")}'`;

const IDENTIFIER_PATTERN = /^[A-Za-z_$][\w$]*$/;

const propertyKey = (key: string): string =>
  IDENTIFIER_PATTERN.test(key) ? key : toSingleQuotedLiteral(key);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const toTypeScriptLiteral = (value: unknown, depth = 0): string => {
  const pad = "  ".repeat(depth + 1);
  const close = "  ".repeat(depth);

  if (value === null) return "null";
  if (typeof value === "string") return toSingleQuotedLiteral(value);
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";

    return `[\n${value
      .map(item => `${pad}${toTypeScriptLiteral(item, depth + 1)},`)
      .join("\n")}\n${close}]`;
  }

  if (isRecord(value)) {
    const entries = Object.entries(value)
      .filter(([, item]) => item !== undefined)
      .sort(([a], [b]) => (a === b ? 0 : a < b ? -1 : 1));

    if (entries.length === 0) return "{}";

    return `{\n${entries
      .map(
        ([key, item]) =>
          `${pad}${propertyKey(key)}: ${toTypeScriptLiteral(item, depth + 1)},`,
      )
      .join("\n")}\n${close}}`;
  }

  throw new TypeError(
    `Cannot write ${typeof value} into a generated TypeScript literal.`,
  );
};
