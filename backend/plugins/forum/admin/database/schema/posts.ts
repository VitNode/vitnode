import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { forum_topics } from "./topics";

import { core_users } from "@/plugins/core/admin/database/schema/users";
import { core_languages } from "@/plugins/core/admin/database/schema/languages";

export const forum_posts = pgTable(
  "forum_posts",
  {
    id: serial("id").primaryKey(),
    topic_id: integer("topic_id").references(() => forum_topics.id, {
      onDelete: "cascade"
    }),
    user_id: integer("user_id").references(() => core_users.id, {
      onDelete: "cascade"
    }),
    ip_address: varchar("ip_address", { length: 45 }),
    created: timestamp("created").notNull().defaultNow(),
    update: timestamp("update").notNull().defaultNow()
  },
  table => ({
    topic_id_idx: index("forum_posts_topic_id_idx").on(table.topic_id),
    user_id_idx: index("forum_posts_user_id_idx").on(table.user_id)
  })
);

export const forum_posts_relations = relations(
  forum_posts,
  ({ many, one }) => ({
    topic: one(forum_topics, {
      fields: [forum_posts.topic_id],
      references: [forum_topics.id]
    }),
    user: one(core_users, {
      fields: [forum_posts.user_id],
      references: [core_users.id]
    }),
    content: many(forum_posts_content)
  })
);

export const forum_posts_content = pgTable(
  "forum_posts_content",
  {
    id: serial("id").primaryKey(),
    item_id: integer("item_id").references(() => forum_posts.id, {
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
    item_id_idx: index("forum_posts_content_item_id_idx").on(table.item_id),
    language_code_idx: index("forum_posts_content_language_code_idx").on(
      table.language_code
    )
  })
);

export const forum_posts_content_relations = relations(
  forum_posts_content,
  ({ one }) => ({
    post: one(forum_posts, {
      fields: [forum_posts_content.item_id],
      references: [forum_posts.id]
    }),
    language: one(core_languages, {
      fields: [forum_posts_content.language_code],
      references: [core_languages.code]
    })
  })
);
