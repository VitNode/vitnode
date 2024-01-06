import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { forum_forums } from './forums';

import { core_languages } from '@/src/core/database/schema/languages';

export const forum_topics = pgTable('forum_topics', {
  id: uuid('id').defaultRandom().primaryKey(),
  forum_id: uuid('forum_id')
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
  title: many(forum_topics_title)
}));

export const forum_topics_title = pgTable('forum_topics_title', {
  topic_id: uuid('topic_id')
    .notNull()
    .references(() => forum_topics.id, {
      onDelete: 'cascade'
    }),
  language_id: varchar('language_id')
    .notNull()
    .references(() => core_languages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});
