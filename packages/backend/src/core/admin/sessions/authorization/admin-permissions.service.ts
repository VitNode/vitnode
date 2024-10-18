import { User } from '@/decorators';
import { AccessDeniedError } from '@/errors';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';

import { AuthorizationAdminSessionsObj } from './authorization.dto';

@Injectable()
export class AdminPermissionsAdminSessionsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async getPermissions({
    user,
  }: {
    user: User;
  }): Promise<AuthorizationAdminSessionsObj['permissions']> {
    const admin =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { or, eq }) =>
          or(eq(table.user_id, user.id), eq(table.group_id, user.group.id)),
      });

    if (!admin) {
      throw new AccessDeniedError();
    }

    return admin.permissions as AuthorizationAdminSessionsObj['permissions'];
  }
}
