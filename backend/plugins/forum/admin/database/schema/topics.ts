import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { forum_forums } from "./forums";
import { forum_posts, forum_posts_timeline } from "./posts";

import { core_languages } from "@/plugins/core/admin/database/schema/languages";
import { core_users } from "@/plugins/core/admin/database/schema/users";

export const forum_topics = pgTable(
  "forum_topics",
  {
    id: serial("id").primaryKey(),
    forum_id: integer("forum_id")
      .notNull()
      .references(() => forum_forums.id, {
        onDelete: "cascade"
      }),
    created: timestamp("created").notNull().defaultNow(),
    ip_address: varchar("ip_address", { length: 45 }),
    locked: boolean("locked").notNull().default(false)
  },
  (table) => ({
    forum_id_idx: index("forum_topics_forum_id_idx").on(table.forum_id)
  })
);

export const forum_topics_relations = relations(
  forum_topics,
  ({ many, one }) => ({
    forum: one(forum_forums, {
      fields: [forum_topics.forum_id],
      references: [forum_forums.id]
    }),
    title: many(forum_topics_titles),
    logs: many(forum_topics_logs),
    posts: many(forum_posts),
    timeline: many(forum_posts_timeline)
  })
);

export const forum_topics_titles = pgTable(
  "forum_topics_titles",
  {
    id: serial("id").primaryKey(),
    topic_id: integer("topic_id")
      .notNull()
      .references(() => forum_topics.id, {
        onDelete: "cascade"
      }),
    language_code: varchar("language_code")
      .notNull()
      .references(() => core_languages.code, {
        onDelete: "cascade"
      }),
    value: varchar("value", { length: 100 }).notNull()
  },
  (table) => ({
    topic_id_idx: index("forum_topics_titles_topic_id_idx").on(table.topic_id),
    language_code_idx: index("forum_topics_titles_language_code_idx").on(
      table.language_code
    )
  })
);

export const forum_topics_titles_relations = relations(
  forum_topics_titles,
  ({ one }) => ({
    topic: one(forum_topics, {
      fields: [forum_topics_titles.topic_id],
      references: [forum_topics.id]
    }),
    language: one(core_languages, {
      fields: [forum_topics_titles.language_code],
      references: [core_languages.code]
    })
  })
);

export const forum_topics_logs_actions_enum = pgEnum("actions", [
  "lock",
  "unlock"
]);

export const forum_topics_logs = pgTable(
  "forum_topics_logs",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => core_users.id, {
      onDelete: "cascade"
    }),
    ip_address: varchar("ip_address", { length: 45 }).notNull(),
    created: timestamp("created").notNull().defaultNow(),
    action: forum_topics_logs_actions_enum("action").notNull(),
    topic_id: integer("topic_id").references(() => forum_topics.id, {
      onDelete: "cascade"
    })
  },
  (table) => ({
    user_id_idx: index("forum_topics_logs_user_id_idx").on(table.user_id),
    topic_id_idx: index("forum_topics_logs_topic_id_idx").on(table.topic_id)
  })
);

export const forum_topics_logs_relations = relations(
  forum_topics_logs,
  ({ one }) => ({
    user: one(core_users, {
      fields: [forum_topics_logs.user_id],
      references: [core_users.id]
    }),
    topic: one(forum_topics, {
      fields: [forum_topics_logs.topic_id],
      references: [forum_topics.id]
    })
  })
);
