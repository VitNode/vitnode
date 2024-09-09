import { core_users } from '@/database/schema/users';
import { User } from '@/decorators';
import { CustomError, NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class DeleteAdminMembersService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async delete({ id }: { id: number }, user: User): Promise<string> {
    const findUser = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!findUser) {
      throw new NotFoundError('User');
    }

    if (user.id === id) {
      throw new CustomError({
        code: 'DELETE_YOURSELF',
        message: 'You cannot delete yourself',
      });
    }

    const admin =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { or, eq }) =>
          or(eq(table.user_id, user.id), eq(table.group_id, user.group.id)),
      });

    if (admin) {
      throw new CustomError({
        code: 'DELETE_ADMIN',
        message: 'You cannot delete an admin',
      });
    }

    await this.databaseService.db
      .delete(core_users)
      .where(eq(core_users.id, id));

    return 'User deleted successfully';
  }
}
