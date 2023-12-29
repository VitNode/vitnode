import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InternalAuthorizationCoreSessionObj } from './dto/internal_authorization.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { currentDate } from '@/functions/date';

@Injectable()
export class InternalAuthorizationCoreSessionsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async authorization({ req }: Ctx): Promise<InternalAuthorizationCoreSessionObj> {
    const login_token = req.cookies[CONFIG.cookies.login_token.name];

    if (!login_token) {
      throw new AccessDeniedError();
    }

    const session = await this.prisma.core_sessions.findUnique({
      where: {
        login_token
      },
      include: {
        member: {
          include: {
            group: {
              include: {
                name: true
              }
            },
            avatar: true
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

    return session.member;
  }
}
