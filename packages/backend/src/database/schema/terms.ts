import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { core_languages } from './languages';

export const core_terms = pgTable('core_terms', {
  id: serial('id').primaryKey(),
  code: varchar('code').notNull().unique(),
  created: timestamp('created').notNull().defaultNow(),
  updated: timestamp('updated').notNull().defaultNow(),
  href: varchar('href'),
});

export const core_terms_relations = relations(core_terms, ({ many }) => ({
  title: many(core_terms_title),
  content: many(core_terms_content),
}));

export const core_terms_title = pgTable('core_terms_title', {
  id: serial('id').primaryKey(),
  item_id: integer('item_id').references(() => core_terms.id, {
    onDelete: 'cascade',
  }),
  language_code: varchar('language_code')
    .notNull()
    .references(() => core_languages.code, {
      onDelete: 'cascade',
    }),
  value: varchar('value').notNull(),
});

export const core_terms_title_relations = relations(
  core_terms_title,
  ({ one }) => ({
    file: one(core_terms, {
      fields: [core_terms_title.item_id],
      references: [core_terms.id],
    }),
  }),
);

export const core_terms_content = pgTable('core_terms_content', {
  id: serial('id').primaryKey(),
  item_id: integer('item_id').references(() => core_terms.id, {
    onDelete: 'cascade',
  }),
  language_code: varchar('language_code')
    .notNull()
    .references(() => core_languages.code, {
      onDelete: 'cascade',
    }),
  value: text('value').notNull(),
});

export const core_terms_content_relations = relations(
  core_terms_content,
  ({ one }) => ({
    item: one(core_terms, {
      fields: [core_terms_content.item_id],
      references: [core_terms.id],
    }),
  }),
);
