import { relations } from 'drizzle-orm';
import { index, pgTable } from 'drizzle-orm/pg-core';

import { core_groups } from './groups';
import { core_users } from './users';

export const core_moderators_permissions = pgTable(
  'core_moderators_permissions',
  t => ({
    id: t.serial().primaryKey(),
    group_id: t.integer().references(() => core_groups.id, {
      onDelete: 'cascade',
    }),
    user_id: t.integer().references(() => core_users.id, {
      onDelete: 'cascade',
    }),
    unrestricted: t.boolean().notNull().default(false),
    created: t.timestamp().notNull().defaultNow(),
    updated: t.timestamp().notNull().defaultNow(),
    protected: t.boolean().notNull().default(false),
  }),
  table => ({
    group_id_idx: index('core_moderators_permissions_group_id_idx').on(
      table.group_id,
    ),
    user_id_idx: index('core_moderators_permissions_user_id_idx').on(
      table.user_id,
    ),
  }),
);

export const core_moderators_permissions_relations = relations(
  core_moderators_permissions,
  ({ one }) => ({
    group: one(core_groups, {
      fields: [core_moderators_permissions.group_id],
      references: [core_groups.id],
    }),
    user: one(core_users, {
      fields: [core_moderators_permissions.user_id],
      references: [core_users.id],
    }),
  }),
);
