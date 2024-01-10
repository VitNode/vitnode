import { boolean, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { core_groups } from './groups';
import { core_users } from './users';

export const core_moderators_permissions = pgTable('core_moderators_permissions', {
  id: serial('id').primaryKey(),
  group_id: integer('group_id').references(() => core_groups.id, {
    onDelete: 'cascade'
  }),
  user_id: integer('user_id').references(() => core_users.id, {
    onDelete: 'cascade'
  }),
  unrestricted: boolean('unrestricted').notNull().default(false),
  created: integer('created').notNull(),
  updated: integer('updated').notNull(),
  protected: boolean('protected').notNull().default(false)
});

export const core_moderators_permissions_relations = relations(
  core_moderators_permissions,
  ({ one }) => ({
    group: one(core_groups, {
      fields: [core_moderators_permissions.group_id],
      references: [core_groups.id]
    }),
    user: one(core_users, {
      fields: [core_moderators_permissions.user_id],
      references: [core_users.id]
    })
  })
);
