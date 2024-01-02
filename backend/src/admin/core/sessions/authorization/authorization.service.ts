import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthorizationAdminSessionsObj } from './dto/authorization.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { currentDate } from '@/functions/date';

@Injectable()
export class AuthorizationAdminSessionsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async authorization({ req }: Ctx): Promise<AuthorizationAdminSessionsObj> {
    const login_token = req.cookies[CONFIG.cookies.login_token.admin.name];

    if (!login_token) {
      throw new AccessDeniedError();
    }

    // If access token exists, check it

    const session = await this.prisma.core_admin_sessions.findUnique({
      where: {
        login_token
      },
      include: {
        member: {
          include: {
            avatar: true,
            group: {
              include: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!session) {
      throw new AccessDeniedError();
    }

    const decodeAccessToken = this.jwtService.decode(login_token);
    if (!decodeAccessToken || decodeAccessToken['exp'] < currentDate()) {
      throw new AccessDeniedError();
    }

    const { member } = session;

    return {
      user: {
        ...member,
        is_admin: true,
        is_mod: true
      }
    };
  }
}
