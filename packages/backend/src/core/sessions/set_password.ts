import { ConfigService } from '@nestjs/config';
import { genSalt, hash } from 'bcrypt';
import { eq } from 'drizzle-orm';

import { DatabaseService } from '../../database';
import { core_users } from '../../templates/core/admin/database/schema/users';

async function setPassword(
  databaseService: DatabaseService,
  configService: ConfigService,
  id: number,
  password: string
): Promise<void> {
  const passwordSalt = await genSalt(
    configService.getOrThrow('password_salt')
  );
  const hashPassword = await hash(password, passwordSalt);

  const update = await databaseService.db.update(core_users).set({
    password: hashPassword
  }).where(eq(core_users.id, id));

  const { password: _, ...rest } = update[0];
  return { ...rest };
}

export { setPassword };
