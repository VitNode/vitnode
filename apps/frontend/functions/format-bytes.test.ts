import { expect, test } from "vitest";

import { formatBytes } from "./format-bytes";

test("formatBytes", () => {
  // Test with 1 byte
  expect(formatBytes(1)).toBe("1 Bytes");

  // Test with 1 kilobyte
  expect(formatBytes(1024)).toBe("1 KB");

  // Test with 1 megabyte
  expect(formatBytes(1024 * 1024)).toBe("1 MB");

  // Test with 1 gigabyte
  expect(formatBytes(1024 * 1024 * 1024)).toBe("1 GB");

  // Test with 1 terabyte
  expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe("1 TB");

  // Test with decimals
  expect(formatBytes(1500, 2)).toBe("1.46 KB");
});
