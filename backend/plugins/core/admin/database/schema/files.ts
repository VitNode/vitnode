import {
  index,
  integer,
  pgTable,
  serial,
  text,
  varchar
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { core_users } from "./users";

export const core_files = pgTable(
  "core_files",
  {
    id: serial("id").primaryKey(),
    extension: varchar("extension", { length: 32 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    url: varchar("url", { length: 255 }).notNull(),
    user_id: integer("user_id")
      .notNull()
      .references(() => core_users.id, {
        onDelete: "cascade"
      }),
    created: integer("created").notNull(),
    file_size: integer("file_size").notNull(),
    position: integer("position").notNull().default(0),
    description: text("description"),
    module: varchar("module", { length: 255 }),
    module_id: varchar("module_id", { length: 255 }),
    mimetype: varchar("mimetype", { length: 255 })
  },
  (table) => ({
    user_id_idx: index("core_files_user_id_idx").on(table.user_id)
  })
);

export const core_files_relations = relations(core_files, ({ one }) => ({
  user: one(core_users, {
    fields: [core_files.user_id],
    references: [core_users.id]
  })
}));

export const core_files_avatars = pgTable("core_files_avatars", {
  id: serial("id").primaryKey(),
  dir_folder: varchar("dir_folder", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  created: integer("created").notNull(),
  file_size: integer("file_size").notNull(),
  mimetype: varchar("mimetype", { length: 255 }).notNull(),
  extension: varchar("extension", { length: 32 }).notNull(),
  user_id: integer("user_id").references(() => core_users.id, {
    onDelete: "cascade"
  })
});

export const core_files_avatars_relations = relations(
  core_files_avatars,
  ({ one }) => ({
    user: one(core_users, {
      fields: [core_files_avatars.user_id],
      references: [core_users.id]
    })
  })
);
