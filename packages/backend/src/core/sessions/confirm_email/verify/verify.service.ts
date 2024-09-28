import { core_users } from '@/database/schema/users';
import { AccessDeniedError } from '@/errors';
import { InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';

import { VerifyConfirmEmailCoreSessionsArgs } from './verify.dto';

@Injectable()
export class VerifyConfirmEmailCoreSessionsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  private async verifyToken(email: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':');
      crypto.scrypt(email, salt, 32, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString('hex'));
      });
    });
  }

  async verify({
    token,
    user_id,
  }: VerifyConfirmEmailCoreSessionsArgs): Promise<string> {
    const data =
      await this.databaseService.db.query.core_users_confirm_emails.findFirst({
        where: (table, { eq, and }) =>
          and(eq(table.token, token), eq(table.user_id, user_id)),
      });

    if (!data) {
      throw new AccessDeniedError();
    }

    const validToken = await this.verifyToken(
      data.user_id.toString(),
      data.token,
    );
    if (!validToken) throw new AccessDeniedError();

    await this.databaseService.db
      .update(core_users)
      .set({
        email_verified: true,
      })
      .where(eq(core_users.id, user_id));

    return 'Email confirmed';
  }
}
