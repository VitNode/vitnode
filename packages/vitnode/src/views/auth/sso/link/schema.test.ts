import { describe, expect, it } from "vitest";

import { createSSOLinkFormSchema, ssoLinkFormOutcome } from "./schema";

const schema = createSSOLinkFormSchema({
  passwordRequired: "password missing",
});

describe("the SSO link schema", () => {
  it("accepts a password", () => {
    const parsed = schema.safeParse({ password: "Test123!" });

    expect(parsed.success).toBe(true);
    expect(parsed.data).toEqual({ password: "Test123!" });
  });

  it("rejects an empty password, with the message it was given", () => {
    const parsed = schema.safeParse({ password: "" });

    expect(parsed.success).toBe(false);
    expect(parsed.error?.issues[0]?.message).toBe("password missing");
  });

  it("defaults the password to an empty string", () => {
    expect(schema.parse({})).toEqual({ password: "" });
  });
});

describe("reading the link mutation result", () => {
  it("is quiet on success", () => {
    expect(ssoLinkFormOutcome(undefined)).toBeNull();
  });

  it("shows a wrong password and an expired offer on the form", () => {
    expect(ssoLinkFormOutcome({ message: "access_denied" })).toEqual({
      error: "access_denied",
      kind: "field",
    });
    expect(ssoLinkFormOutcome({ message: "invalid_token" })).toEqual({
      error: "invalid_token",
      kind: "field",
    });
  });

  it("toasts a server failure", () => {
    expect(ssoLinkFormOutcome({ message: "Internal Server Error" })).toEqual({
      kind: "toast",
    });
  });
});
