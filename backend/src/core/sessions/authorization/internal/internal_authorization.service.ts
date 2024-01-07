import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InternalAuthorizationCoreSessionObj } from './dto/internal_authorization.obj';

import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { currentDate } from '@/functions/date';
import { DatabaseService } from '@/database/database.service';

@Injectable()
export class InternalAuthorizationCoreSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService
  ) {}

  async authorization({ req }: Ctx): Promise<InternalAuthorizationCoreSessionObj> {
    const login_token = req.cookies[CONFIG.cookies.login_token.name];

    if (!login_token) {
      throw new AccessDeniedError();
    }

    const session = await this.databaseService.db.query.core_sessions.findFirst({
      where: (table, { eq }) => eq(table.login_token, login_token),
      with: {
        user: {
          with: {
            avatar: true,
            group: {
              with: {
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

    return session.user;
  }
}
