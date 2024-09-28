import { core_users } from '@/database/schema/users';
import { CustomError, NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class ConfirmEmailAdminMembersService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async confirmEmail(id: number): Promise<string> {
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.id, id),
      columns: {
        id: true,
        email_verified: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    if (user.email_verified) {
      throw new CustomError({
        code: 'EMAIL_ALREADY_VERIFIED',
        message: 'Email already verified',
      });
    }

    await this.databaseService.db
      .update(core_users)
      .set({ email_verified: true })
      .where(eq(core_users.id, id));

    return 'Email verified successfully';
  }
}
