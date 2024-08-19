import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { GqlContext } from '@/utils';
import { core_admin_sessions } from '@/database/schema/admins';

@Injectable()
export class SignOutAdminSessionsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async signOut({ reply, request }: GqlContext) {
    const login_token =
      request.cookies[
        this.configService.getOrThrow('cookies.login_token.admin.name')
      ];

    if (!login_token) {
      return 'You are not logged in';
    }

    await this.databaseService.db
      .update(core_admin_sessions)
      .set({
        expires: new Date(),
      })
      .where(eq(core_admin_sessions.login_token, login_token));

    reply.clearCookie(
      this.configService.getOrThrow('cookies.login_token.admin.name'),
      {
        httpOnly: true,
        secure: true,
        domain: this.configService.getOrThrow('cookies.domain'),
        path: '/',
        sameSite: 'none',
      },
    );

    return 'You are logged out';
  }
}
