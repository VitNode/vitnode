import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { core_users } from './users';

export const core_files = pgTable('core_files', {
  id: serial('id').primaryKey(),
  extension: varchar('extension', { length: 32 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  user_id: serial('user_id')
    .notNull()
    .references(() => core_users.id, {
      onDelete: 'cascade'
    }),
  created: integer('created').notNull(),
  file_size: integer('file_size').notNull(),
  position: integer('position').notNull().default(0),
  description: text('description'),
  module: varchar('module', { length: 255 }),
  module_id: varchar('module_id', { length: 255 }),
  mimetype: varchar('mimetype', { length: 255 })
});

export const relations_core_files = relations(core_files, ({ one }) => ({
  user: one(core_users, {
    fields: [core_files.user_id],
    references: [core_users.id]
  })
}));

export const core_files_avatars = pgTable('core_files_avatars', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 255 }).notNull(),
  created: integer('created').notNull(),
  file_size: integer('file_size').notNull()
});

export const relations_core_files_avatars = relations(core_files_avatars, ({ one }) => ({
  user: one(core_users, {
    fields: [core_files_avatars.id],
    references: [core_users.avatar_id]
  })
}));

export const core_files_covers = pgTable('core_files_covers', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 255 }).notNull(),
  created: integer('created').notNull(),
  file_size: integer('file_size').notNull()
});

export const relations_core_files_covers = relations(core_files_covers, ({ one }) => ({
  user: one(core_users, {
    fields: [core_files_covers.id],
    references: [core_users.cover_id]
  })
}));
