import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { coreUsers } from './users';

export const coreSessions = pgTable('core_sessions', {
  login_token: varchar('login_token', { length: 255 }).primaryKey(),
  user_id: varchar('user_id')
    .notNull()
    .references(() => coreUsers.id, {
      onDelete: 'cascade'
    }),
  last_seen: integer('last_seen').notNull(),
  expires: integer('expires').notNull()
});

export const relationsCoreSessions = relations(coreSessions, ({ many, one }) => ({
  user: one(coreUsers, {
    fields: [coreSessions.user_id],
    references: [coreUsers.id]
  }),
  sessions: many(coreSessionsKnownDevices)
}));

// ! Known Devices
export const coreSessionsKnownDevices = pgTable('core_sessions_known_devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  session_id: varchar('session_id')
    .notNull()
    .references(() => coreSessions.login_token, {
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

export const relationsCoreSessionsKnownDevices = relations(coreSessionsKnownDevices, ({ one }) => ({
  session: one(coreSessions, {
    fields: [coreSessionsKnownDevices.session_id],
    references: [coreSessions.login_token]
  })
}));
