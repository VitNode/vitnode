import { Injectable } from '@nestjs/common';

import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SignOutAdminSessionsService {
  constructor(private prisma: PrismaService) {}

  async signOut({ req, res }: Ctx) {
    const tokens = {
      accessToken: req.cookies[CONFIG.access_token.admin.name],
      refreshToken: req.cookies[CONFIG.refresh_token.admin.name]
    };

    if (!tokens.accessToken && !tokens.refreshToken) {
      return 'You are not logged in';
    }

    await this.prisma.core_admin_sessions.deleteMany({
      where: {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken
      }
    });

    res.clearCookie(CONFIG.access_token.admin.name, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/'
    });

    res.clearCookie(CONFIG.refresh_token.admin.name, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/'
    });

    return 'You are logged out';
  }
}
