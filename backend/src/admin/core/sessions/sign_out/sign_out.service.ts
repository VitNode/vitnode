import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';

import { Ctx } from '@/types/context.type';
import { DatabaseService } from '@/database/database.service';
import { core_admin_sessions } from '@/src/admin/core/database/schema/admins';

@Injectable()
export class SignOutAdminSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private configService: ConfigService
  ) {}

  async signOut({ req, res }: Ctx) {
    const login_token =
      req.cookies[this.configService.getOrThrow('cookies.login_token.admin.name')];

    if (!login_token) {
      return 'You are not logged in';
    }

    await this.databaseService.db
      .delete(core_admin_sessions)
      .where(eq(core_admin_sessions.login_token, login_token));

    res.clearCookie(this.configService.getOrThrow('cookies.login_token.admin.name'), {
      httpOnly: true,
      secure: true,
      domain: this.configService.getOrThrow('cookies.domain'),
      path: '/',
      sameSite: 'none'
    });

    return 'You are logged out';
  }
}
