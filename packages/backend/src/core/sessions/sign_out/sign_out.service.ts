import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';

import { core_sessions } from '../../../database/schema/sessions';
import { GqlContext } from '../../../utils';

@Injectable()
export class SignOutCoreSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async signOut({ req, res }: GqlContext) {
    const login_token = req.cookies[
      this.configService.getOrThrow('cookies.login_token.name')
    ] as string;

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
      secure: !!this.configService.getOrThrow('cookies.secure'),
      domain: this.configService.getOrThrow('cookies.domain'),
      path: '/',
      sameSite: this.configService.getOrThrow('cookies.secure')
        ? 'none'
        : 'lax',
    });

    return 'You are logged out';
  }
}
