import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const core_groups = pgTable('core_groups', {
  id: serial('id').primaryKey(),
  created: timestamp('created').notNull().defaultNow(),
  updated: timestamp('updated').notNull().defaultNow(),
  protected: boolean('protected').notNull().default(false),
  default: boolean('default').notNull().default(false),
  root: boolean('root').notNull().default(false),
  guest: boolean('guest').notNull().default(false),
  color: varchar('color', { length: 19 }),
  files_allow_upload: boolean('files_allow_upload').notNull().default(true),
  files_total_max_storage: integer('files_total_max_storage')
    .notNull()
    .default(500000),
  files_max_storage_for_submit: integer('files_max_storage_for_submit')
    .notNull()
    .default(10000),
});
