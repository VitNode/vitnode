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
  created: timestamp('created').notNull().defaultNow(),
  updated: timestamp('updated').notNull().defaultNow(),
});

export const core_terms_relations = relations(core_terms, ({ many }) => ({
  name: many(core_terms_content),
}));

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
