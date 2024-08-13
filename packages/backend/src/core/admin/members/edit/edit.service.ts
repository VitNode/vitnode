import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { EditAdminMembersArgs } from './dto/edit.args';
import { EditAdminMembersObj } from './dto/edit.obj';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { core_users } from '@/database/schema/users';
import { AccessDeniedError, NotFoundError } from '@/errors';

@Injectable()
export class EditAdminMembersService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async edit({
    id,
    name,
    email,
    newsletter,
    first_name,
    last_name,
    birthday,
  }: EditAdminMembersArgs): Promise<EditAdminMembersObj> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: eq(core_users.id, id),
    });

    if (!user) throw new NotFoundError('User');

    const admin =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { or, eq }) =>
          or(eq(table.user_id, user.id), eq(table.group_id, user.group_id)),
      });

    if (!admin) throw new AccessDeniedError();

    const update = await this.databaseService.db
      .update(core_users)
      .set({
        name,
        email,
        newsletter,
        first_name,
        last_name,
        birthday,
      })
      .where(eq(core_users.id, id))
      .returning();

    return update[0];
  }
}
