import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

import { core_groups } from "./groups";
import { core_files_avatars } from "./files";

export const core_users = pgTable(
  "core_users",
  {
    id: serial("id").primaryKey(),
    name_seo: varchar("name_seo", { length: 255 }).unique(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    joined: timestamp("joined").notNull().defaultNow(),
    posts: integer("posts").notNull().default(0),
    newsletter: boolean("newsletter").notNull().default(false),
    avatar_color: varchar("avatar_color", { length: 6 }).notNull(),
    group_id: integer("group_id").references(() => core_groups.id)
  },
  table => ({
    name_seo_idx: index("core_users_name_seo_idx").on(table.name_seo),
    name_idx: index("core_users_name_idx").on(table.name),
    email_idx: index("core_users_email_idx").on(table.email)
  })
);

export const core_users_relations = relations(core_users, ({ one }) => ({
  group: one(core_groups, {
    fields: [core_users.group_id],
    references: [core_groups.id]
  }),
  avatar: one(core_files_avatars, {
    fields: [core_users.id],
    references: [core_files_avatars.user_id]
  })
}));
