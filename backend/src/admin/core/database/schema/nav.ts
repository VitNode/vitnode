import { relations } from 'drizzle-orm';
import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { core_languages } from './languages';

export const core_nav = pgTable('core_nav', {
  id: serial('id').primaryKey(),
  href: varchar('href', { length: 255 }).notNull(),
  external: boolean('external').notNull().default(false)
});

export const core_nav_relations = relations(core_nav, ({ many }) => ({
  names: many(core_nav_names),
  description: many(core_nav_description)
}));

export const core_nav_names = pgTable('core_nav_names', {
  id: serial('id').primaryKey(),
  nav_id: serial('nav_id')
    .notNull()
    .references(() => core_nav.id, {
      onDelete: 'cascade'
    }),
  language_code: varchar('language_code')
    .notNull()
    .references(() => core_languages.code, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const core_nav_names_relations = relations(core_nav_names, ({ one }) => ({
  nav: one(core_nav, {
    fields: [core_nav_names.nav_id],
    references: [core_nav.id]
  }),
  language: one(core_languages, {
    fields: [core_nav_names.language_code],
    references: [core_languages.code]
  })
}));

export const core_nav_description = pgTable('core_nav_description', {
  id: serial('id').primaryKey(),
  nav_id: serial('nav_id')
    .notNull()
    .references(() => core_nav.id, {
      onDelete: 'cascade'
    }),
  language_code: varchar('language_code')
    .notNull()
    .references(() => core_languages.code, {
      onDelete: 'cascade'
    }),
  value: varchar('value').notNull()
});

export const core_nav_description_relations = relations(core_nav_description, ({ one }) => ({
  nav: one(core_nav, {
    fields: [core_nav_description.nav_id],
    references: [core_nav.id]
  }),
  language: one(core_languages, {
    fields: [core_nav_description.language_code],
    references: [core_languages.code]
  })
}));
