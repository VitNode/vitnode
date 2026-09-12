import { afterEach, describe, expect, it } from "vitest";

import type { AdminTransport } from "./transport";

import { defaultAdminTransport } from "./default-transport";
import {
  adminTransport,
  hasAdminTransport,
  resetAdminTransport,
  setAdminTransport,
} from "./transport";

type TaggedTransport = AdminTransport & { readonly tag: string };

const transportOf = (tag: string): TaggedTransport => ({
  readAdminSession: async () => Promise.resolve({ status: "network_error" }),
  tag,
});

const tagOf = (transport: AdminTransport): string =>
  (transport as TaggedTransport).tag;

afterEach(() => {
  resetAdminTransport();
});

describe("an application that registers nothing", () => {
  it("still reads the session through the built-in default", () => {
    expect(adminTransport()).toBe(defaultAdminTransport);
    expect(adminTransport().readAdminSession).toBeTypeOf("function");
  });

  it("reports that nothing of its own is registered", () => {
    expect(hasAdminTransport()).toBe(false);
  });
});

describe("first registration", () => {
  it("hands back exactly what was registered", () => {
    const first = transportOf("first");

    setAdminTransport(first);

    expect(hasAdminTransport()).toBe(true);
    expect(adminTransport()).toBe(first);
  });

  it("takes precedence over the built-in default", () => {
    setAdminTransport(transportOf("custom"));

    expect(adminTransport()).not.toBe(defaultAdminTransport);
  });
});

describe("the same registration repeated", () => {
  it("is not an error, and changes nothing", () => {
    const same = transportOf("same");

    setAdminTransport(same);
    setAdminTransport(same);

    expect(adminTransport()).toBe(same);
  });
});

describe("a new registration after a hot reload", () => {
  it("accepts a legitimate replacement rather than throwing", () => {
    setAdminTransport(transportOf("before"));

    expect(() => {
      setAdminTransport(transportOf("after"));
    }).not.toThrow();
  });

  it("answers with the newer function, not the one it replaced", () => {
    const before = transportOf("before");
    const after = transportOf("after");

    setAdminTransport(before);
    setAdminTransport(after);

    expect(adminTransport()).toBe(after);
    expect(tagOf(adminTransport())).toBe("after");
  });

  it("leaves no caller holding the previous registration", () => {
    const before = transportOf("before");

    setAdminTransport(before);

    // A consumer that reads at call time, as every one in this package does.
    const readNow = () => adminTransport();

    expect(readNow()).toBe(before);

    const after = transportOf("after");

    setAdminTransport(after);

    expect(readNow()).toBe(after);
  });

  it("survives any number of replacements, holding only the last", () => {
    const registrations = ["a", "b", "c", "d"].map(transportOf);

    registrations.forEach(setAdminTransport);

    expect(adminTransport()).toBe(registrations.at(-1));
  });
});

describe("what the registry is not", () => {
  it("holds only what was handed to it, with no state of its own", () => {
    const transport = transportOf("only");

    setAdminTransport(transport);

    expect(Object.keys(adminTransport())).toEqual(Object.keys(transport));
    expect(adminTransport()).toBe(transport);
  });
});
