import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const core_terms = pgTable('core_terms', {
  id: serial('id').primaryKey(),
  code: varchar('code').notNull().unique(),
  created: timestamp('created').notNull().defaultNow(),
  updated: timestamp('updated').notNull().defaultNow(),
  href: varchar('href'),
});
