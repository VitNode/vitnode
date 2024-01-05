import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { core_users } from './users';

export const core_attachments = pgTable('core_attachments', {
  id: uuid('id').defaultRandom().primaryKey(),
  extension: varchar('extension', { length: 32 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  user_id: varchar('user_id')
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

export const relations_core_attachments = relations(core_attachments, ({ one }) => ({
  user: one(core_users, {
    fields: [core_attachments.user_id],
    references: [core_users.id]
  })
}));
