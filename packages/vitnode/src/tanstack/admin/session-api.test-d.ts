import { describe, expectTypeOf, it } from "vitest";

import type { AdminSessionApi, AdminUser } from "./session-api";

describe("AdminSessionApi, decoupled from the server-only read", () => {
  it("is the admin session payload rather than unknown", () => {
    expectTypeOf<AdminSessionApi>().not.toBeUnknown();
    expectTypeOf<AdminSessionApi>().not.toBeAny();
    expectTypeOf<AdminSessionApi>().toHaveProperty("user");
    expectTypeOf<AdminSessionApi>().toHaveProperty("permissions");
  });

  it("still names the administrator behind AdminUser", () => {
    expectTypeOf<AdminUser>().not.toBeUnknown();
    expectTypeOf<AdminUser>().toHaveProperty("id");
  });
});
