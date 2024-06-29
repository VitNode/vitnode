import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { core_languages } from './languages';

export const core_groups = pgTable('core_groups', {
  id: serial('id').primaryKey(),
  created: timestamp('created').notNull().defaultNow(),
  updated: timestamp('updated').notNull().defaultNow(),
  protected: boolean('protected').notNull().default(false),
  default: boolean('default').notNull().default(false),
  root: boolean('root').notNull().default(false),
  guest: boolean('guest').notNull().default(false),
  files_allow_upload: boolean('files_allow_upload').notNull().default(true),
  files_total_max_storage: integer('files_total_max_storage')
    .notNull()
    .default(500000),
  files_max_storage_for_submit: integer('files_max_storage_for_submit')
    .notNull()
    .default(10000),
});

export const core_groups_relations = relations(core_groups, ({ many }) => ({
  name: many(core_groups_names),
}));

export const core_groups_names = pgTable(
  'core_groups_names',
  {
    id: serial('id').primaryKey(),
    item_id: integer('item_id')
      .notNull()
      .references(() => core_groups.id, {
        onDelete: 'cascade',
      }),
    language_code: varchar('language_code')
      .notNull()
      .references(() => core_languages.code, {
        onDelete: 'cascade',
      }),
    value: varchar('value', { length: 255 }).notNull(),
  },
  table => ({
    item_id_idx: index('core_groups_names_item_id_idx').on(table.item_id),
    language_code_idx: index('core_groups_names_language_code_idx').on(
      table.language_code,
    ),
  }),
);

export const core_groups_names_relations = relations(
  core_groups_names,
  ({ one }) => ({
    group: one(core_groups, {
      fields: [core_groups_names.item_id],
      references: [core_groups.id],
    }),
  }),
);
