import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  varchar
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { core_groups } from "./groups";
import { core_users } from "./users";

export const core_admin_permissions = pgTable(
  "core_admin_permissions",
  {
    id: serial("id").primaryKey(),
    group_id: integer("group_id").references(() => core_groups.id, {
      onDelete: "cascade"
    }),
    user_id: integer("user_id").references(() => core_users.id, {
      onDelete: "cascade"
    }),
    unrestricted: boolean("unrestricted").notNull().default(false),
    created: integer("created").notNull(),
    updated: integer("updated").notNull(),
    protected: boolean("protected").notNull().default(false)
  },
  table => ({
    group_id_idx: index("core_admin_permissions_group_id_idx").on(
      table.group_id
    ),
    user_id_idx: index("core_admin_permissions_user_id_idx").on(table.user_id)
  })
);

export const core_admin_permissions_relations = relations(
  core_admin_permissions,
  ({ one }) => ({
    group: one(core_groups, {
      fields: [core_admin_permissions.group_id],
      references: [core_groups.id]
    }),
    user: one(core_users, {
      fields: [core_admin_permissions.user_id],
      references: [core_users.id]
    })
  })
);

export const core_admin_sessions = pgTable(
  "core_admin_sessions",
  {
    login_token: varchar("login_token", { length: 255 }).primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => core_users.id, {
        onDelete: "cascade"
      }),
    last_seen: integer("last_seen").notNull(),
    expires: integer("expires").notNull()
  },
  table => ({
    login_token_idx: index("core_admin_sessions_login_token_idx").on(
      table.login_token
    ),
    user_id_idx: index("core_admin_sessions_user_id_idx").on(table.user_id)
  })
);

export const core_admin_sessions_relations = relations(
  core_admin_sessions,
  ({ one }) => ({
    user: one(core_users, {
      fields: [core_admin_sessions.user_id],
      references: [core_users.id]
    })
  })
);
