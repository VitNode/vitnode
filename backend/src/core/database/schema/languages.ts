import { boolean, integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const core_languages = pgTable('core_languages', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  timezone: varchar('timezone', { length: 255 }).notNull().default('UTC'),
  protected: boolean('protected').notNull().default(false),
  default: boolean('default').notNull().default(false),
  enabled: boolean('enabled').notNull().default(true),
  created: integer('created').notNull()
});
