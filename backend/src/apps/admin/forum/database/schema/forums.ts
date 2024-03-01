import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  varchar
} from "drizzle-orm/pg-core";

import { forum_topics } from "./topics";

import { core_groups } from "@/apps/admin/core/database/schema/groups";
import { core_languages } from "@/apps/admin/core/database/schema/languages";

export const forum_forums = pgTable(
  "forum_forums",
  {
    id: serial("id").primaryKey(),
    created: integer("created").notNull(),
    // ! Warning: this is a recursive relation. It's not supported by drizzle-orm yet.
    parent_id: integer("parent_id"),
    position: integer("position").notNull().default(0),
    can_all_view: boolean("can_all_view").notNull().default(false),
    can_all_read: boolean("can_all_read").notNull().default(false),
    can_all_create: boolean("can_all_create").notNull().default(false),
    can_all_reply: boolean("can_all_reply").notNull().default(false)
  },
  table => ({
    parent_id_idx: index("forum_forums_parent_id_idx").on(table.parent_id)
  })
);

export const forum_forums_relations = relations(
  forum_forums,
  ({ many, one }) => ({
    parent: one(forum_forums, {
      fields: [forum_forums.parent_id],
      references: [forum_forums.id]
    }),
    name: many(forum_forums_name),
    description: many(forum_forums_description),
    permissions: many(forum_forums_permissions),
    topics: many(forum_topics)
  })
);

export const forum_forums_name = pgTable(
  "forum_forums_name",
  {
    id: serial("id").primaryKey(),
    forum_id: integer("forum_id")
      .notNull()
      .references(() => forum_forums.id, {
        onDelete: "cascade"
      }),
    language_code: varchar("language_code")
      .notNull()
      .references(() => core_languages.code, {
        onDelete: "cascade"
      }),
    value: varchar("value", { length: 50 }).notNull()
  },
  table => ({
    forum_id_idx: index("forum_forums_name_forum_id_idx").on(table.forum_id),
    language_code_idx: index("forum_forums_name_language_code_idx").on(
      table.language_code
    )
  })
);

export const forum_forums_name_relations = relations(
  forum_forums_name,
  ({ one }) => ({
    forum: one(forum_forums, {
      fields: [forum_forums_name.forum_id],
      references: [forum_forums.id]
    }),
    language: one(core_languages, {
      fields: [forum_forums_name.language_code],
      references: [core_languages.id]
    })
  })
);

export const forum_forums_description = pgTable(
  "forum_forums_description",
  {
    id: serial("id").primaryKey(),
    forum_id: integer("forum_id")
      .notNull()
      .references(() => forum_forums.id, {
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
    forum_id_idx: index("forum_forums_description_forum_id_idx").on(
      table.forum_id
    ),
    language_code_idx: index("forum_forums_description_language_code_idx").on(
      table.language_code
    )
  })
);

export const forum_forums_description_relations = relations(
  forum_forums_description,
  ({ one }) => ({
    forum: one(forum_forums, {
      fields: [forum_forums_description.forum_id],
      references: [forum_forums.id]
    }),
    language: one(core_languages, {
      fields: [forum_forums_description.language_code],
      references: [core_languages.id]
    })
  })
);

export const forum_forums_permissions = pgTable(
  "forum_forums_permissions",
  {
    id: serial("id").primaryKey(),
    forum_id: integer("forum_id").references(() => forum_forums.id, {
      onDelete: "cascade"
    }),
    group_id: integer("group_id").references(() => core_groups.id, {
      onDelete: "cascade"
    }),
    can_view: boolean("can_view").notNull().default(false),
    can_read: boolean("can_read").notNull().default(false),
    can_create: boolean("can_create").notNull().default(false),
    can_reply: boolean("can_reply").notNull().default(false)
  },
  table => ({
    forum_id_idx: index("forum_forums_permissions_forum_id_idx").on(
      table.forum_id
    ),
    group_id_idx: index("forum_forums_permissions_group_id_idx").on(
      table.group_id
    )
  })
);

export const forum_forums_permissions_relations = relations(
  forum_forums_permissions,
  ({ one }) => ({
    forum: one(forum_forums, {
      fields: [forum_forums_permissions.forum_id],
      references: [forum_forums.id]
    }),
    group: one(core_groups, {
      fields: [forum_forums_permissions.group_id],
      references: [core_groups.id]
    })
  })
);
