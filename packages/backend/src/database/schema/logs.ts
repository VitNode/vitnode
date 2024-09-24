import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const core_logs_email = pgTable('core_logs_email', {
  id: serial('id').primaryKey(),
  to: varchar('to', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  created: timestamp('created').notNull().defaultNow(),
  error: text('error'),
});
