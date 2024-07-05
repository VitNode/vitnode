import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { core_groups } from './groups';
import { core_languages } from './languages';

export const core_users = pgTable(
  'core_users',
  {
    id: serial('id').primaryKey(),
    name_seo: varchar('name_seo', { length: 255 }).unique(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
    joined: timestamp('joined').notNull().defaultNow(),
    posts: integer('posts').notNull().default(0),
    newsletter: boolean('newsletter').notNull().default(false),
    avatar_color: varchar('avatar_color', { length: 6 }).notNull(),
    group_id: integer('group_id').references(() => core_groups.id),
    first_name: varchar('first_name', { length: 255 }),
    last_name: varchar('last_name', { length: 255 }),
    birthday: timestamp('birthday'),
    ip_address: varchar('ip_address', { length: 255 }).notNull(),
    language: varchar('language', { length: 5 })
      .notNull()
      .default('en')
      .references(() => core_languages.code, {
        onDelete: 'set default',
      }),
  },
  table => ({
    name_seo_idx: index('core_users_name_seo_idx').on(table.name_seo),
    name_idx: index('core_users_name_idx').on(table.name),
    email_idx: index('core_users_email_idx').on(table.email),
  }),
);

export const core_users_relations = relations(core_users, ({ one }) => ({
  group: one(core_groups, {
    fields: [core_users.group_id],
    references: [core_groups.id],
  }),
  avatar: one(core_files_avatars, {
    fields: [core_users.id],
    references: [core_files_avatars.user_id],
  }),
  language: one(core_languages, {
    fields: [core_users.language],
    references: [core_languages.code],
  }),
}));

export const core_files_avatars = pgTable('core_files_avatars', {
  id: serial('id').primaryKey(),
  dir_folder: varchar('dir_folder', { length: 255 }).notNull(),
  file_name: varchar('file_name', { length: 255 }).notNull(),
  created: timestamp('created').notNull().defaultNow(),
  file_size: integer('file_size').notNull(),
  mimetype: varchar('mimetype', { length: 255 }).notNull(),
  extension: varchar('extension', { length: 32 }).notNull(),
  user_id: integer('user_id').references(() => core_users.id, {
    onDelete: 'cascade',
  }),
});

export const core_files_avatars_relations = relations(
  core_files_avatars,
  ({ one }) => ({
    user: one(core_users, {
      fields: [core_files_avatars.user_id],
      references: [core_users.id],
    }),
  }),
);

export const core_users_pass_reset = pgTable('core_users_pass_reset', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => core_users.id, {
    onDelete: 'cascade',
  }),
  key: varchar('key', { length: 100 }).notNull().unique(),
  created: timestamp('created').notNull().defaultNow(),
  expires: timestamp('expires').notNull(),
});

export const core_users_pass_reset_relations = relations(
  core_users_pass_reset,
  ({ one }) => ({
    user: one(core_users, {
      fields: [core_users_pass_reset.user_id],
      references: [core_users.id],
    }),
  }),
);
