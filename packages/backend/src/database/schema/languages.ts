import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const core_languages = pgTable(
  'core_languages',
  {
    id: serial('id').primaryKey(),
    code: varchar('code', { length: 32 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    timezone: varchar('timezone', { length: 255 }).notNull().default('UTC'),
    protected: boolean('protected').notNull().default(false),
    default: boolean('default').notNull().default(false),
    enabled: boolean('enabled').notNull().default(true),
    created: timestamp('created').notNull().defaultNow(),
    updated: timestamp('updated').notNull().defaultNow(),
    time_24: boolean('time_24').notNull().default(false),
    locale: varchar('locale', { length: 50 }).notNull().default('en'),
    allow_in_input: boolean('allow_in_input').default(true).notNull(),
    site_copyright: varchar('site_copyright', {
      length: 255,
    }).default(''),
  },
  table => ({
    code_idx: index('core_languages_code_idx').on(table.code),
    name_idx: index('core_languages_name_idx').on(table.name),
  }),
);

export const core_languages_words = pgTable(
  'core_languages_words',
  {
    id: serial('id').primaryKey(),
    language_code: varchar('language_code')
      .notNull()
      .references(() => core_languages.code, {
        onDelete: 'cascade',
      }),
    plugin_code: varchar('plugin_code', { length: 50 }).notNull(),
    item_id: integer('item_id').notNull(),
    value: text('value').notNull(),
    table_name: varchar('table_name', { length: 255 }).notNull(),
    variable: varchar('variable', { length: 255 }).notNull(),
  },
  table => ({
    language_code_idx: index('core_languages_words_lang_code_idx').on(
      table.language_code,
    ),
  }),
);

export const core_languages_words_relations = relations(
  core_languages_words,
  ({ one }) => ({
    language: one(core_languages, {
      fields: [core_languages_words.language_code],
      references: [core_languages.code],
    }),
  }),
);
