import { assertType, describe, expectTypeOf, it } from "vitest";

import type { SessionApi } from "./session-api";

describe("SessionApi, decoupled from the server-only read", () => {
  it("is the session route's own payload rather than unknown", () => {
    expectTypeOf<SessionApi>().not.toBeUnknown();
    expectTypeOf<SessionApi>().not.toBeAny();
    expectTypeOf<SessionApi>().toHaveProperty("user");
  });

  it("keeps the anonymous case in the type", () => {
    assertType<SessionApi>({ user: null });
  });

  it("names the signed-in user's fields", () => {
    expectTypeOf<NonNullable<SessionApi["user"]>>().toExtend<{
      email: string;
      id: number;
      isAdmin: boolean;
      name: string;
      nameCode: string;
    }>();
  });
});
