import {
  bigint,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { core_users } from './users';

export const core_files = pgTable(
  'core_files',
  {
    id: serial('id').primaryKey(),
    extension: varchar('extension', { length: 32 }).notNull(),
    file_alt: varchar('file_alt', { length: 255 }),
    file_name: varchar('file_name', { length: 255 }).notNull(),
    file_name_original: varchar('file_name_original', {
      length: 255,
    }).notNull(),
    dir_folder: varchar('dir_folder', { length: 255 }).notNull(),
    user_id: integer('user_id')
      .notNull()
      .references(() => core_users.id, {
        onDelete: 'cascade',
      }),
    created: timestamp('created').notNull().defaultNow(),
    file_size: integer('file_size').notNull(),
    mimetype: varchar('mimetype', { length: 255 }).notNull(),
    width: integer('width'),
    height: integer('height'),
    security_key: varchar('security_key', { length: 255 }),
  },
  table => ({
    user_id_idx: index('core_files_user_id_idx').on(table.user_id),
  }),
);

export const core_files_relations = relations(core_files, ({ many, one }) => ({
  user: one(core_users, {
    fields: [core_files.user_id],
    references: [core_users.id],
  }),
  using: many(core_files_using),
}));

export const core_files_using = pgTable(
  'core_files_using',
  {
    id: serial('id').primaryKey(),
    file_id: integer('file_id')
      .notNull()
      .references(() => core_files.id),
    plugin: varchar('plugin', { length: 255 }).notNull(),
    folder: varchar('folder', { length: 255 }).notNull(),
  },
  table => ({
    file_id_idx: index('core_files_using_file_id_idx').on(table.file_id),
  }),
);

export const core_files_using_relations = relations(
  core_files_using,
  ({ one }) => ({
    file: one(core_files, {
      fields: [core_files_using.file_id],
      references: [core_files.id],
    }),
  }),
);

export const core_migrations = pgTable('core_migrations', {
  id: serial('id').primaryKey(),
  hash: text('hash').notNull(),
  plugin: varchar('plugin', { length: 255 }).notNull(),
  created_migration: bigint('created_migration', { mode: 'bigint' }),
  created: timestamp('created').notNull().defaultNow(),
});
