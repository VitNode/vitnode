import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  varchar
} from "drizzle-orm/pg-core";

export const core_plugins = pgTable(
  "core_plugins",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 50 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", { length: 255 }),
    version: varchar("version", { length: 255 }),
    version_code: integer("version_code"),
    enabled: boolean("enabled").notNull().default(true),
    created: integer("created").notNull(),
    support_url: varchar("support_url", { length: 255 }),
    protected: boolean("protected").notNull().default(false),
    author: varchar("author", { length: 100 }).notNull(),
    author_url: varchar("author_url", { length: 255 }).notNull(),
    default: boolean("default").notNull().default(false),
    position: integer("position").notNull().default(0)
  },
  table => ({
    code_idx: index("core_plugins_code_idx").on(table.code),
    name_idx: index("core_plugins_name_idx").on(table.name)
  })
);

export const core_plugins_relations = relations(core_plugins, ({ many }) => ({
  versions: many(core_plugins_versions)
}));

export const core_plugins_versions = pgTable(
  "core_plugins_versions",
  {
    id: serial("id").primaryKey(),
    plugin_id: integer("plugin_id").notNull(),
    version: varchar("version", { length: 255 }).notNull(),
    version_code: integer("version_code"),
    updated: integer("updated").notNull()
  },
  table => ({
    plugin_id_idx: index("core_plugins_versions_plugin_id_idx").on(
      table.plugin_id
    )
  })
);
