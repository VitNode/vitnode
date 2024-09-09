import { AvatarColorService } from '@/core/sessions/sign_up/helpers/avatar-color.service';
import { core_users } from '@/database/schema/users';
import { CustomError, NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { EditAdminMembersArgs, EditAdminMembersObj } from './edit.dto';

@Injectable()
export class EditAdminMembersService extends AvatarColorService {
  constructor(private readonly databaseService: InternalDatabaseService) {
    super();
  }

  async edit({
    id,
    name,
    email,
    newsletter,
  }: EditAdminMembersArgs): Promise<EditAdminMembersObj> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!user) throw new NotFoundError('User');

    const emailExists =
      await this.databaseService.db.query.core_users.findFirst({
        where: (table, { eq }) => eq(table.email, email),
      });

    if (emailExists && emailExists.id !== id) {
      throw new CustomError({
        code: 'EMAIL_ALREADY_EXISTS',
        message: 'Email already exists',
      });
    }

    const [update] = await this.databaseService.db
      .update(core_users)
      .set({
        name,
        email,
        newsletter,
        avatar_color: this.generateAvatarColor(name),
      })
      .where(eq(core_users.id, id))
      .returning();

    return update;
  }
}
