import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

import { core_languages } from './languages';

export const core_nav = pgTable(
  'core_nav',
  {
    id: serial('id').primaryKey(),
    href: varchar('href', { length: 255 }).notNull(),
    external: boolean('external').notNull().default(false),
    position: integer('position').notNull().default(0),
    // ! Warning: this is a recursive relation. It's not supported by drizzle-orm yet.
    parent_id: integer('parent_id').notNull().default(0),
    icon: varchar('icon', { length: 50 }),
  },
  table => ({
    parent_id_idx: index('core_nav_parent_id_idx').on(table.parent_id),
  }),
);

export const core_nav_relations = relations(core_nav, ({ many, one }) => ({
  name: many(core_nav_name),
  description: many(core_nav_description),
  parent: one(core_nav, {
    fields: [core_nav.parent_id],
    references: [core_nav.id],
  }),
}));

export const core_nav_name = pgTable(
  'core_nav_name',
  {
    id: serial('id').primaryKey(),
    item_id: serial('item_id')
      .notNull()
      .references(() => core_nav.id, {
        onDelete: 'cascade',
      }),
    language_code: varchar('language_code')
      .notNull()
      .references(() => core_languages.code, {
        onDelete: 'cascade',
      }),
    value: varchar('value', { length: 100 }).notNull(),
  },
  table => ({
    item_id_idx: index('core_nav_name_item_id_idx').on(table.item_id),
    language_code_idx: index('core_nav_name_language_code_idx').on(
      table.language_code,
    ),
  }),
);

export const core_nav_name_relations = relations(core_nav_name, ({ one }) => ({
  nav: one(core_nav, {
    fields: [core_nav_name.item_id],
    references: [core_nav.id],
  }),
  language: one(core_languages, {
    fields: [core_nav_name.language_code],
    references: [core_languages.code],
  }),
}));

export const core_nav_description = pgTable(
  'core_nav_description',
  {
    id: serial('id').primaryKey(),
    item_id: serial('item_id')
      .notNull()
      .references(() => core_nav.id, {
        onDelete: 'cascade',
      }),
    language_code: varchar('language_code')
      .notNull()
      .references(() => core_languages.code, {
        onDelete: 'cascade',
      }),
    value: varchar('value', { length: 200 }).notNull(),
  },
  table => ({
    item_id_idx: index('core_nav_description_item_id_idx').on(table.item_id),
    language_code_idx: index('core_nav_description_language_code_idx').on(
      table.language_code,
    ),
  }),
);

export const core_nav_description_relations = relations(
  core_nav_description,
  ({ one }) => ({
    nav: one(core_nav, {
      fields: [core_nav_description.item_id],
      references: [core_nav.id],
    }),
    language: one(core_languages, {
      fields: [core_nav_description.language_code],
      references: [core_languages.code],
    }),
  }),
);
