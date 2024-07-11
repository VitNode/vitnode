import { Injectable } from '@nestjs/common';
import { eq, sum } from 'drizzle-orm';

import { InternalAuthorizationCoreSessionsService } from './internal/internal_authorization.service';
import { AuthorizationCoreSessionsObj } from './dto/authorization.obj';

import { DatabaseService } from '@/utils/database/database.service';
import { core_files } from '../../../plugins/core/admin/database/schema/files';
import { Ctx } from '../../../utils';

@Injectable()
export class AuthorizationCoreSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly service: InternalAuthorizationCoreSessionsService,
  ) {}

  protected async isAdmin({
    group_id,
    user_id,
  }: {
    group_id: number;
    user_id: number;
  }): Promise<boolean> {
    return !!(await this.databaseService.db.query.core_admin_permissions.findFirst(
      {
        where: (table, { eq, or }) =>
          or(eq(table.group_id, group_id), eq(table.user_id, user_id)),
      },
    ));
  }

  protected async isMod({
    group_id,
    user_id,
  }: {
    group_id: number;
    user_id: number;
  }): Promise<boolean> {
    return !!(await this.databaseService.db.query.core_moderators_permissions.findFirst(
      {
        where: (table, { eq, or }) =>
          or(eq(table.group_id, group_id), eq(table.user_id, user_id)),
      },
    ));
  }

  async authorization({
    req,
    res,
  }: Ctx): Promise<AuthorizationCoreSessionsObj> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.default, true),
    });

    try {
      const currentUser = await this.service.authorization({ req, res });

      const user = await this.databaseService.db.query.core_users.findFirst({
        where: (table, { eq }) => eq(table.id, currentUser.id),
        with: {
          avatar: true,
          group: {
            with: {
              name: true,
            },
          },
        },
      });

      const countStorageUsed = await this.databaseService.db
        .select({
          space_used: sum(core_files.file_size),
        })
        .from(core_files)
        .where(eq(core_files.user_id, user.id));

      return {
        user: {
          ...user,
          group: currentUser.group,
          is_admin: await this.isAdmin({
            group_id: user.group.id,
            user_id: user.id,
          }),
          is_mod: await this.isMod({
            group_id: user.group.id,
            user_id: user.id,
          }),
          avatar_color: user.avatar_color,
        },
        plugin_default: plugin?.code ?? '',
        files: {
          allow_upload: user.group.files_allow_upload,
          max_storage_for_submit: user.group.files_max_storage_for_submit
            ? user.group.files_max_storage_for_submit * 1024
            : user.group.files_max_storage_for_submit,
          total_max_storage: user.group.files_total_max_storage
            ? user.group.files_total_max_storage * 1024
            : user.group.files_total_max_storage,
          space_used: (+countStorageUsed[0].space_used ?? 0) * 1024,
        },
      };
    } catch (error) {
      const guestGroup =
        await this.databaseService.db.query.core_groups.findFirst({
          where: (table, { eq }) => eq(table.guest, true),
        });

      return {
        user: null,
        plugin_default: plugin?.code ?? '',
        files: {
          allow_upload: guestGroup?.files_allow_upload ?? false,
          max_storage_for_submit: guestGroup?.files_max_storage_for_submit ?? 0,
          total_max_storage: guestGroup?.files_total_max_storage ?? 0,
          space_used: 0,
        },
      };
    }
  }
}
