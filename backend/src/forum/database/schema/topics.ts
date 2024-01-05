import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { forumForums } from './forums';

import { coreLanguages } from '@/src/core/database/schema/languages';

export const forumTopics = pgTable('forum_topics', {
  id: uuid('id').defaultRandom().primaryKey(),
  forum_id: uuid('forum_id')
    .notNull()
    .references(() => forumForums.id, {
      onDelete: 'cascade'
    }),
  created: integer('created').notNull(),
  ip_address: varchar('ip_address', { length: 45 }),
  locked: boolean('locked').notNull().default(false)
});

export const relationsForumTopics = relations(forumTopics, ({ many, one }) => ({
  forum: one(forumForums, {
    fields: [forumTopics.forum_id],
    references: [forumForums.id]
  }),
  title: many(forumTopicsTitle)
}));

export const forumTopicsTitle = pgTable('forum_topics_title', {
  topic_id: uuid('topic_id')
    .notNull()
    .references(() => forumTopics.id, {
      onDelete: 'cascade'
    }),
  id_language: varchar('id_language')
    .notNull()
    .references(() => coreLanguages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});
