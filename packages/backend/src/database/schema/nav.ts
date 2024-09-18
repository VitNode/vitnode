import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const core_nav = pgTable(
  'core_nav',
  {
    id: serial('id').primaryKey(),
    href: varchar('href', { length: 255 }).notNull(),
    external: boolean('external').notNull().default(false),
    position: integer('position').notNull().default(0),
    // ! Warning: this is a recursive relation. It's not supported by drizzle-orm yet.
    parent_id: integer('parent_id').notNull().default(0),
  },
  table => ({
    parent_id_idx: index('core_nav_parent_id_idx').on(table.parent_id),
  }),
);
