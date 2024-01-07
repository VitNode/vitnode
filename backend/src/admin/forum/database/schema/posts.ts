import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { forum_forums } from './forums';
import { forum_topics, forum_topics_logs } from './topics';

import { core_users } from '@/src/admin/core/database/schema/users';
import { core_languages } from '@/src/admin/core/database/schema/languages';

export const forum_posts = pgTable('forum_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  topic_id: uuid('topic_id').references(() => forum_topics.id, {
    onDelete: 'cascade'
  }),
  user_id: varchar('user_id').references(() => core_users.id, {
    onDelete: 'cascade'
  }),
  ip_address: varchar('ip_address', { length: 45 }),
  created: integer('created').notNull(),
  updated: integer('updated').notNull()
});

export const relations_forum_posts = relations(forum_posts, ({ many, one }) => ({
  topic: one(forum_forums, {
    fields: [forum_posts.topic_id],
    references: [forum_forums.id]
  }),
  user: one(core_users, {
    fields: [forum_posts.user_id],
    references: [core_users.id]
  }),
  content: many(forum_posts_content)
}));

export const forum_posts_content = pgTable('forum_posts_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  topic_id: uuid('topic_id').references(() => forum_forums.id, {
    onDelete: 'cascade'
  }),
  language_id: varchar('language_id')
    .notNull()
    .references(() => core_languages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const forum_posts_timeline = pgTable('forum_posts_timeline', {
  id: uuid('id').defaultRandom().primaryKey(),
  post_id: uuid('post_id').references(() => forum_posts.id, {
    onDelete: 'cascade'
  }),
  log: text('log'),
  topic_log_id: uuid('topic_log_id').references(() => forum_topics_logs.id, {
    onDelete: 'cascade'
  }),
  created: integer('created').notNull()
});

export const relations_forum_posts_timeline = relations(forum_posts_timeline, ({ many, one }) => ({
  post: one(forum_posts, {
    fields: [forum_posts_timeline.post_id],
    references: [forum_posts.id]
  }),
  topic_log: one(forum_topics_logs, {
    fields: [forum_posts_timeline.topic_log_id],
    references: [forum_topics_logs.id]
  })
}));
