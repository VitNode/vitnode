import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

import { core_groups } from './groups';
import { core_files_avatars, core_files_covers } from './files';

export const core_users = pgTable('core_users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  joined: integer('joined').notNull(),
  posts: integer('posts').notNull().default(0),
  newsletter: boolean('newsletter').notNull().default(false),
  avatar_color: varchar('avatar_color', { length: 6 }).notNull(),
  group_id: uuid('group_id').references(() => core_groups.id),
  avatar_id: uuid('avatar_id').references(() => core_files_avatars.id),
  cover_id: uuid('cover_id').references(() => core_files_covers.id)
});

export const relations_core_users = relations(core_users, ({ one }) => ({
  group: one(core_groups, {
    fields: [core_users.group_id],
    references: [core_groups.id]
  }),
  avatar: one(core_files_avatars, {
    fields: [core_users.avatar_id],
    references: [core_files_avatars.id]
  }),
  cover: one(core_files_covers, {
    fields: [core_users.cover_id],
    references: [core_files_covers.id]
  })
}));
