import { User } from '@/decorators';
import { NotFoundError } from '@/errors';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import coreSchemaDatabase from '../../../database';

export const getUser = async ({
  id,
  db,
}: {
  db: NodePgDatabase<typeof coreSchemaDatabase>;
  id: number;
}): Promise<User> => {
  const user = await db.query.core_users.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    columns: {
      email: true,
      avatar_color: true,
      id: true,
      language: true,
      name: true,
      name_seo: true,
    },
    with: {
      avatar: true,
      group: {
        columns: {
          id: true,
          color: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError(`User with ${id} not found`);
  }

  const userGroupNames = await db.query.core_languages_words.findMany({
    columns: {
      language_code: true,
      value: true,
    },
    where: (table, { eq, and }) =>
      and(
        eq(table.item_id, user.group.id),
        eq(table.plugin_code, 'core'),
        eq(table.variable, 'name'),
        eq(table.table_name, 'core_groups'),
      ),
  });

  return {
    ...user,
    group: {
      ...user.group,
      name: userGroupNames,
    },
  };
};
