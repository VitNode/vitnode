import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const core_plugins = pgTable(
  'core_plugins',
  {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 50 }).notNull(),
    name: varchar('name', { length: 50 }).notNull(),
    description: varchar('description', { length: 255 }),
    version: varchar('version', { length: 255 }).notNull().default('0.0.1'),
    version_code: integer('version_code').notNull().default(1),
    enabled: boolean('enabled').notNull().default(true),
    created: timestamp('created').notNull().defaultNow(),
    updated: timestamp('updated').notNull().defaultNow(),
    support_url: varchar('support_url', { length: 255 }).notNull(),
    author: varchar('author', { length: 100 }).notNull(),
    author_url: varchar('author_url', { length: 255 }),
    default: boolean('default').notNull().default(false),
    allow_default: boolean('allow_default').notNull().default(true),
  },
  table => ({
    code_idx: index('core_plugins_code_idx').on(table.code),
    name_idx: index('core_plugins_name_idx').on(table.name),
  }),
);
