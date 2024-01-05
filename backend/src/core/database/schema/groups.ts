import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { coreLanguages } from './languages';

export const coreGroups = pgTable('core_groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  created: integer('created').notNull(),
  updated: integer('updated').notNull(),
  protected: boolean('protected').notNull().default(false),
  default: boolean('default').notNull().default(false),
  root: boolean('root').notNull().default(false),
  guest: boolean('guest').notNull().default(false)
});

export const relationsCoreGroups = relations(coreGroups, ({ many }) => ({
  name: many(coreGroupsNames)
}));

export const coreGroupsNames = pgTable('core_groups_names', {
  id: uuid('id').defaultRandom().primaryKey(),
  group_id: uuid('group_id')
    .notNull()
    .references(() => coreGroups.id, {
      onDelete: 'cascade'
    }),
  id_language: varchar('id_language', { length: 32 })
    .notNull()
    .references(() => coreLanguages.id, {
      onDelete: 'cascade'
    }),
  value: varchar('value', { length: 255 }).notNull()
});

export const relationsCoreGroupsNames = relations(coreGroupsNames, ({ one }) => ({
  group: one(coreGroups, {
    fields: [coreGroupsNames.group_id],
    references: [coreGroups.id]
  })
}));
