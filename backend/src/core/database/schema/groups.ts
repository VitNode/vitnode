import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { core_languages } from './languages';

export const core_groups = pgTable('core_groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  created: integer('created').notNull(),
  updated: integer('updated').notNull(),
  protected: boolean('protected').notNull().default(false),
  default: boolean('default').notNull().default(false),
  root: boolean('root').notNull().default(false),
  guest: boolean('guest').notNull().default(false)
});

export const relations_core_groups = relations(core_groups, ({ many }) => ({
  name: many(core_groups_names)
}));

export const core_groups_names = pgTable('core_groups_names', {
  id: uuid('id').defaultRandom().primaryKey(),
  group_id: uuid('group_id')
    .notNull()
    .references(() => core_groups.id, {
      onDelete: 'cascade'
    }),
  id_language: varchar('id_language', { length: 32 })
    .notNull()
    .references(() => core_languages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value', { length: 255 }).notNull()
});

export const relations_core_groups_names = relations(core_groups_names, ({ one }) => ({
  group: one(core_groups, {
    fields: [core_groups_names.group_id],
    references: [core_groups.id]
  })
}));
