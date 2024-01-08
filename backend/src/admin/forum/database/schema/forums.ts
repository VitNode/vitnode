import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { core_groups } from '@/src/admin/core/database/schema/groups';
import { core_languages } from '@/src/admin/core/database/schema/languages';

export const forum_forums = pgTable('forum_forums', {
  id: serial('id').primaryKey(),
  created: integer('created').notNull(),
  // ! Warning: this is a recursive relation. It's not supported by drizzle-orm yet.
  parent_id: serial('parent_id'),
  position: integer('position').notNull().default(0),
  can_all_view: boolean('can_all_view').notNull().default(false),
  can_all_read: boolean('can_all_read').notNull().default(false),
  can_all_create: boolean('can_all_create').notNull().default(false),
  can_all_reply: boolean('can_all_reply').notNull().default(false)
});

export const relations_forum_forums = relations(forum_forums, ({ many, one }) => ({
  parent: one(forum_forums, {
    fields: [forum_forums.parent_id],
    references: [forum_forums.id]
  }),
  name: many(forum_forums_name),
  description: many(forum_forums_description),
  permissions: many(forum_forums_permissions)
}));

export const forum_forums_name = pgTable('forum_forums_name', {
  forum_id: serial('forum_id')
    .notNull()
    .references(() => forum_forums.id, {
      onDelete: 'cascade'
    }),
  language_code: varchar('language_code')
    .notNull()
    .references(() => core_languages.code, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const relations_forum_forums_name = relations(forum_forums_name, ({ one }) => ({
  forum: one(forum_forums, {
    fields: [forum_forums_name.forum_id],
    references: [forum_forums.id]
  }),
  language: one(core_languages, {
    fields: [forum_forums_name.language_code],
    references: [core_languages.id]
  })
}));

export const forum_forums_description = pgTable('forum_forums_description', {
  forum_id: serial('forum_id')
    .notNull()
    .references(() => forum_forums.id, {
      onDelete: 'cascade'
    }),
  language_code: varchar('language_code')
    .notNull()
    .references(() => core_languages.code, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const relations_forum_forums_description = relations(
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

export const forum_forums_permissions = pgTable('forum_forums_permissions', {
  forum_id: serial('forum_id').references(() => forum_forums.id, {
    onDelete: 'cascade'
  }),
  group_id: serial('group_id').references(() => core_groups.id, {
    onDelete: 'cascade'
  }),
  can_view: boolean('can_view').notNull().default(false),
  can_read: boolean('can_read').notNull().default(false),
  can_create: boolean('can_create').notNull().default(false),
  can_reply: boolean('can_reply').notNull().default(false)
});

export const relations_forum_forums_permissions = relations(
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
