import { index, pgTable } from 'drizzle-orm/pg-core';

export const core_nav = pgTable(
  'core_nav',
  t => ({
    id: t.serial().primaryKey(),
    href: t.varchar({ length: 255 }).notNull(),
    external: t.boolean().notNull().default(false),
    position: t.integer().notNull().default(0),
    // ! Warning: this is a recursive relation. It's not supported by drizzle-orm yet.
    parent_id: t.integer().notNull().default(0),
  }),
  table => ({
    parent_id_idx: index('core_nav_parent_id_idx').on(table.parent_id),
  }),
);
