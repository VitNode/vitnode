import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { coreGroups } from './groups';
import { coreUsers } from './users';

export const coreAdminPermissions = pgTable('core_admin_permissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  group_id: uuid('group_id').references(() => coreGroups.id, {
    onDelete: 'cascade'
  }),
  user_id: varchar('user_id').references(() => coreUsers.id, {
    onDelete: 'cascade'
  }),
  unrestricted: boolean('unrestricted').notNull().default(false),
  created: integer('created').notNull(),
  updated: integer('updated').notNull(),
  protected: boolean('protected').notNull().default(false)
});

export const relationsCoreAdminPermissions = relations(coreAdminPermissions, ({ one }) => ({
  group: one(coreGroups, {
    fields: [coreAdminPermissions.group_id],
    references: [coreGroups.id]
  }),
  user: one(coreUsers, {
    fields: [coreAdminPermissions.user_id],
    references: [coreUsers.id]
  })
}));

export const coreAdminSessions = pgTable('core_admin_sessions', {
  login_token: varchar('login_token', { length: 255 }).primaryKey(),
  user_id: varchar('user_id')
    .notNull()
    .references(() => coreUsers.id, {
      onDelete: 'cascade'
    }),
  last_seen: integer('last_seen').notNull(),
  expires: integer('expires').notNull()
});

export const relationsCoreAdminSessions = relations(coreAdminSessions, ({ one }) => ({
  user: one(coreUsers, {
    fields: [coreAdminSessions.user_id],
    references: [coreUsers.id]
  })
}));
