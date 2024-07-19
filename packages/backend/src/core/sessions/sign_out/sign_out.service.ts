import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';

import { DatabaseService } from '@/utils/database/database.service';
import { GqlContext } from '../../../utils';
import { core_sessions } from '../../../plugins/core/admin/database/schema/sessions';

@Injectable()
export class SignOutCoreSessionsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async signOut({ req, res }: GqlContext) {
    const login_token =
      req.cookies[this.configService.getOrThrow('cookies.login_token.name')];

    if (!login_token) {
      return 'You are not logged in';
    }

    await this.databaseService.db
      .update(core_sessions)
      .set({
        expires: new Date(),
      })
      .where(eq(core_sessions.login_token, login_token));

    res.clearCookie(this.configService.getOrThrow('cookies.login_token.name'), {
      httpOnly: true,
      secure: true,
      domain: this.configService.getOrThrow('cookies.domain'),
      path: '/',
      sameSite: 'none',
    });

    return 'You are logged out';
  }
}
