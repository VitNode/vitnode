import { expect, test } from "vitest";

import { generateRandomString } from "./generate-random-string";

test("generateRandomString generates string of correct length", () => {
  const length = 10;
  const result = generateRandomString(length);
  expect(result).toHaveLength(length);
});

test("generateRandomString generates different strings for different calls", () => {
  const result1 = generateRandomString(10);
  const result2 = generateRandomString(10);
  expect(result1).not.toEqual(result2);
});

test("generateRandomString generates string with only valid characters", () => {
  const validCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const result = generateRandomString(10);

  for (const char of result) {
    expect(validCharacters).toContain(char);
  }
});
