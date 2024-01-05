import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { core_users } from './users';

export const core_sessions = pgTable('core_sessions', {
  login_token: varchar('login_token', { length: 255 }).primaryKey(),
  user_id: varchar('user_id')
    .notNull()
    .references(() => core_users.id, {
      onDelete: 'cascade'
    }),
  last_seen: integer('last_seen').notNull(),
  expires: integer('expires').notNull()
});

export const relations_core_sessions = relations(core_sessions, ({ many, one }) => ({
  user: one(core_users, {
    fields: [core_sessions.user_id],
    references: [core_users.id]
  }),
  sessions: many(core_sessions_known_devices)
}));

export const core_sessions_known_devices = pgTable('core_sessions_known_devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  session_id: varchar('session_id')
    .notNull()
    .references(() => core_sessions.login_token, {
      onDelete: 'cascade'
    }),
  ip_address: varchar('ip_address', { length: 255 }),
  user_agent: text('user_agent').notNull(),
  uagent_browser: varchar('uagent_browser', { length: 200 }).notNull(),
  uagent_version: varchar('uagent_version', { length: 100 }).notNull(),
  uagent_os: varchar('uagent_os', { length: 100 }).notNull(),
  uagent_device_vendor: varchar('uagent_device_vendor', { length: 200 }),
  uagent_device_type: varchar('uagent_device_type', { length: 200 }),
  uagent_device_model: varchar('uagent_device_model', { length: 200 }),
  last_seen: integer('last_seen').notNull()
});

export const relations_core_sessions_known_devices = relations(
  core_sessions_known_devices,
  ({ one }) => ({
    session: one(core_sessions, {
      fields: [core_sessions_known_devices.session_id],
      references: [core_sessions.login_token]
    })
  })
);
