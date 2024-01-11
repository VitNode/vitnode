import { Injectable } from '@nestjs/common';

import { InternalAuthorizationCoreSessionsService } from './internal/internal_authorization.service';
import { AuthorizationCoreSessionsObj } from './dto/authorization.obj';

import { Ctx } from '@/types/context.type';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class AuthorizationCoreSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private readonly service: InternalAuthorizationCoreSessionsService
  ) {}

  protected async isAdmin({
    group_id,
    user_id
  }: {
    group_id: number;
    user_id: number;
  }): Promise<boolean> {
    return !!(await this.databaseService.db.query.core_admin_permissions.findFirst({
      where: (table, { eq, or }) => or(eq(table.group_id, group_id), eq(table.user_id, user_id))
    }));
  }

  protected async isMod({
    group_id,
    user_id
  }: {
    group_id: number;
    user_id: number;
  }): Promise<boolean> {
    return !!(await this.databaseService.db.query.core_moderators_permissions.findFirst({
      where: (table, { eq, or }) => or(eq(table.group_id, group_id), eq(table.user_id, user_id))
    }));
  }

  async authorization({ req, res }: Ctx): Promise<AuthorizationCoreSessionsObj> {
    try {
      const currentUser = await this.service.authorization({ req, res });

      const user = await this.databaseService.db.query.core_users.findFirst({
        where: (table, { eq }) => eq(table.id, currentUser.id),
        with: {
          avatar: true,
          group: {
            with: {
              name: true
            }
          }
        }
      });

      return {
        user: {
          ...user,
          is_admin: await this.isAdmin({ group_id: user.group.id, user_id: user.id }),
          is_mod: await this.isMod({ group_id: user.group.id, user_id: user.id }),
          avatar_color: user.avatar_color
        }
      };
    } catch (error) {
      return {
        user: null
      };
    }
  }
}
