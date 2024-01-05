import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const tableForumPosts = pgTable('forum_posts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull()
});
