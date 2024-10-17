import { core_files } from '@/database/schema/files';
import { UserWithDangerousInfo } from '@/decorators';
import { NotFoundError } from '@/errors';
import { eq, sum } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import coreSchemaDatabase from '../../../database';

export const getUser = async ({
  id,
  db,
}: {
  db: NodePgDatabase<typeof coreSchemaDatabase>;
  id: number;
}): Promise<UserWithDangerousInfo> => {
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
          files_allow_upload: true,
          files_max_storage_for_submit: true,
          files_total_max_storage: true,
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

  const countStorageUsedDb = await db
    .select({
      space_used: sum(core_files.file_size),
    })
    .from(core_files)
    .where(eq(core_files.user_id, user.id));
  const countStorageUsed = +(countStorageUsedDb[0].space_used ?? 0);

  return {
    ...user,
    group: {
      ...user.group,
      name: userGroupNames,
    },
    files_permissions: {
      space_used: countStorageUsed,
      allow_upload: user.group.files_allow_upload,
      max_storage_for_submit: user.group.files_max_storage_for_submit
        ? user.group.files_max_storage_for_submit * 1024
        : user.group.files_max_storage_for_submit,
      total_max_storage: user.group.files_total_max_storage
        ? user.group.files_total_max_storage * 1024
        : user.group.files_total_max_storage,
    },
  };
};
