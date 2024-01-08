import { boolean, integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { forum_forums } from './forums';
import { forum_posts } from './posts';

import { core_languages } from '@/src/admin/core/database/schema/languages';
import { core_users } from '@/src/admin/core/database/schema/users';

export const forum_topics = pgTable('forum_topics', {
  id: serial('id').primaryKey(),
  forum_id: serial('forum_id')
    .notNull()
    .references(() => forum_forums.id, {
      onDelete: 'cascade'
    }),
  created: integer('created').notNull(),
  ip_address: varchar('ip_address', { length: 45 }),
  locked: boolean('locked').notNull().default(false)
});

export const relations_forum_topics = relations(forum_topics, ({ many, one }) => ({
  forum: one(forum_forums, {
    fields: [forum_topics.forum_id],
    references: [forum_forums.id]
  }),
  title: many(forum_topics_titles),
  logs: many(forum_topics_logs),
  posts: many(forum_posts)
}));

export const forum_topics_titles = pgTable('forum_topics_titles', {
  topic_id: serial('topic_id')
    .notNull()
    .references(() => forum_topics.id, {
      onDelete: 'cascade'
    }),
  language_id: serial('language_id')
    .notNull()
    .references(() => core_languages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const forum_topics_logs_actions_enum = pgEnum('actions', ['lock', 'unlock']);

export const forum_topics_logs = pgTable('forum_topics_logs', {
  id: serial('id').primaryKey(),
  user_id: serial('user_id').references(() => core_users.id, {
    onDelete: 'cascade'
  }),
  ip_address: varchar('ip_address', { length: 45 }).notNull(),
  created: integer('created').notNull(),
  action: forum_topics_logs_actions_enum('action').notNull(),
  topic_id: serial('topic_id').references(() => forum_topics.id, {
    onDelete: 'cascade'
  })
});
