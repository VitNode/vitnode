import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { core_users } from '../../../database/schema/users';
import { AccessDeniedError, NotFoundError } from '../../../errors';
import { DeleteCoreMembersArgs } from './delete.dto';

@Injectable()
export class DeleteCoreMembersService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async delete({ id }: DeleteCoreMembersArgs): Promise<string> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: eq(core_users.id, id),
    });

    if (!user) throw new NotFoundError('User');

    const admin =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { or, eq }) =>
          or(eq(table.user_id, user.id), eq(table.group_id, user.group_id)),
      });

    if (admin) throw new AccessDeniedError(); //Protects against deletion users with admin permissions

    await this.databaseService.db
      .delete(core_users)
      .where(eq(core_users.id, id));

    return 'Success!';
  }
}
