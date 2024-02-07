import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar
} from "drizzle-orm/pg-core";

export const core_themes = pgTable("core_themes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  version: varchar("version", { length: 255 }),
  version_code: integer("version_code"),
  created: integer("created").notNull(),
  support_url: varchar("support_url", { length: 255 }),
  protected: boolean("protected").notNull().default(false),
  author: varchar("author", { length: 50 }).notNull(),
  author_url: varchar("author_url", { length: 255 }).notNull(),
  default: boolean("default").notNull().default(false)
});
