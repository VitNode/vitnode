import { index, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { core_users } from "./users";

export const core_files = pgTable(
  "core_files",
  {
    id: serial("id").primaryKey(),
    extension: varchar("extension", { length: 32 }).notNull(),
    alt: varchar("alt", { length: 255 }).notNull(),
    dir_folder: varchar("dir_folder", { length: 255 }).notNull(),
    user_id: integer("user_id")
      .notNull()
      .references(() => core_users.id, {
        onDelete: "cascade"
      }),
    created: integer("created").notNull(),
    file_size: integer("file_size").notNull(),
    plugin: varchar("plugin", { length: 255 }).notNull(),
    mimetype: varchar("mimetype", { length: 255 }),
    width: integer("width"),
    height: integer("height"),
    security_key: varchar("security_key", { length: 255 })
  },
  table => ({
    user_id_idx: index("core_files_user_id_idx").on(table.user_id)
  })
);

export const core_files_relations = relations(core_files, ({ one }) => ({
  user: one(core_users, {
    fields: [core_files.user_id],
    references: [core_users.id]
  })
}));
