import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { coreGroups } from '@/src/core/database/schema/groups';
import { coreLanguages } from '@/src/core/database/schema/languages';

export const forumForums = pgTable('forum_forums', {
  id: uuid('id').defaultRandom().primaryKey(),
  created: integer('created').notNull(),
  parent_id: uuid('parent_id').references(() => forumForums.id, {
    onDelete: 'cascade'
  }),
  position: integer('position').notNull().default(0),
  can_all_view: boolean('can_all_view').notNull().default(false),
  can_all_read: boolean('can_all_read').notNull().default(false),
  can_all_create: boolean('can_all_create').notNull().default(false),
  can_all_reply: boolean('can_all_reply').notNull().default(false)
});

export const relationsForumForums = relations(forumForums, ({ many, one }) => ({
  parent: one(forumForums, {
    fields: [forumForums.parent_id],
    references: [forumForums.id]
  }),
  name: many(forumForumsName),
  description: many(forumForumsDescription),
  permissions: many(forumForumsPermissions)
}));

export const forumForumsName = pgTable('forum_forums_name', {
  forum_id: uuid('forum_id')
    .notNull()
    .references(() => forumForums.id, {
      onDelete: 'cascade'
    }),
  id_language: varchar('id_language')
    .notNull()
    .references(() => coreLanguages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const forumForumsDescription = pgTable('forum_forums_description', {
  forum_id: uuid('forum_id')
    .notNull()
    .references(() => forumForums.id, {
      onDelete: 'cascade'
    }),
  id_language: varchar('id_language')
    .notNull()
    .references(() => coreLanguages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const forumForumsPermissions = pgTable('forum_forums_permissions', {
  forum_id: uuid('forum_id').references(() => forumForums.id, {
    onDelete: 'cascade'
  }),
  group_id: uuid('group_id').references(() => coreGroups.id, {
    onDelete: 'cascade'
  }),
  can_view: boolean('can_view').notNull().default(false),
  can_read: boolean('can_read').notNull().default(false),
  can_create: boolean('can_create').notNull().default(false),
  can_reply: boolean('can_reply').notNull().default(false)
});
