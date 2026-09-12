// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import { hashSessionToken } from "./session-token";

/** What the sessions table actually holds, computed independently. */
const reference = (token: string): string =>
  createHash("sha256").update(token, "utf8").digest("hex");

describe("hashSessionToken", () => {
  it("is SHA-256 over the token's UTF-8 bytes", async () => {
    await expect(hashSessionToken("a-session-token")).resolves.toBe(
      reference("a-session-token"),
    );
  });

  it("matches the known digest of the empty string", async () => {
    // Pinned rather than derived: a change of algorithm would otherwise move
    // both sides of the comparison above together.
    await expect(hashSessionToken("")).resolves.toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
  });

  it("answers in lowercase hexadecimal, and nothing else", async () => {
    await expect(hashSessionToken("a-session-token")).resolves.toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  it("pads a byte below 0x10 rather than dropping its zero", async () => {
    const hashed = await hashSessionToken("1");

    // Without the padding the string would be short of 64 characters and no
    // row would ever be found again.
    expect(hashed).toBe(reference("1"));
    expect(hashed).toHaveLength(64);
  });

  it.each(["", "1", "a-session-token", " ", "a".repeat(128)])(
    "agrees with SHA-256 over %o",
    async token => {
      await expect(hashSessionToken(token)).resolves.toBe(reference(token));
    },
  );

  it("encodes as UTF-8, not as UTF-16 code units", async () => {
    // A multi-byte character is where the two encodings part ways, and every
    // stored token would stop matching if this changed.
    const key = String.fromCodePoint(0x1f511);

    await expect(hashSessionToken(key)).resolves.toBe(
      createHash("sha256").update(Buffer.from(key, "utf8")).digest("hex"),
    );
  });

  it("is stable, so a look-up finds the row a write made", async () => {
    const [first, second] = await Promise.all([
      hashSessionToken("a-session-token"),
      hashSessionToken("a-session-token"),
    ]);

    expect(first).toBe(second);
  });

  it("separates two tokens that differ by one character", async () => {
    expect(await hashSessionToken("token-a")).not.toBe(
      await hashSessionToken("token-b"),
    );
  });
});
