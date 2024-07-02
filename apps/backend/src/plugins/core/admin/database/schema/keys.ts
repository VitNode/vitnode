import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const core_users_password_keys = pgTable('core_keys', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  key: varchar('key', { length: 32 }).notNull().unique(),
});
