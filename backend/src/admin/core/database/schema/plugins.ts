import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const core_plugins = pgTable('core_plugins', {
  id: varchar('id').notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  version: varchar('version', { length: 255 }).notNull().default('1.0.0'),
  version_code: integer('version_code').notNull().default(10000),
  enabled: boolean('enabled').notNull().default(true),
  uploaded: integer('uploaded').notNull(),
  updated: integer('updated').notNull(),
  support: varchar('support', { length: 255 }),
  protected: boolean('protected').notNull().default(false),
  author: varchar('author', { length: 255 }).notNull(),
  author_url: varchar('author_url', { length: 255 }).notNull(),
  position: integer('position').notNull().default(0),
  default: boolean('default').notNull().default(false)
});
