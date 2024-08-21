import { Injectable, UnauthorizedException } from '@nestjs/common';

import { SignInSessionsCoreBody } from './dto/sign_in.args';
import { verifyPassword } from '../password';

import { InternalDatabaseService } from '@/utils';

@Injectable()
export class SignInSessionsCoreService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async signIn({
    admin,
    email: emailRaw,
    password,
    remember,
  }: SignInSessionsCoreBody): Promise<string> {
    const email = emailRaw.toLowerCase();
    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });
    if (!user) throw new UnauthorizedException();

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) throw new UnauthorizedException();

    return 'Success!';
  }
}
