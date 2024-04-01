import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { core_users } from "./users";
import { core_admin_sessions } from "./admins";
export const core_sessions = pgTable(
  "core_sessions",
  {
    login_token: varchar("login_token", { length: 255 }).primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => core_users.id, {
        onDelete: "cascade"
      }),
    last_seen: timestamp("last_seen").notNull().defaultNow(),
    expires: timestamp("expires").notNull(),
    device_id: integer("device_id")
      .references(() => core_sessions_known_devices.id, {
        onDelete: "cascade"
      })
      .notNull()
  },
  (table) => ({
    user_id_idx: index("core_sessions_user_id_idx").on(table.user_id)
  })
);

export const core_sessions_relations = relations(core_sessions, ({ one }) => ({
  user: one(core_users, {
    fields: [core_sessions.user_id],
    references: [core_users.id]
  }),
  device: one(core_sessions_known_devices, {
    fields: [core_sessions.device_id],
    references: [core_sessions_known_devices.id]
  })
}));

export const core_sessions_known_devices = pgTable(
  "core_sessions_known_devices",
  {
    id: serial("id").primaryKey(),
    ip_address: varchar("ip_address", { length: 255 }),
    user_agent: text("user_agent").notNull(),
    uagent_browser: varchar("uagent_browser", { length: 200 }).notNull(),
    uagent_version: varchar("uagent_version", { length: 100 }).notNull(),
    uagent_os: varchar("uagent_os", { length: 100 }).notNull(),
    uagent_device_vendor: varchar("uagent_device_vendor", { length: 200 }),
    uagent_device_model: varchar("uagent_device_model", { length: 200 }),
    last_seen: timestamp("last_seen").notNull().defaultNow()
  }
);

export const core_sessions_known_devices_relations = relations(
  core_sessions_known_devices,
  ({ one }) => ({
    session: one(core_sessions, {
      fields: [core_sessions_known_devices.id],
      references: [core_sessions.device_id]
    }),
    admin_session: one(core_admin_sessions, {
      fields: [core_sessions_known_devices.id],
      references: [core_admin_sessions.device_id]
    })
  })
);
