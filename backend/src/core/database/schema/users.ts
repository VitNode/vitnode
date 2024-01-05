import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

import { coreGroups } from './groups';

export const coreUsers = pgTable('core_users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  joined: integer('joined').notNull(),
  posts: integer('posts').notNull().default(0),
  newsletter: boolean('newsletter').notNull().default(false),
  avatar_color: varchar('avatar_color', { length: 6 }).notNull(),
  group_id: uuid('group_id')
    .notNull()
    .references(() => coreGroups.id)
});

export const relationsCoreUsers = relations(coreUsers, ({ one }) => ({
  group: one(coreGroups, {
    fields: [coreUsers.group_id],
    references: [coreGroups.id]
  })
}));
