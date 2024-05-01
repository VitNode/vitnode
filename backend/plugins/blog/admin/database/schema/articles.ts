import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

import { blog_categories } from "./categories";

import { core_languages } from "@/plugins/core/admin/database/schema/languages";
import { core_users } from "@/plugins/core/admin/database/schema/users";

export const blog_articles = pgTable(
  "blog_articles",
  {
    id: serial("id").primaryKey(),
    author_id: integer("author_id").references(() => core_users.id, {
      onDelete: "cascade"
    }),
    category_id: integer("category_id").references(() => blog_categories.id, {
      onDelete: "cascade"
    }),
    created: timestamp("created").notNull().defaultNow(),
    update: timestamp("update").notNull().defaultNow(),
    ip_address: varchar("ip_address", { length: 45 })
  },
  table => ({
    author_id_idx: index("blog_articles_author_id_idx").on(table.author_id),
    category_id_idx: index("blog_articles_category_id_idx").on(
      table.category_id
    )
  })
);

export const blog_articles_relations = relations(
  blog_articles,
  ({ many, one }) => ({
    author: one(core_users, {
      fields: [blog_articles.author_id],
      references: [core_users.id]
    }),
    content: many(blog_articles_content),
    title: many(blog_articles_title),
    category: one(blog_categories, {
      fields: [blog_articles.category_id],
      references: [blog_categories.id]
    })
  })
);

export const blog_articles_content = pgTable(
  "blog_articles_content",
  {
    id: serial("id").primaryKey(),
    item_id: integer("item_id").references(() => blog_articles.id, {
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
    item_id_idx: index("blog_articles_content_item_id_idx").on(table.item_id),
    language_code_idx: index("blog_articles_content_language_code_idx").on(
      table.language_code
    )
  })
);

export const blog_articles_content_relations = relations(
  blog_articles_content,
  ({ one }) => ({
    article: one(blog_articles, {
      fields: [blog_articles_content.item_id],
      references: [blog_articles.id]
    })
  })
);

export const blog_articles_title = pgTable(
  "blog_articles_title",
  {
    id: serial("id").primaryKey(),
    item_id: integer("item_id").references(() => blog_articles.id, {
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
    item_id_idx: index("blog_articles_title_item_id_idx").on(table.item_id),
    language_code_idx: index("blog_articles_title_language_code_idx").on(
      table.language_code
    )
  })
);

export const blog_articles_title_relations = relations(
  blog_articles_title,
  ({ one }) => ({
    article: one(blog_articles, {
      fields: [blog_articles_title.item_id],
      references: [blog_articles.id]
    })
  })
);
