import { NotFoundError } from '@/errors';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import { GqlContext } from '../../../utils';
import { AuthorizationCoreSessionsObj } from './authorization.dto';
import { InternalAuthorizationCoreSessionsService } from './internal/internal_authorization.service';

@Injectable()
export class AuthorizationCoreSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
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
  }: GqlContext): Promise<AuthorizationCoreSessionsObj> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.default, true),
    });

    try {
      const currentUser = await this.service.authorization({ req, res });
      const user = await this.databaseService.db.query.core_users.findFirst({
        where: (table, { eq }) => eq(table.id, currentUser.id),
        with: {
          group: {
            columns: {
              files_allow_upload: true,
              files_max_storage_for_submit: true,
              files_total_max_storage: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundError('User');
      }

      const userBasic = await getUser({
        id: currentUser.id,
        db: this.databaseService.db,
      });

      return {
        user: {
          ...user,
          ...userBasic,
          group: currentUser.group,
          is_admin: await this.isAdmin({
            group_id: userBasic.group.id,
            user_id: user.id,
          }),
          is_mod: await this.isMod({
            group_id: userBasic.group.id,
            user_id: user.id,
          }),
          avatar_color: user.avatar_color,
        },
        plugin_default: plugin?.code ?? '',
      };
    } catch (_) {
      return {
        user: null,
        plugin_default: plugin?.code ?? '',
      };
    }
  }
}
