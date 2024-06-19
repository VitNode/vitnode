import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { blog_articles } from "./articles";

import { core_languages } from "@/plugins/core/admin/database/schema/languages";
import { core_groups } from "@/plugins/core/admin/database/schema/groups";

export const blog_categories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  created: timestamp("created").notNull().defaultNow(),
  position: integer("position").notNull().default(0),
  color: varchar("color", { length: 30 }).notNull().default(""),
  can_all_read: boolean("can_all_read").notNull().default(true),
  can_all_create: boolean("can_all_create").notNull().default(true),
  can_all_reply: boolean("can_all_reply").notNull().default(true),
  can_all_download_files: boolean("can_all_download_files")
    .notNull()
    .default(true)
});

export const blog_categories_relations = relations(
  blog_categories,
  ({ many }) => ({
    articles: many(blog_articles),
    name: many(blog_categories_name),
    description: many(blog_categories_description),
    permissions: many(blog_categories_permissions)
  })
);

export const blog_categories_name = pgTable(
  "blog_categories_name",
  {
    id: serial("id").primaryKey(),
    item_id: integer("item_id").references(() => blog_categories.id, {
      onDelete: "cascade"
    }),
    language_code: varchar("language_code")
      .notNull()
      .references(() => core_languages.code, {
        onDelete: "cascade"
      }),
    value: varchar("value", { length: 100 }).notNull()
  },
  table => ({
    item_id_idx: index("blog_categories_name_item_id_idx").on(table.item_id),
    language_code_idx: index("blog_categories_name_language_code_idx").on(
      table.language_code
    )
  })
);

export const blog_categories_name_relations = relations(
  blog_categories_name,
  ({ one }) => ({
    category: one(blog_categories, {
      fields: [blog_categories_name.item_id],
      references: [blog_categories.id]
    })
  })
);

export const blog_categories_description = pgTable(
  "blog_categories_description",
  {
    id: serial("id").primaryKey(),
    item_id: integer("item_id").references(() => blog_categories.id, {
      onDelete: "cascade"
    }),
    language_code: varchar("language_code")
      .notNull()
      .references(() => core_languages.code, {
        onDelete: "cascade"
      }),
    value: varchar("value").notNull()
  },
  table => ({
    item_id_idx: index("blog_categories_description_item_id_idx").on(
      table.item_id
    ),
    language_code_idx: index(
      "blog_categories_description_language_code_idx"
    ).on(table.language_code)
  })
);

export const blog_categories_description_relations = relations(
  blog_categories_description,
  ({ one }) => ({
    category: one(blog_categories, {
      fields: [blog_categories_description.item_id],
      references: [blog_categories.id]
    })
  })
);

export const blog_categories_permissions = pgTable(
  "blog_categories_permissions",
  {
    id: serial("id").primaryKey(),
    blog_id: integer("blog_id").references(() => blog_categories.id, {
      onDelete: "cascade"
    }),
    group_id: integer("group_id").references(() => core_groups.id, {
      onDelete: "cascade"
    }),
    can_read: boolean("can_read").notNull().default(false),
    can_create: boolean("can_create").notNull().default(false),
    can_reply: boolean("can_reply").notNull().default(false),
    can_download_files: boolean("can_download_files").notNull().default(false)
  },
  table => ({
    blog_id_idx: index("blog_categories_permissions_blog_id_idx").on(
      table.blog_id
    ),
    group_id_idx: index("blog_categories_permissions_group_id_idx").on(
      table.group_id
    )
  })
);
