import { PgDialect } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import { describe, expect, it } from "vitest";

import { isOrphanedDevice } from "./clean.cron";

describe("isOrphanedDevice", () => {
  it("keeps devices referenced by public or admin sessions", () => {
    const { sql } = new PgDialect().sqlToQuery(
      isOrphanedDevice(drizzle.mock()),
    );

    expect(sql.match(/not exists/g)).toHaveLength(2);
    expect(sql).toContain('from "core_sessions"');
    expect(sql).toContain('from "core_admin_sessions"');
    expect(sql).toContain(
      '"core_sessions"."deviceId" = "core_sessions_known_devices"."id"',
    );
    expect(sql).toContain(
      '"core_admin_sessions"."deviceId" = "core_sessions_known_devices"."id"',
    );
  });
});
