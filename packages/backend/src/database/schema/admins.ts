import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { core_groups } from './groups';
import { core_users } from './users';
import { core_sessions_known_devices } from './sessions';

export const core_admin_permissions = pgTable(
  'core_admin_permissions',
  {
    id: serial('id').primaryKey(),
    group_id: integer('group_id').references(() => core_groups.id, {
      onDelete: 'cascade',
    }),
    user_id: integer('user_id').references(() => core_users.id, {
      onDelete: 'cascade',
    }),
    unrestricted: boolean('unrestricted').notNull().default(false),
    created: timestamp('created').notNull().defaultNow(),
    updated: timestamp('updated').notNull().defaultNow(),
    protected: boolean('protected').notNull().default(false),
    permissions: jsonb('permissions').default('{}'),
  },
  table => ({
    group_id_idx: index('core_admin_permissions_group_id_idx').on(
      table.group_id,
    ),
    user_id_idx: index('core_admin_permissions_user_id_idx').on(table.user_id),
  }),
);

export const core_admin_permissions_relations = relations(
  core_admin_permissions,
  ({ one }) => ({
    group: one(core_groups, {
      fields: [core_admin_permissions.group_id],
      references: [core_groups.id],
    }),
    user: one(core_users, {
      fields: [core_admin_permissions.user_id],
      references: [core_users.id],
    }),
  }),
);

export const core_admin_sessions = pgTable(
  'core_admin_sessions',
  {
    login_token: varchar('login_token', { length: 255 }).primaryKey(),
    user_id: integer('user_id')
      .notNull()
      .references(() => core_users.id, {
        onDelete: 'cascade',
      }),
    created: timestamp('created').notNull().defaultNow(),
    last_seen: timestamp('last_seen').notNull().defaultNow(),
    expires: timestamp('expires').notNull(),
    device_id: integer('device_id')
      .references(() => core_sessions_known_devices.id, {
        onDelete: 'cascade',
      })
      .notNull(),
  },
  table => ({
    login_token_idx: index('core_admin_sessions_login_token_idx').on(
      table.login_token,
    ),
    user_id_idx: index('core_admin_sessions_user_id_idx').on(table.user_id),
  }),
);

export const core_admin_sessions_relations = relations(
  core_admin_sessions,
  ({ one }) => ({
    user: one(core_users, {
      fields: [core_admin_sessions.user_id],
      references: [core_users.id],
    }),
    device: one(core_sessions_known_devices, {
      fields: [core_admin_sessions.device_id],
      references: [core_sessions_known_devices.id],
    }),
  }),
);
